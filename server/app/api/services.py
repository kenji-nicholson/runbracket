import random

from app.models import *
from app import db


def create_tournament(tournament, participants):
    """
    Code for creating a tournament from a JSON request.
    """
    with db.session.begin():
        tournament_id = _insert_tournament(tournament)
        inserted_participants = _insert_participants(participants, tournament_id)
        matches = _create_matches(inserted_participants, tournament.is_seeded)
        return Tournament.query.get(tournament_id)


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
    db.session.add_all(participants)
    db.session.flush()
    return participants


def _create_matches(participants, is_seeded):
    """
    Creates the matches for the tournament, including byes.
    """
    bracket_size = _get_bracket_size(len(participants))
    padded_participants = participants + [''] * (bracket_size - len(participants))
    order = _generate_seeded_order(bracket_size) if is_seeded else _generate_random_order(bracket_size)
    return []


def _insert_initial_matches(participants, order):
    """
    Creates the first round of matches for enqueueing into the bracket generation queue
    """


def _insert_bracket(first_round):
    """
    Given the first round of matches, creates the remainder of matches with
    """


def _get_bracket_size(participants_size):
    """
    Calculates the bracket size (next biggest power of 2)
    """
    return 2**(participants_size-1).bit_length()


def _generate_seeded_order(size):
    """
    Generates the seeded order for a given size.
    """
    seeds = list(range(1, size))
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
    order = list(range(1, size))
    return random.shuffle(order)
