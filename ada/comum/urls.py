from comum.views import IndexView, IndexInternoView
from django.urls import path



urlpatterns = [
    path('',  IndexView.as_view(), name='index'),
    path('ada/', IndexInternoView.as_view(), name='cisternas'),

]