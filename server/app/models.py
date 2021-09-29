from datetime import datetime

from enum import Enum
from sqlalchemy.orm import backref
from app.api.api_functions import PaginatedAPIMixin
from app import db
from werkzeug.security import check_password_hash, generate_password_hash


class StatusEnum(Enum):
    NOT_STARTED = 'not_started'
    IN_PROGRESS = 'in_progress'
    COMPLETED = 'completed'


class Tournament(db.Model):
    """
    Model for a tournament.
    """
    TOURNAMENT_NAME_LENGTH = 255
    TOURNAMENT_DESCRIPTION_LENGTH = 500

    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    tournament_id = db.Column(db.Integer, primary_key=True)
    tournament_name = db.Column(db.String(TOURNAMENT_NAME_LENGTH))
    tournament_description = db.Column(db.String(TOURNAMENT_DESCRIPTION_LENGTH))
    is_seeded = db.Column(db.Boolean(), default=False)
    date = db.Column(db.DateTime(), default=datetime.utcnow)
    status = db.Column(db.Enum(StatusEnum))


class Match(db.Model):
    """
    A match always belongs to a tournament.
    """
    match_id = db.Column(db.Integer, primary_key=True)
    winner_match_id = db.Column(db.Integer, db.ForeignKey('match.match_id'))
    round = db.Column(db.Integer)
    date = db.Column(db.DateTime)

    participant_a_score = db.Column(db.Integer, default=0)
    participant_b_score = db.Column(db.Integer, default=0)

    participant_a_id = db.Column(db.Integer, db.ForeignKey('participant.participant_id'))
    participant_a = db.relationship('Participant', backref=backref('matches', lazy='dynamic'),
                                    foreign_keys=[participant_a_id])
    participant_b_id = db.Column(db.Integer, db.ForeignKey('participant.participant_id'))
    participant_b = db.relationship('Participant', foreign_keys=[participant_b_id])
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournament.tournament_id'))
    tournament = db.relationship('Tournament', backref=backref('matches', lazy='dynamic'),
                                 foreign_keys=[tournament_id])
    status = db.Column(db.Enum(StatusEnum))


class Participant(db.Model):
    """
    A participant is a single entity participating in a tournament.
    Participants are unique to every tournament since a participant may/may not have a user account tied to it.
    """
    PARTICIPANT_NAME_LENGTH = 255

    participant_id = db.Column(db.Integer, primary_key=True)
    participant_name = db.Column(db.String(PARTICIPANT_NAME_LENGTH))
    seed = db.Column(db.Integer)

    tournament_id = db.Column(db.Integer, db.ForeignKey('tournament.tournament_id'))
    tournament = db.relationship('Tournament', backref='participants', foreign_keys=[tournament_id])
    

class User(db.Model, PaginatedAPIMixin):
    """
    A User is a registered account.
    """
    NAME_LENGTH = 50
    EMAIL_LENGTH = 255

    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(NAME_LENGTH))
    last_name = db.Column(db.String(NAME_LENGTH))
    email = db.Column(db.String(EMAIL_LENGTH))
    display_name = db.Column(db.String(NAME_LENGTH))
    password_hash = db.Column(db.String(128))
    register_date = db.Column(db.DateTime)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)