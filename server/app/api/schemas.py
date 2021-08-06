from app import ma
from marshmallow import Schema, fields, validate
from app.models import *


class TournamentSchema(Schema):
    class Meta:
        model = Tournament
        fields = ("tournament_id", "date", "tournament_name", "tournament_description")
        load_instance = True

    tournament_name = \
        fields.String(required=True, validate=validate.Length(max=Tournament.TOURNAMENT_NAME_LENGTH, min=1))
    tournament_description = \
        fields.String(validate=validate.Length(max=Tournament.TOURNAMENT_DESCRIPTION_LENGTH))


class ParticipantSchema(Schema):
    class Meta:
        model = Participant
        fields = ("participant_id", "participant_name", "seed")

    participant_name = \
        fields.String(required=True, validate=validate.Length(max=Participant.PARTICIPANT_NAME_LENGTH, min=1))


class MatchSchema(Schema):
    class Meta:
        model = Match
        fields = ("match_id", "date", "participant_a_score", "participant_b_score", "participant_a", "participant_b",
                  "match_number")

    participant_a = fields.Nested(ParticipantSchema)
    participant_b = fields.Nested(ParticipantSchema)


class UserSchema(Schema):
    user_id = fields.Integer()
    first_name = fields.String(required=True, validate=validate.Length(max=50))
    last_name = fields.String(required=True, validate=validate.Length(max=50))
    email = fields.String(required=True, validate=validate.Length(max=255))
    display_name = fields.String(required=True, validate=validate.Length(max=50))



