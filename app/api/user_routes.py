"""
Endpoints for tournament related API calls.
"""
import sys
from datetime import date

from flask import request, jsonify, url_for
from flask.views import MethodView
from marshmallow import ValidationError

from sqlalchemy import or_
from app import db
from app.api.api_functions import register_api, PaginatedAPIMixin
from app.api.errors import bad_request, unauthorized, forbidden
from app.api.schemas import UserSchema, CurrentUserSchema
from app.models import User
from app.api import bp
from flask_jwt_extended import get_jwt_identity, jwt_required


class UserAPI(MethodView, PaginatedAPIMixin):
    """
    Endpoints for managing users 
    """
    current_user_schema = CurrentUserSchema(session=db.session)

    user_schema = UserSchema(session=db.session)
    users_schema = UserSchema(many=True, session=db.session)

    def get(self, user_id):
        if user_id is None:
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 100)
            data = self.get_paginated_collection(User.query, self.users_schema, page, per_page,
                                                 'api.user_api')
            return jsonify(data)
        else:
            user = User.query.get(user_id)
            if not user:
                return bad_request('User does not exist!')
            return jsonify(self.user_schema.dump(user))

    def post(self):
        try:
            data = request.get_json()
            user = self.current_user_schema.load(data)
            if User.query.filter(or_(User.email == user.email, User.display_name == user.display_name)).first():
                return bad_request('Please use a different email and/or display name.')
            if 'password' not in data:
                return bad_request('Password is required')
            user.set_password(data['password'])
            user.register_date = date.today()
            db.session.add(user)
            db.session.commit()
            response = jsonify(self.user_schema.dump(user))
            response.status_code = 201
            response.headers['Location'] = url_for('api.user_api')
            return response
        except ValidationError as err:
            return bad_request(err.messages)

    def delete(self, user_id):
        pass

    @jwt_required()
    def put(self, user_id):
        try:
            current_user = get_jwt_identity()
            if user_id != current_user:
                return forbidden("Wrong user.")
            user = User.query.get(user_id)
            data = request.get_json()
            if 'display_name' in data and data['display_name'] != user.display_name and \
                    User.query.filter_by(display_name=data['display_name']).first():
                return bad_request('Please use a different username')
            if 'email' in data and data['email'] != user.email and \
                    User.query.filter_by(email=data['email']).first():
                return bad_request('Please use a different email address')
            user = self.current_user_schema.load(data, instance=user)
            db.session.commit()
            return jsonify(self.current_user_schema.dump(user))
        except ValidationError as err:
            return bad_request(err.messages)


register_api(UserAPI, 'user_api', '/users/', pk='user_id')
