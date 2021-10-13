import math
import random
import sys

from app.models import *
from app import db
from collections import deque


def create_tournament(tournament):
    """
    Code for creating a tournament from a JSON request.
    """
    participants = tournament.participants
    tournament_id = _insert_tournament(tournament)
    if len(participants) > 0:
        inserted_participants = _insert_participants(participants, tournament_id)
        matches = _create_matches(inserted_participants, tournament.is_seeded, tournament_id)
        advance_byes(tournament_id)
    db.session.commit()
    return Tournament.query.get(tournament_id)


def advance_byes(tournament_id):
    """
    Advances any byes in the tournament
    """
    matches = Match.query.filter((Match.tournament_id == tournament_id) & (Match.round == 1))
    if matches.count() == 1:
        return

    for match in matches:
        if match.participant_a is None or match.participant_b is None:
            participant = match.participant_a if match.participant_a else match.participant_b
            next_match = Match.query.get(match.winner_match_id)
            next_match.participant_a_id = participant.participant_id
            match.winner_id = participant.participant_id
            match.date = datetime.utcnow()
            match.status = StatusEnum.COMPLETED
            db.session.flush()


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
    for participant in participants:
        participant.tournament_id = tournament_id
    db.session.add_all(participants)
    db.session.flush()
    return participants


def _create_matches(participants, is_seeded, tournament_id):
    """
    Creates the matches for the tournament, including byes.
    """
    bracket_size = _get_bracket_size(len(participants))

    ordered_participants = participants if is_seeded else _shuffle_participants(participants)
    padded_participants = ordered_participants + [''] * (bracket_size - len(ordered_participants))
    order = _generate_seeded_order(bracket_size)
    first_round = _insert_initial_matches(padded_participants, order, tournament_id)
    _insert_bracket(first_round, tournament_id)
    return Match.query.filter(Match.tournament_id == tournament_id)


def _shuffle_participants(participants):
    """
    Shuffles the participants to get a random seeding if is_seeded is false
    """
    out = participants.copy()
    random.shuffle(out)
    return out


def _insert_initial_matches(participants, order, tournament_id):
    """
    Creates the first round of matches for enqueueing into the bracket generation queue
    """
    matches = []
    i = 0
    while i < len(participants) - 1:

        first_seed = order[i]
        second_seed = order[i + 1]
        participant_a = participants[first_seed - 1]
        if participant_a:
            participant_a.seed = first_seed
        participant_b = participants[second_seed - 1]
        if participant_b:
            participant_b.seed = second_seed
        match = Match(
            participant_a_id=None if not participant_a else participant_a.participant_id,
            participant_b_id=None if not participant_b else participant_b.participant_id,
            status=StatusEnum.NOT_STARTED,
            round=1,
            tournament_id=tournament_id
        )
        db.session.flush()
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
            status=StatusEnum.NOT_STARTED,
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
    return max(2, 2 ** (participants_size - 1).bit_length())


def _generate_seeded_order(size):
    """
    Generates the seeded order for a given size.
    """
    rounds = int(math.log(size)/math.log(2))
    placements = [1, 2]
    for i in range(1, rounds):
        placements = _next_layer(placements)
    return placements


def _next_layer(placements):
    """
    Gets the next layer of the seeded order
    """
    out = []
    length = len(placements) * 2 + 1
    for p in placements:
        out.append(p)
        out.append(length - p)
    return out

