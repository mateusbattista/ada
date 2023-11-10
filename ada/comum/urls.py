from autenticacao.views import LoginView
from comum.views import IndexInternoView, IndexView
from django.urls import path



urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('login/', LoginView.as_view(), name='login'),
    path('ada/', IndexInternoView.as_view(), name='ada'),

]