from rest_framework.views import exception_handler


def my_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        code = response.data['detail'].code
        if code == 'no_active_account':
            response.data['status_code'] = 404
        else:
            response.data['status_code'] = response.status_code

    return response
