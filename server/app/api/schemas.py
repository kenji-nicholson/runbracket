from app import ma
from marshmallow import validate
from app.models import *


class TournamentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Tournament
        fields = ("tournament_id", "date", "tournament_name", "tournament_description")
        load_instance = True

    tournament_name = \
        ma.String(required=True, validate=validate.Length(max=Tournament.TOURNAMENT_NAME_LENGTH, min=1))
    tournament_description = \
        ma.String(validate=validate.Length(max=Tournament.TOURNAMENT_DESCRIPTION_LENGTH))


class ParticipantSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Participant
        fields = ("participant_id", "participant_name", "seed")

    participant_name = \
        ma.String(required=True, validate=validate.Length(max=Participant.PARTICIPANT_NAME_LENGTH, min=1))


class MatchSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Match
        fields = ("match_id", "date", "participant_a_score", "participant_b_score", "participant_a", "participant_b",
                  "match_number")

    participant_a = ma.Nested(ParticipantSchema)
    participant_b = ma.Nested(ParticipantSchema)


