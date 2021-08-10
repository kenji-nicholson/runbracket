"""
Utility functions for api
"""
from flask import url_for

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


class PaginatedAPIMixin(object):
    @staticmethod
    def get_paginated_collection(query, schema, page, per_page, endpoint, **kwargs):
        resources = query.paginate(page, per_page, False)
        data = {
            'items': schema.dump(resources.items),
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': url_for(endpoint, page=page, per_page=per_page,
                                **kwargs),
                'next': url_for(endpoint, page=page + 1, per_page=per_page,
                                **kwargs) if resources.has_next else None,
                'prev': url_for(endpoint, page=page - 1, per_page=per_page,
                                **kwargs) if resources.has_prev else None
            }
        }
        return data
