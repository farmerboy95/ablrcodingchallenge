from django.urls import path

from myinfo.api import views


urlpatterns = [
    path('auth/', views.get_auth_url),
    path('exchange/', views.exchange_token),
    path('info/', views.get_user_info),
]
