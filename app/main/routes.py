from app.main import bp


@bp.route('/')
def index():
    return bp.send_static_file('index.html')


@bp.errorhandler(404)
def not_found(e):
    return bp.send_static_file('index.html')