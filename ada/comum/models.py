from django.db import models
from django.contrib.auth.models import PermissionsMixin
from smart_selects.db_fields import ChainedForeignKey

# Create your models here.



class Estado(models.Model):
    estado = models.CharField(max_length=50)
    sigla = models.CharField(primary_key=True, unique=True, max_length=2)

    def __str__(self):
        return f'{self.estado}/{self.sigla}'



class Municipio(models.Model):
    SEARCH_FIELDS = ['ibge', 'nome', 'uf']

    ibge = models.CharField(unique=True, editable=True, max_length=7, primary_key=True,)
    nome = models.CharField(max_length=155)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)

    class Meta:
        ordering = ['nome']
        verbose_name = 'Município'

    def __str__(self):
        return f'{self.nome}/{self.estado.sigla} '

