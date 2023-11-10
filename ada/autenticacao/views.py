from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LogoutView, LoginView
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView
from django.views.generic.edit import FormView, CreateView, UpdateView
from django.contrib.auth.models import Group, Permission
from django.urls import reverse_lazy
from autenticacao.forms import AddUserGroupForm, GrupoFiltroForm, LoginForm, UsuarioForm, UsuarioFiltroForm, \
    UsuarioUpdateForm
from .models import Usuario

# Create your views here.

CustomUser = get_user_model()
class LoginView(View):
    def get(self, request):
        form = LoginForm()
        return render(request, 'login.html', {'form': form})

    def post(self, request):
        form = LoginForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = Usuario.objects.get(cpf=username)
            if user.check_password(password):
                login(request, user)
                return redirect('dashboard')
        return render(request, 'login.html', {'form': form})

class DashboardView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'base-interno.html')

class LogoutView(LoginRequiredMixin, View):
    def get(self, request):
        logout(request)
        return redirect('login')


class GroupListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
    model = Group
    context_object_name = 'grupos'
    template_name = 'grupo_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = GrupoFiltroForm()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        nome = self.request.GET.get('nome')

        if nome:
            queryset = queryset.filter(name__icontains=nome)

        return queryset

    def dispatch(self, request, *args, **kwargs):

        if not request.user.has_perm("auth.view_group"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)

class AddUserGroupView(FormView):
    template_name = 'add_user_group.html'
    form_class = AddUserGroupForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Obtém o grupo requisitado através do parâmetro de URL
        grupo_id = self.kwargs['pk']
        context['grupo'] = Group.objects.get(pk=grupo_id)
        context['usuarios'] = Usuario.objects.filter(groups__id=grupo_id)
        return context

    def form_valid(self, form):
        # Obtém o grupo requisitado através do parâmetro de URL
        grupo_id = self.kwargs['pk']
        grupo = Group.objects.get(pk=grupo_id)

        # Obtém a lista de usuários selecionados no formulário
        usuarios_selecionados = form.cleaned_data['usuarios']

        # Adiciona o grupo aos usuários selecionados
        for usuario in usuarios_selecionados:
            usuario.groups.add(grupo)  # Adiciona o usuário ao grupo do Django

        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('grupo_list')  # Substitua pela URL de redirecionamento após a criação


@method_decorator(csrf_exempt, name='dispatch')
class RemoverUsuarioDoGrupoView(View):
    def get(self, request, *args, **kwargs):
        grupo_id = self.kwargs['grupo_id']
        usuario_pk = self.kwargs['usuario_pk']

        grupo = Group.objects.get(pk=grupo_id)
        usuario = Usuario.objects.get(pk=usuario_pk)

        if usuario in grupo.user_set.all():
            grupo.user_set.remove(usuario)

        return redirect('grupo_add_user', pk=grupo_id)

class UserCreateView(LoginRequiredMixin,CreateView):
    login_url = '/autenticacao/login/'
    model = Usuario
    form_class = UsuarioForm
    template_name = 'user_create_update.html'
    success_url = '/autenticacao/usuarios/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("autenticacao.add_usuario"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)

class UserListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
    model = Usuario
    context_object_name = 'usuarios'
    template_name = 'user_list.html'
    paginate_by = 20

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.request.GET:
            nome_filtro = self.request.GET.get("nome")
            cpf_filtro = self.request.GET.get("cpf")
            email_filtro = self.request.GET.get("email")
            is_active_filtro = self.request.GET.get("is_active")
            if is_active_filtro == 'on':
                is_active_filtro = True
            else:
                is_active_filtro = False

            if nome_filtro:
                queryset = queryset.filter(nome__icontains=nome_filtro)

            if email_filtro:
                queryset = queryset.filter(email__icontains=email_filtro)


            queryset = queryset.filter(is_active=is_active_filtro)

            if cpf_filtro:
                queryset = queryset.filter(cpf__icontains=cpf_filtro)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["usuario_filtro_form"] = UsuarioFiltroForm()
        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("autenticacao.view_usuario"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)

class UserUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = UsuarioUpdateForm
    model = Usuario
    template_name = 'user_create_update.html'
    success_url = '/autenticacao/usuarios/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("autenticacao.change_usuario"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)

def usuario_delete(request, pk):
    usuario = Usuario.objects.get(pk=pk)
    usuario.delete()
    return redirect('usuarios')


def usuario_desativar(request, pk):
    usuario = Usuario.objects.get(pk=pk)
    if usuario.is_active:
        usuario.is_active = False
    else:
        usuario.is_active = True

    usuario.save()
    return redirect('usuarios')

class EditButtonPermission(Permission):
    """
    Permissão para visualizar o botão de editar
    """

    name = 'can_edit_button'
    codename = 'edit_button'