"""
Start up class for PP3 flask application.
This is where the app gets initialized.
"""
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
from flask_marshmallow import Marshmallow

from config import Config

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()
mail = Mail()


def create_app(config_class=Config):
    """
    Creates a new instance of the Flask application based on given configuration
    :param config_class: The class to configure this instance with
    :return: The constructed application
    """

    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.auth_api import bp as auth_api_bp
    app.register_blueprint(auth_api_bp, url_prefix='/auth/api')

    from app.api import bp as tournament_api_bp
    app.register_blueprint(tournament_api_bp, url_prefix='/tournament/api')

    if not app.debug and not app.testing:
        # Configure mail server
        if app.config['MAIL_SERVER']:
            auth = None
            if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
                auth = (app.config['MAIL_USERNAME'],
                        app.config['MAIL_PASSWORD'])
            secure = None
            if app.config['MAIL_USE_TLS']:
                secure = ()
            mail_handler = SMTPHandler(
                mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
                fromaddr='no-reply@' + app.config['MAIL_SERVER'],
                toaddrs=app.config['ADMINS'], subject='PP3 Failure',
                credentials=auth, secure=secure)
            mail_handler.setLevel(logging.ERROR)
            app.logger.addHandler(mail_handler)

        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/pp3.log',
                                           maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('PP3 startup')

    return app
