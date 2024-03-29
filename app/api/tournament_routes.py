"""
Endpoints for tournament related API calls.
"""
import sys

from flask import request, jsonify, url_for
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

from app.api.services import create_tournament, advance_participant
from app.models import Tournament, Match, Participant, User
from app.api.api_functions import register_api, PaginatedAPIMixin
from app.api.schemas import TournamentSchema, MatchSchema, ParticipantSchema, TournamentListSchema
from app.api.errors import bad_request, forbidden
from app import db


class TournamentAPI(MethodView, PaginatedAPIMixin):
    """
    Endpoints for managing/viewing overall tournament information.
    """
    tournament_schema = TournamentSchema(session=db.session)
    tournament_list_schema = TournamentListSchema(many=True, session=db.session)
    tournaments_schema = TournamentSchema(many=True, session=db.session)

    def get(self, tournament_id):
        if tournament_id is None:
            user = request.args.get('user_id')
            query = Tournament.query if user is None else Tournament.query.filter_by(user_id=user)
            query = query.order_by(Tournament.date.desc())
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 100)
            data = self.get_paginated_collection(query, self.tournament_list_schema, page, per_page,
                                                 'api.tournament_api')
            return jsonify(data)
        else:
            tournament = Tournament.query.get(tournament_id)
            if not tournament:
                return bad_request('Tournament does not exist!')
            return self.tournament_schema.dump(tournament)

    @jwt_required()
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
            db.session.rollback()
            return bad_request(err.messages)

    def delete(self, tournament_id):
        pass

    def put(self, tournament_id):
        pass


class TournamentMatchesAPI(MethodView):
    """
    Endpoints for managing/viewing matches belonging to a specified tournament.
    """

    match_schema = MatchSchema(session=db.session)
    participant_schema = ParticipantSchema(session=db.session)

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
            return jsonify(self.match_schema.dump(match))

    def delete(self, tournament_id, match_id):
        pass

    @jwt_required()
    def put(self, tournament_id, match_id):
        try:
            current_user = get_jwt_identity()
            tournament = Tournament.query.get(tournament_id)
            if current_user != tournament.user_id:
                return forbidden("Permission denied.")
            data = request.get_json()
            match = self.match_schema.load(data)
            if match.winner_id is not None:
                advance_participant(match)
            db.session.commit()
            return jsonify(self.match_schema.dump(match))
        except ValidationError as err:
            db.session.rollback()
            return bad_request(err.messages)


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
