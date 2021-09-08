"""
Endpoints for tournament related API calls.
"""
from flask import request, jsonify, url_for
from flask.views import MethodView
from marshmallow import ValidationError

from app.api.services import create_tournament
from app.models import Tournament, Match, Participant
from app.api.api_functions import register_api, PaginatedAPIMixin
from app.api.schemas import TournamentSchema, MatchSchema, ParticipantSchema
from app.api.errors import bad_request


class TournamentAPI(MethodView, PaginatedAPIMixin):
    """
    Endpoints for managing/viewing overall tournament information.
    """
    tournament_schema = TournamentSchema()
    tournaments_schema = TournamentSchema(many=True)

    def get(self, tournament_id):
        if tournament_id is None:
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 100)
            data = self.get_paginated_collection(Tournament.query, self.tournaments_schema, page, per_page,
                                                 'api')
            return jsonify(data)
        else:
            tournament = Tournament.query.get(tournament_id)
            if not tournament:
                return bad_request('Tournament does not exist!')
            return self.tournament_schema.dump(tournament)
        
    def post(self):
        try:
            data = request.get_json()
            tournament = self.tournament_schema.load(data)
            inserted_tournament = create_tournament(tournament)
            response = jsonify(self.tournament_schema.dump(inserted_tournament))
            response.status_code = 201
            response.headers['Location'] = url_for('api.tournament_api')
            return response
        except ValidationError as err:
            return bad_request(err.messages)

    def delete(self, tournament_id):
        pass

    def put(self, tournament_id):
        pass


class TournamentMatchesAPI(MethodView):
    """
    Endpoints for managing/viewing matches belonging to a specified tournament.
    """

    match_schema = MatchSchema()

    def get(self, tournament_id, match_id):
        if match_id is None:
            # retrieve all matches for tournament
            # TODO: figure out how to best return all matches in a tournament
            pass
        else:
            # retrieve single match
            tournament = Tournament.query.get(tournament_id)
            if not tournament:
                return bad_request('Tournament does not exist!')
            match = Match.query.get(match_id)
            if not match:
                return bad_request('Match does not exist!')
            return self.match_schema.dump(match)

    def delete(self, tournament_id, match_id):
        pass

    def put(self, tournament_id, match_id):
        pass


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


register_api(TournamentAPI, 'tournament_api', '/tournaments/', pk='tournament_id')
register_api(TournamentMatchesAPI, 'tournament_matches_api', '/tournaments/<int:tournament_id>/matches/',
             pk='match_id')
register_api(TournamentParticipantsAPI, 'tournament_participant_api', '/tournaments/<int:tournament_id>/participants/',
             pk='participant_id')
