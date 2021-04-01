import logging

from rest_framework.decorators import api_view
from rest_framework.response import Response

from myinfo.api.utils import get_authorize_url, get_access_token, get_user_info as client_get_user_info
from myinfo.api.constants import ERROR_SERVER, ERROR_NO_CODE_FOUND, ERROR_NO_TOKEN_FOUND

log = logging.getLogger('main')


@api_view(['GET'])
def get_auth_url(request):
    try:
        return Response({'url': get_authorize_url()})
    except Exception:
        log.exception('get_auth_url_exception')
        return Response({'error': ERROR_SERVER})


@api_view(['POST'])
def exchange_token(request):
    auth_code = request.data.get('code')
    if not auth_code:
        log.error('exchange_token|error_no_code_found')
        return Response({'error': ERROR_NO_CODE_FOUND})

    log.info('exchange_token|auth_code=%s', auth_code)
    try:
        token = get_access_token(auth_code)
        log.info('exchange_token|auth_code=%s,token=%s', auth_code, token)
        return Response({'token': token})
    except Exception:
        log.exception('exchange_token_exception')
        return Response({'error': ERROR_SERVER})


@api_view(['POST'])
def get_user_info(request):
    token = request.data.get('token')
    if not token:
        log.error('get_user_info|error_no_token_found')
        return Response({'error': ERROR_NO_TOKEN_FOUND})

    log.info('get_user_info|token=%s', token)
    try:
        user_info = client_get_user_info(token)
        log.info('get_user_info|token=%s,user_info=%s', token, user_info)
        return Response({'user': user_info})
    except Exception:
        log.exception('get_user_info_exception')
        return Response({'error': ERROR_SERVER})
