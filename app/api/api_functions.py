"""
Utility functions for api
"""
from app.api import bp


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    """
    Registers a resource to the api.
    :param view: The method view class for the resource
    :param endpoint: The designated endpoint for this resource
    :param url: The URL prefix for this resource
    :param pk: The primary key for obtaining a singular instance of the resource
    :param pk_type: The type of the primary key
    """
    view_func = view.as_view(endpoint)
    bp.add_url_rule(url, defaults={pk: None},
                    view_func=view_func, methods=['GET', ])
    bp.add_url_rule(url, view_func=view_func, methods=['POST', ])
    bp.add_url_rule('%s<%s:%s>' % (url, pk_type, pk), view_func=view_func,
                    methods=['GET', 'PUT', 'DELETE'])
