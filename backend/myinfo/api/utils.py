from functools import wraps

from myinfo.client import MyInfoClient
from myinfo.security import get_decoded_access_token, get_decrypted_person_data


def get_client(view_fn):
    @wraps(view_fn)
    def wrapper(*args, **kwargs):
        client = MyInfoClient()
        return view_fn(client, *args, **kwargs)
    return wrapper


@get_client
def get_authorize_url(client):
    return client.get_authorise_url(state="blahblah")


@get_client
def get_access_token(client, auth_code):
    resp = client.get_access_token(auth_code)
    access_token = resp["access_token"]
    return access_token


@get_client
def get_user_info(client, token):
    decoded_access_token = get_decoded_access_token(token)
    uinfin = decoded_access_token["sub"]
    response = client.get_person(uinfin=uinfin, access_token=token)
    data = get_decrypted_person_data(response)
    return data
