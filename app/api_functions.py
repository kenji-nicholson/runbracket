from flask import current_app


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    view_func = view.as_view(endpoint)
    current_app.add_url_rule(url, defaults={pk: None},
                             view_func=view_func, methods=['GET', ])
    current_app.add_url_rule(url, view_func=view_func, methods=['POST', ])
    current_app.add_url_rule('%s<%s:%s>' % (url, pk_type, pk), view_func=view_func,
                             methods=['GET', 'PUT', 'DELETE'])
