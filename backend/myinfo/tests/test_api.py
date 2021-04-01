from django.test import TestCase

from rest_framework.test import APIClient

from myinfo.api.constants import ERROR_SERVER, ERROR_NO_TOKEN_FOUND, ERROR_NO_CODE_FOUND


class APITestCase(TestCase):

    def test_auth_url(self):
        client = APIClient()
        resp = client.get('/auth/')
        assert resp.status_code == 200
        assert resp.data == {'url': 'https://test.api.myinfo.gov.sg/com/v3/authorise?client_id=STG2-MYINFO-SELF-TEST'
                                    '&attributes=uinfin,name,sex,race,nationality,dob,email,mobileno,regadd,housingtype'
                                    ',hdbtype,marital,edulevel,ownerprivate,cpfcontributions,cpfbalances,birthcountry,'
                                    'residentialstatus,aliasname,marriedname,passtype,employmentsector,noahistory&pur'
                                    'pose=credit%20risk%20assessment&state=blahblah&redirect_uri=http://localhost:3001'
                                    '/callback'}

    def test_exchange_token_no_code(self):
        client = APIClient()
        resp = client.post('/exchange/')
        assert resp.status_code == 200
        assert resp.data == {'error': ERROR_NO_CODE_FOUND}

    def test_exchange_token_wrong_code(self):
        client = APIClient()
        resp = client.post('/exchange/', data={'code': 'abcdef'}, format='json')
        assert resp.status_code == 200
        assert resp.data == {'error': ERROR_SERVER}

    def test_get_user_info_no_token(self):
        client = APIClient()
        resp = client.post('/info/')
        assert resp.status_code == 200
        assert resp.data == {'error': ERROR_NO_TOKEN_FOUND}

    def test_get_user_info_wrong_token(self):
        client = APIClient()
        resp = client.post('/info/', data={'token': 'abcdef'}, format='json')
        assert resp.status_code == 200
        assert resp.data == {'error': ERROR_SERVER}

    def test_get_user_info(self):
        # should not pass when token is expired
        client = APIClient()
        resp = client.post('/info/', data={'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Il9SQzZ4d09NdmJ0d'
                                                    'DZhald1WmU2R2xncy1qM3dtNXJpQXlDVW9SYXNhLUkifQ.eyJzdWIiOiJ4NWRh'
                                                    'MmNjN2MtOGQ2ZS0xZWFmLTI3NzItZjg4MTY0ZWEyOThkIiwianRpIjoiU1ROb'
                                                    'ThXeHp5Yno0MHhaMUxaVThoTzZ1VGhKV0tsQjB4TWJCUHRQdCIsInNjb3BlIj'
                                                    'pbInVpbmZpbiIsIm5hbWUiLCJzZXgiLCJyYWNlIiwibmF0aW9uYWxpdHkiLCJ'
                                                    'kb2IiLCJlbWFpbCIsIm1vYmlsZW5vIiwicmVnYWRkIiwiaG91c2luZ3R5cGUi'
                                                    'LCJoZGJ0eXBlIiwibWFyaXRhbCIsImVkdWxldmVsIiwib3duZXJwcml2YXRlI'
                                                    'iwiY3BmY29udHJpYnV0aW9ucyIsImNwZmJhbGFuY2VzIiwiYmlydGhjb3VudH'
                                                    'J5IiwicmVzaWRlbnRpYWxzdGF0dXMiLCJhbGlhc25hbWUiLCJtYXJyaWVkbmF'
                                                    'tZSIsInBhc3N0eXBlIiwiZW1wbG95bWVudHNlY3RvciIsIm5vYWhpc3Rvcnki'
                                                    'XSwidG9rZW5OYW1lIjoiYWNjZXNzX3Rva2VuIiwidG9rZW5fdHlwZSI6IkJlY'
                                                    'XJlciIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJleHBpcm'
                                                    'VzX2luIjoxODAwLCJhdWQiOiJTVEcyLU1ZSU5GTy1TRUxGLVRFU1QiLCJyZWF'
                                                    'sbSI6Im15aW5mby1jb20iLCJpc3MiOiJodHRwczovL3Rlc3QuYXBpLm15aW5m'
                                                    'by5nb3Yuc2cvc2VydmljZWF1dGgvbXlpbmZvLWNvbSIsImlhdCI6MTYxNzEwM'
                                                    'DU0NiwibmJmIjoxNjE3MTAwNTQ2LCJleHAiOjE2MTcxMDIzNDZ9.ohjjtpXvf'
                                                    'o3skqtyTLK_0p15dbK4hulIWFQroXE0d10DK-LUNkKDszeiRWm3hvdOjPnk0E'
                                                    'aOfFftx3KCnnp3lBh7QBwgGeuHCW4hoMUB2hSSDRczf2-ZqxxNQYp9wFHDqjS'
                                                    'EKSITMaQJF10AyWYkZtZvbtrD7AszLgu_Gcxk0PCGFiXlN_JUx7cIN3qISPpZ'
                                                    'Jpc8xhAJyijOTMPnjVVW5EyPL18_CiRP7-AliX9q6aZDyFpFai2lgL_q3CLSd'
                                                    'bTSt1DMaXOGCD55KU-Cx1FdrdlF32GaOPSLlAAm_S8fgYJMsvE1LQq2Cyc0XM'
                                                    '-5xYqn0MsQTMAOO_e_bmUceTTa4Q'}, format='json')
        assert resp.status_code == 200
        assert 'error' not in resp.data
