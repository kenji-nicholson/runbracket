"""
Endpoints for tournament related API calls.
"""
from flask.views import MethodView

from app.api_functions import register_api


class TournamentAPI(MethodView):

    def get(self, tournament_id):
        pass

    def post(self):
        pass

    def delete(self, tournament_id):
        pass

    def put(self, tournament_id):
        pass


register_api(TournamentAPI, 'tournament_api', '/tournaments/', pk='tournament_id')
