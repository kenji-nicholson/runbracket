"""
Endpoints for tournament related API calls.
"""
from flask.views import MethodView
from app.models import Tournament, Match, Participant
from app.api.api_functions import register_api


class TournamentAPI(MethodView):
    """
    Endpoints for managing/viewing overall tournament information.
    """
    def get(self, tournament_id):
        if tournament_id is None:
            pass
        else:
            pass

    def post(self):
        pass

    def delete(self, tournament_id):
        pass

    def put(self, tournament_id):
        pass


class TournamentMatchesAPI(MethodView):
    """
    Endpoints for managing/viewing matches belonging to a specified tournament.
    """
    def get(self, tournament_id, match_id):
        if match_id is None:
            pass
        else:
            pass

    def post(self, tournament_id):
        pass

    def delete(self, tournament_id, match_id):
        pass

    def put(self, tournament_id, match_id):
        pass


class TournamentParticipantsAPI(MethodView):
    """
    Endpoints for managing/viewing participants within a specified tournament.
    """
    def get(self, tournament_id, participant_id):
        if participant_id is None:
            pass
        else:
            pass

    def post(self, tournament_id):
        pass

    def delete(self, tournament_id, participant_id):
        pass

    def put(self, tournament_id, participant_id):
        pass


register_api(TournamentAPI, 'tournament_api', '/tournaments/', pk='tournament_id')
register_api(TournamentMatchesAPI, 'tournament_matches_api', '/tournaments/<int:tournament_id>/matches/',
             pk='match_id')
register_api(TournamentParticipantsAPI, 'tournament_participant_api', '/tournaments/<int:tournament_id>/participants/',
             pk='participant_id')
