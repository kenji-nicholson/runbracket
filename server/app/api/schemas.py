from marshmallow import Schema, fields, validate, EXCLUDE
from marshmallow_sqlalchemy import SQLAlchemySchema
from app.models import *


class TournamentSchema(Schema):
    tournament_id = fields.Integer()
    date = fields.DateTime()
    tournament_name = \
        fields.String(required=True, validate=validate.Length(max=Tournament.TOURNAMENT_NAME_LENGTH, min=1))
    tournament_description = \
        fields.String(validate=validate.Length(max=Tournament.TOURNAMENT_DESCRIPTION_LENGTH))


class ParticipantSchema(Schema):
    participant_id = fields.Integer()
    participant_name = \
        fields.String(required=True, validate=validate.Length(max=Participant.PARTICIPANT_NAME_LENGTH, min=1))
    seed = fields.Integer()


class MatchSchema(Schema):
    match_id = fields.Integer()
    match_number = fields.Integer()
    date = fields.DateTime()
    participant_a_score = fields.Integer()
    participant_b_score = fields.Integer()
    participant_a = fields.Nested(ParticipantSchema)
    participant_b = fields.Nested(ParticipantSchema)


class UserSchema(SQLAlchemySchema):
    class Meta:
        model = User
        unknown = EXCLUDE
        load_instance = True

    user_id = fields.Integer()
    first_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    last_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    email = fields.String(required=True, validate=validate.Length(max=User.EMAIL_LENGTH))
    display_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))



