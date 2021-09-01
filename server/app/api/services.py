from app.models import *


def create_tournament(tournament, participants):
    """
    Code for creating a tournament from a JSON request.
    """


def _insert_tournament(tournament):
    """
    Inserts a tournament into the database and returns the inserted id.
    """


def _insert_participants(participants, tournament_id):
    """
    Inserts participants for the tournament
    """


def _create_matches(participants):
    """
    Creates the matches for the tournament, including byes.
    """


def _generate_seeded_order(size):
    """
    Generates the seeds for a given size.
    """


def _generate_random_order(size):
    """
    Generates a random order for the given size.
    """