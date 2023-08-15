from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import Usuario
from django import forms

class LoginForm(AuthenticationForm):
    username = forms.CharField(label='CPF', max_length=11)
    password = forms.CharField(label='Senha', widget=forms.PasswordInput)


class AddUserGroupForm(forms.Form):
    usuarios = forms.ModelMultipleChoiceField(queryset=Usuario.objects.all())


class GrupoFiltroForm(forms.Form):
    nome = forms.CharField()
