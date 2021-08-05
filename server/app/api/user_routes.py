"""
Endpoints for tournament related API calls.
"""
from flask import request, jsonify
from flask.views import MethodView
from app.models import User 
from app.api.api_functions import register_api, PaginatedAPIMixin
from app.api.schemas import TournamentSchema, MatchSchema, ParticipantSchema
from app.api.errors import bad_request

class TournamentParticipantsAPI(MethodView):
    """
    Endpoints for managing/viewing participants within a specified tournament.
    """

    participants_schema = ParticipantSchema(many=True)
    participant_schema = ParticipantSchema()

    def get(self, tournament_id, participant_id):
        if participant_id is None:
            # retrieve all participants for tournament
            tournament = Tournament.query.get(tournament_id)
            if not tournament:
                return bad_request('Tournament does not exist!')
            return self.participants_schema.dump(tournament.participants)
        else:
            # retrieve single participant
            tournament = Tournament.query.get(tournament_id)
            if not tournament:
                return bad_request('Tournament does not exist!')
            participant = Participant.query.get(participant_id)
            if not participant:
                return bad_request('Participant does not exist!')
            return self.participant_schema.dump(participant)

    def delete(self, tournament_id, participant_id):
        pass

    def put(self, tournament_id, participant_id):
        pass

class UserAPI(MethodView):
    """
    Endpoints for managing users 
    """

    def get(self, user_id):
        if user_id is None:
            users = User.query.
            
register_api(TournamentAPI, 'tournament_api', '/tournaments/', pk='tournament_id')
register_api(TournamentMatchesAPI, 'tournament_matches_api', '/tournaments/<int:tournament_id>/matches/',
             pk='match_id')
register_api(TournamentParticipantsAPI, 'tournament_participant_api', '/tournaments/<int:tournament_id>/participants/',
             pk='participant_id')
