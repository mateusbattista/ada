from django.urls import path
from registros.views import *

urlpatterns = [
    path("portaria/", PortariaListView.as_view(), name="tipo_portaria"),
    path('portaria/add', PortariaCreateView.as_view(), name='tipo_portaria_add'),
    path('portaria/update/<pk>', PortariaUpdateView.as_view(), name='tipo_portaria_update'),
    path('portaria/delete/<pk>', Portaria_delete, name='tipo_portaria_delete'),
    path("evento/", EventoListView.as_view(), name="tipo_evento"),
    path('evento/add', EventoCreateView.as_view(), name='tipo_evento_add'),
    path('evento/update/<pk>', EventoUpdateView.as_view(), name='tipo_evento_update'),
    path('evento/delete/<pk>', Evento_delete, name='tipo_evento_delete'),
    path("publico/", PublicoListView.as_view(), name="tipo_publico"),
    path('publico/add', PublicoCreateView.as_view(), name='tipo_publico_add'),
    path('publico/update/<pk>', PublicoUpdateView.as_view(), name='tipo_publico_update'),
    path('publico/delete/<pk>', Publico_delete, name='tipo_publico_delete'),
    path("solicitacao/", SolicitacaoListView.as_view(), name="solicitacao"),
    path('solicitacao/add', SolicitacaoCreateView.as_view(), name='solicitacao_add'),
    path('solicitacao/update/<pk>', SolicitacaoUpdateView.as_view(), name='solicitacao_update'),
    path("termoadesao/", TermoAdesaoListView.as_view(), name="termoadesao"),
    path('termoadesao/add', TermoAdesaoCreateView.as_view(), name='termoadesao_add'),
    path('termoadesao/update/<pk>', TermoAdesaoUpdateView.as_view(), name='termoadesao_update'),
    path('termoadesao/delete_termo_adesao/<int:pk>/<int:ck>',
         delete_termo_adesao, name='delete_termo_adesao'),
    path("termoadesao_local/", TermoAdesaoLocalListView.as_view(), name="termoadesao_local"),
    path('termoadesao_local/update/<pk>', TermoAdesaoLocalUpdateView.as_view(), name='termoadesao_local_update'),

]
