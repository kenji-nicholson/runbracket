from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(username, password):
    pass


@basic_auth.error_handler
def basic_auth_error(status):
    pass


@token_auth.verify_token
def verify_token(token):
    pass


@token_auth.error_handler
def token_auth_error(status):
    pass
