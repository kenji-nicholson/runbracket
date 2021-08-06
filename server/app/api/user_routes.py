"""
Endpoints for tournament related API calls.
"""
from flask import request, jsonify, url_for
from flask.views import MethodView
from app import db
from app.models import User 
from app.api.api_functions import register_api, PaginatedAPIMixin
from app.api.schemas import UserSchema
from app.api.errors import bad_request
from marshmallow import ValidationError


class UserAPI(MethodView, PaginatedAPIMixin):
    """
    Endpoints for managing users 
    """

    user_schema = UserSchema()
    users_schema = UserSchema(many=True)

    def get(self, user_id):
        if user_id is None:
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 100)
            data = self.get_paginated_collection(User.query, self.users_schema, page, per_page,
                                                'user_api')
            return jsonify(data)
        else:
            user = User.query.get(user_id)
            if not user:
                return bad_request('User does not exist!')
            return self.user_schema.dump(user)

    def post(self):
        try:
            user = self.user_schema.load(request.get_json())
            if User.query.filter_by(email=user.email, display_name=user.display_name).first():
                return bad_request('Please use a different email')
            if
            user.set_password()
            db.session.add(user)
            db.session.commit()
            response = self.user_schema.dump(user)
            response.status_code = 201
            response.headers['Location'] = url_for('api.user_api')
        except ValidationError as err:
            return bad_request(err.messages)

    def delete(self, user_id):
        pass

    def put(self, user_id):
        pass
                
register_api(UserAPI, 'user_api', '/users/', pk='user_id')
