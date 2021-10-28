from flask import Blueprint

bp = Blueprint('main', __name__)

from app.main import routes
# from app.auth_api import routes