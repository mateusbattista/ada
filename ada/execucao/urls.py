from django.urls import path
from execucao.views import *

urlpatterns = [
    path("fornecedor/", FornecedorListView.as_view(), name="fornecedor"),
    path('fornecedor/add/', FornecedorCreateView.as_view(), name='fornecedor_add'),
    path('fornecedor/update/<pk>', FornecedorUpdateView.as_view(), name='fornecedor_update'),
    path('fornecedor/delete_nota/<int:pk>',delete_nota, name='delete_nota'),
    path('fornecedor/delete_documento/<int:pk>',delete_documento, name='delete_documento'),

]
