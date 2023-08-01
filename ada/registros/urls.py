from django.urls import path
from registros.views import *

urlpatterns = [
    path("portaria/", PortariaListView.as_view(), name="tipo_portaria"),
    path('portaria/add', PortariaCreateView.as_view(), name='tipo_portaria_add'),
    path('portaria/update/<pk>', PortariaUpdateView.as_view(), name='tipo_portaria_update'),
    path("evento/", EventoListView.as_view(), name="tipo_evento"),
    path('evento/add', EventoCreateView.as_view(), name='tipo_evento_add'),
    path('evento/update/<pk>', EventoUpdateView.as_view(), name='tipo_evento_update'),
    path("publico/", PublicoListView.as_view(), name="tipo_publico"),
    path('publico/add', PublicoCreateView.as_view(), name='tipo_publico_add'),
    path('publico/update/<pk>', PublicoUpdateView.as_view(), name='tipo_publico_update'),

]
