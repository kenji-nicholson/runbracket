from app import ma

from app.models import *


class TournamentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Tournament
        fields = ("tournament_id", "date", "tournament_name", "tournament_description")


class ParticipantSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Participant
        fields = ("participant_id", "participant_name", "seed")


class MatchSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Match
        fields = ("match_id", "date", "participant_a_score", "participant_b_score", "participant_a", "participant_b",
                  "match_number")

    participant_a = ma.Nested(ParticipantSchema)
    participant_b = ma.Nested(ParticipantSchema)


