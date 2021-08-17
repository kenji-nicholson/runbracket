"""
Endpoints for tournament related API calls.
"""
import sys
from flask import request, jsonify, url_for
from flask.views import MethodView
from marshmallow import ValidationError

from sqlalchemy import or_
from app import db
from app.api.api_functions import register_api, PaginatedAPIMixin
from app.api.errors import bad_request, unauthorized
from app.api.schemas import UserSchema, LoginSchema
from app.models import User
from app.api import bp
from flask_jwt_extended import create_access_token


class UserAPI(MethodView, PaginatedAPIMixin):
    """
    Endpoints for managing users 
    """

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
            return jsonify(self.user_schema.dump(user), file=sys.stderr)

    def post(self):
        try:
            data = request.get_json()
            user = self.user_schema.load(data)
            if User.query.filter(or_(User.email == user.email, User.display_name == user.display_name)).first():
                return bad_request('Please use a different email and/or display name.')
            if 'password' not in data:
                return bad_request('Password is required')
            user.set_password(data['password'])
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

    def put(self, user_id):
        pass


@bp.route('/login', methods=['POST'])
def login():
    login_schema = LoginSchema()
    user_schema = UserSchema(session=db.session)
    try:
        data = request.get_json()
        credentials = login_schema.load(data)
        user = User.query.filter_by(email=credentials['email']).first()
        if user and user.check_password(credentials['password']):
            access_token = create_access_token(identity=user.display_name)
            return jsonify(user_schema.dump(user), access_token)
        return unauthorized('Username or password is incorrect')
    except ValidationError as err:
        return bad_request(err.messages)


register_api(UserAPI, 'user_api', '/users/', pk='user_id')
