from django.urls import path
from execucao.views import *

urlpatterns = [
    path("fornecedor/", FornecedorListView.as_view(), name="fornecedor"),
    path('fornecedor/add/', FornecedorCreateView.as_view(), name='fornecedor_add'),
    path('fornecedor/update/<pk>', FornecedorUpdateView.as_view(), name='fornecedor_update'),
    path('fornecedor/delete_nota/<int:pk>',delete_nota, name='delete_nota'),
    path('fornecedor/delete_documento/<int:pk>',delete_documento, name='delete_documento'),
    path('fornecedor/salvar_avaliador/',salvar_avaliador, name='salvar_avaliador'),
    path("solicitacaocestas/", SolicitacaoCestasListView.as_view(), name="solicitacaocestas"),
    path('solicitacaocestas/add/', SolicitacaoCestasCreateView.as_view(), name='solicitacaocestas_add'),
    path('solicitacaocestas/avaliacao/<pk>', SolicitacaoCestasUpdateView.as_view(), name='solicitacaocestas_update'),
    path('solicitacaocestas/solicitacao_cestas_delete_nota/<int:pk>', solicitacao_cestas_delete_nota, name='solicitacao_cestas_delete_nota'),
    path('solicitacaocestas/salvar_avaliador_cestas/', salvar_avaliador_cestas, name='salvar_avaliador_cestas'),

]
