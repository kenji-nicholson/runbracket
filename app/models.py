from datetime import datetime

from app import db


# TODO: Lookup how to implement look up tables. Look up how to have single entity joins (participant a)

class Tournament(db.Model):
    """
    Model for a tournament.
    """
    tournament_id = db.Column(db.Integer, primary_key=True)
    tournament_name = db.Column(db.String(255))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    matches = db.relationship('Match', backref='tournament', lazy='dynamic')
    participants = db.relationship('Participant', backref='tournament', lazy='dynamic')


class Match(db.Model):
    """
    A match always belongs to a tournament.
    """
    match_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    participant_a_score = db.Column(db.Integer, default=0)
    participant_b_score = db.Column(db.Integer, default=0)
    match_number = db.Column(db.Integer)


class Participant(db.Model):
    """
    A participant is a single entity participating in a tournament.
    """
    participant_id = db.Column(db.Integer, primary_key=True)
    participant_name = db.Column(db.String(255))
