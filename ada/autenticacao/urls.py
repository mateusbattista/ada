from django.urls import path
from autenticacao.views import LoginPageView, LogoutPageView


urlpatterns = [
    path('login/', LoginPageView.as_view(), name='login'),
    path('logout/', LogoutPageView.as_view(), name='logout'),
]