from marshmallow import Schema, fields, validate, EXCLUDE
from marshmallow_sqlalchemy import SQLAlchemySchema
from app.models import *


class ParticipantSchema(Schema):
    class Meta:
        model = Participant
        unknown = EXCLUDE
        load_instance = True

    participant_id = fields.Integer()
    participant_name = \
        fields.String(required=True, validate=validate.Length(max=Participant.PARTICIPANT_NAME_LENGTH, min=1))
    seed = fields.Integer()


class MatchSchema(Schema):
    class Meta:
        model = Match
        unknown = EXCLUDE
        load_instance = True

    match_id = fields.Integer()
    round = fields.Integer()
    match_status = fields.Str(validate=validate.OneOf(['not_started', 'in_progress', 'completed']))
    date = fields.DateTime()
    participant_a_score = fields.Integer()
    participant_b_score = fields.Integer()
    participant_a = fields.Nested(ParticipantSchema)
    participant_b = fields.Nested(ParticipantSchema)


class TournamentSchema(SQLAlchemySchema):
    class Meta:
        model = Tournament
        unknown = EXCLUDE
        load_instance = True

    user_id = fields.Integer(required=True)
    tournament_id = fields.Integer()
    tournament_status = fields.Str(validate=validate.OneOf(['not_started', 'in_progress', 'completed']))
    tournament_name = \
        fields.String(required=True, validate=validate.Length(max=Tournament.TOURNAMENT_NAME_LENGTH, min=1))
    tournament_description = \
        fields.String(required=True, validate=validate.Length(max=Tournament.TOURNAMENT_DESCRIPTION_LENGTH))
    is_seeded = fields.Boolean(required=True)
    date = fields.DateTime()
    matches = fields.List(fields.Nested(MatchSchema))
    participants = fields.List(fields.Nested(ParticipantSchema), required=True)


class UserSchema(SQLAlchemySchema):
    class Meta:
        model = User
        unknown = EXCLUDE
        load_instance = True

    user_id = fields.Integer()
    first_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    last_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    email = fields.Email(required=True, validate=validate.Length(max=User.EMAIL_LENGTH))
    display_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))


class LoginSchema(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)



