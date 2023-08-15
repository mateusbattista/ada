from django.urls import path
from autenticacao.views import GroupListView, AddUserGroupView, \
    RemoverUsuarioDoGrupoView, LoginView, DashboardView, LogoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('grupos/', GroupListView.as_view(), name='grupo_list'),
    path('grupos/adicionar_usuarios/<pk>', AddUserGroupView.as_view(), name='grupo_add_user'),
    path('remover_usuario/grupo/<int:grupo_id>/<int:usuario_pk>/', RemoverUsuarioDoGrupoView.as_view(), name='remover_usuario_do_grupo'),
]