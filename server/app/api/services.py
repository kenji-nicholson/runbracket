import random

from app.models import *
from app import db
from collections import deque


def create_tournament(tournament, participants):
    """
    Code for creating a tournament from a JSON request.
    """
    with db.session.begin():
        tournament_id = _insert_tournament(tournament)
        inserted_participants = _insert_participants(participants, tournament_id)
        matches = _create_matches(inserted_participants, tournament.is_seeded, tournament_id)
        advance_byes(tournament_id)
        return Tournament.query.get(tournament_id)


def advance_byes(tournament_id):
    """
    Advances any byes in the tournament
    """
    for match in Match.query.filter((Match.tournament_id==tournament_id) & (Match.round==1)):
        if

def _insert_tournament(tournament):
    """
    Inserts a tournament into the database and returns the inserted id.
    """
    db.session.add(tournament)
    db.session.flush()
    return tournament.tournament_id


def _insert_participants(participants, tournament_id):
    """
    Inserts participants for the tournament
    """
    tournament_participants = \
        [setattr(participant, 'tournament_id', tournament_id) for participant in participants]
    db.session.add_all(tournament_participants)
    db.session.flush()
    return participants


def _create_matches(participants, is_seeded, tournament_id):
    """
    Creates the matches for the tournament, including byes.
    """
    bracket_size = _get_bracket_size(len(participants))
    padded_participants = participants + [''] * (bracket_size - len(participants))
    order = _generate_seeded_order(bracket_size) if is_seeded else _generate_random_order(bracket_size)
    first_round = _insert_initial_matches(padded_participants, order, tournament_id)
    return Match.query.filter(Match.tournament_id == tournament_id)


def _insert_initial_matches(participants, order, tournament_id):
    """
    Creates the first round of matches for enqueueing into the bracket generation queue
    """
    matches = []
    i = 0
    while i < len(participants):
        participant_a = participants[order[i]]
        participant_b = participants[order[i + 1]]
        match = Match(
            participant_a_id=None if participant_a is None else participant_a.participant_id,
            participant_b_id=None if participant_b is None else participant_b.participant_id,
            status='not_started',
            round=1,
            tournament_id=tournament_id
        )
        matches.append(match)
        i += 2
    db.session.add_all(matches)
    db.session.flush()
    return matches


def _insert_bracket(first_round, tournament_id):
    """
    Given the first round of matches, creates the remainder of matches with
    """
    match_queue = deque(first_round)
    while len(match_queue) > 1:
        m1 = match_queue.popleft()
        m2 = match_queue.popleft()
        match = Match(
            round=m1.round + 1,
            status='not_started',
            tournament_id=tournament_id
        )
        db.session.add(match)
        db.session.flush()
        m1.winner_match_id = match.match_id
        m2.winner_match_id = match.match_id
        db.session.flush()
        match_queue.append(match)


def _get_bracket_size(participants_size):
    """
    Calculates the bracket size (next biggest power of 2)
    """
    return 2**(participants_size-1).bit_length()


def _generate_seeded_order(size):
    """
    Generates the seeded order for a given size.
    """
    seeds = list(range(0, size))
    layer = 1
    while layer < len(seeds) / 2:
        temp = seeds[:]
        seeds = []
        while len(temp) > 0:
            seeds += temp[0:layer]
            seeds += temp[-layer:layer]
        layer *= 2
    return seeds


def _generate_random_order(size):
    """
    Generates a random order for the given size.
    """
    order = list(range(0, size))
    return random.shuffle(order)
