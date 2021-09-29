from datetime import datetime, timedelta, timezone
from app.api import bp
from app import db
from flask_jwt_extended import create_access_token, set_access_cookies, get_jwt, get_jwt_identity, unset_jwt_cookies
from flask import request, jsonify
from marshmallow import ValidationError
from app.api.errors import unauthorized, bad_request
from app.models import User
from app.api.schemas import LoginSchema, CurrentUserSchema


@bp.route('/login', methods=['POST'])
def login():
    login_schema = LoginSchema()
    user_schema = CurrentUserSchema(session=db.session)
    try:
        data = request.get_json()
        credentials = login_schema.load(data)
        user = User.query.filter_by(email=credentials['email']).first()
        if user and user.check_password(credentials['password']):
            access_token = create_access_token(identity=user.user_id)
            response = jsonify(user=user_schema.dump(user), token=access_token)
            return response
        return unauthorized('Username or password is incorrect')
    except ValidationError as err:
        return bad_request(err.messages)
