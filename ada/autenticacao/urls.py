from django.urls import path
from autenticacao.views import GroupListView, AddUserGroupView, \
    RemoverUsuarioDoGrupoView, LoginView, DashboardView, LogoutView, UserCreateView, UserListView, UserUpdateView, \
    usuario_delete, usuario_desativar

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('grupos/', GroupListView.as_view(), name='grupo_list'),
    path('usuarios/', UserListView.as_view(), name='usuarios'),
    path('usuarios/add', UserCreateView.as_view(), name='usuarios_add'),
    path('usuarios/update/<pk>', UserUpdateView.as_view(), name='usuarios_update'),
    path('usuarios/remove/<pk>', usuario_delete , name='usuario_delete'),
    path('usuarios/desativar/<pk>', usuario_desativar , name='usuario_desativar'),
    path('grupos/adicionar_usuarios/<pk>', AddUserGroupView.as_view(), name='grupo_add_user'),
    path('remover_usuario/grupo/<int:grupo_id>/<int:usuario_pk>/', RemoverUsuarioDoGrupoView.as_view(), name='remover_usuario_do_grupo'),
]