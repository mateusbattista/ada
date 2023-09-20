from autenticacao.views import LoginView
from comum.views import IndexInternoView
from django.urls import path



urlpatterns = [
    path('', LoginView.as_view(), name='login'),
    path('ada/', IndexInternoView.as_view(), name='ada'),

]