from app import ma
from app.models import *


class TournamentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Tournament
        include_fk = True

    tournament_id = ma.auto_field()
    tournament_name = ma.auto_field()
    tournament_description = ma.auto_field()
    tournament_type = ma.auto_field()


class MatchSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Match
        include_fk = True

    match_id = ma.auto_field()
    date = ma.auto_field()
    participant_a_score = ma.auto_field()
    participant_b_score = ma.auto_field()
    match_number = ma.auto_field()


class ParticipantSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Participant
        include_fk = True

    participant_id = ma.auto_field()
    participant_name = ma.auto_field()
    seed = ma.auto_field()
