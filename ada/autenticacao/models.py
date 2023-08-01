from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models

# Create your models here.


class UsuarioManager(BaseUserManager):
    def create_user(self, cpf_cnpj, email, nome, password=None):
        if not cpf_cnpj:
            raise ValueError('Um CPF deve ser especificado')
        if not email:
            raise ValueError('Um e-mail deve ser especificado')
        if not nome:
            raise ValueError('Um nome deve ser especificado')
        email_normalizado = self.normalize_email(email)
        usuario = self.model(cpf_cnpj=cpf_cnpj, email=email_normalizado, nome=nome)
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, cpf_cnpj, email, nome, password):
        usuario = self.create_user(cpf_cnpj, email, nome, password)
        usuario.is_superuser = True
        usuario.is_staff = True
        usuario.save(using=self._db)


class Usuario(AbstractBaseUser):
    USERNAME_FIELD = 'cpf_cnpj'
    REQUIRED_FIELDS = ['nome', 'email']

    cpf_cnpj = models.CharField(
        max_length=14,
        unique=True,
        error_messages={'unique': 'Um usuário com esse cpf/cnpj já foi cadastrado.'},
        verbose_name='CPF/CNPJ'
    )

    email = models.EmailField(
        unique=True,
        error_messages={'unique': 'Um usuário com esse e-mail já foi cadastrado.'},
        verbose_name='E-mail'
    )
    nome = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True, verbose_name='Ativo')
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    def __str__(self):
        return f'{self.nome} ({self.cpf_cnpj})'

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'