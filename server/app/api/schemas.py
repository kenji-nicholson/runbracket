from marshmallow import Schema, fields, validate, EXCLUDE
from marshmallow_sqlalchemy import SQLAlchemySchema
from app.models import *
from marshmallow_enum import EnumField
from app import db


class ParticipantSchema(SQLAlchemySchema):
    class Meta:
        model = Participant
        unknown = EXCLUDE
        load_instance = True
        sqla_session = db.session

    tournament_id = fields.Integer()
    participant_id = fields.Integer(missing=None, allow_none=True)
    participant_name = \
        fields.String(required=True, validate=validate.Length(max=Participant.PARTICIPANT_NAME_LENGTH, min=1))
    seed = fields.Integer(missing=None, allow_none=True)


class MatchSchema(SQLAlchemySchema):
    class Meta:
        model = Match
        unknown = EXCLUDE
        load_instance = True
        sqla_session = db.session

    tournament_id = fields.Integer()
    match_id = fields.Integer()
    winner_match_id = fields.Integer(allow_none=True)
    round = fields.Integer()
    status = EnumField(StatusEnum)
    date = fields.DateTime(allow_none=True)
    participant_a_score = fields.Integer()
    participant_b_score = fields.Integer()
    winner_id = fields.Integer(allow_none=True)
    participant_a = fields.Nested(ParticipantSchema)
    participant_b = fields.Nested(ParticipantSchema)


class TournamentSchema(SQLAlchemySchema):
    class Meta:
        model = Tournament
        unknown = EXCLUDE
        load_instance = True
        sqla_session = db.session

    user_id = fields.Integer(required=True)
    tournament_id = fields.Integer()
    status = EnumField(StatusEnum)
    tournament_name = \
        fields.String(required=True, validate=validate.Length(max=Tournament.TOURNAMENT_NAME_LENGTH, min=1))
    tournament_description = \
        fields.String(required=True, validate=validate.Length(max=Tournament.TOURNAMENT_DESCRIPTION_LENGTH))
    is_seeded = fields.Boolean(required=True)
    has_thug_finals = fields.Boolean(required=True)
    date = fields.DateTime()
    matches = fields.List(fields.Nested(MatchSchema))
    participants = fields.List(fields.Nested(ParticipantSchema), required=True)


class TournamentListSchema(SQLAlchemySchema):
    class Meta:
        model = Tournament
        unknown = EXCLUDE
        load_instance = True
        sqla_session = db.session

    user_id = fields.Integer()
    tournament_id = fields.Integer()
    status = EnumField(StatusEnum)
    tournament_name = \
        fields.String()
    tournament_description = \
        fields.String()
    is_seeded = fields.Boolean()
    date = fields.DateTime()


class UserSchema(SQLAlchemySchema):
    class Meta:
        model = User
        unknown = EXCLUDE
        load_instance = True

    user_id = fields.Integer()
    first_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    last_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    display_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))


class CurrentUserSchema(SQLAlchemySchema):
    class Meta:
        model = User
        unknown = EXCLUDE
        load_instance = True

    user_id = fields.Integer()
    email = fields.Email(required=True, validate=validate.Length(max=User.EMAIL_LENGTH))
    first_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    last_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    display_name = fields.String(required=True, validate=validate.Length(max=User.NAME_LENGTH))
    dark_mode = fields.Boolean()


class LoginSchema(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)





