from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import Group

from .models import Usuario
from django import forms

class LoginForm(AuthenticationForm):
    username = forms.CharField(label='CPF', max_length=11)
    password = forms.CharField(label='Senha', widget=forms.PasswordInput)


class AddUserGroupForm(forms.Form):
    usuarios = forms.ModelMultipleChoiceField(
        queryset=Usuario.objects.all())


class GrupoFiltroForm(forms.Form):
    nome = forms.CharField()


class UsuarioForm(UserCreationForm):
    class Meta:
        model = Usuario
        fields = ('cpf', 'email', 'nome', 'password1', 'password2', 'is_active')

class UsuarioUpdateForm(UserCreationForm):
    class Meta:
        model = Usuario
        fields = ('nome', 'cpf', 'email', 'is_active')
    def __init__(self, *args, **kwargs):
        # first call parent's constructor
        super(UsuarioUpdateForm, self).__init__(*args, **kwargs)
        # there's a `fields` property now
        self.fields['password1'].required = False
        self.fields['password2'].required = False



class UsuarioFiltroForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ('nome', 'cpf', 'email', 'is_active')