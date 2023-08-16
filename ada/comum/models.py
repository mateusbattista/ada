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
        return f'{self.nome}/{self.estado.sigla} - [{self.ibge}]'

'''
class AtividadesEconomicas(models.Model):
    descricao = models.CharField(max_length=255)

    def __str__(self):
        return self.descricao


class Qualificacao(models.Model):
    descricao = models.CharField(max_length=40)

    def __str__(self):
        return self.descricao


class Comunidade(models.Model):
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)
    municipio = ChainedForeignKey(Municipio,
                                  on_delete=models.CASCADE,
                                  chained_field='estado',
                                  chained_model_field='estado',
                                  show_all=False,
                                  auto_choose=False,
    )
    comunidade = models.CharField(max_length=50)
    qualificacao = models.ForeignKey(Qualificacao, on_delete=models.CASCADE)
    qtd_de_familias = models.IntegerField()
    principais_atividades_economicas = models.ManyToManyField(AtividadesEconomicas)
    fonte_de_renda = models.CharField(max_length=50)
    associacao_organizacao = models.CharField(max_length=50)
    cisternas_consumo = models.BooleanField(default=False)
    agua_producao_alimentos = models.BooleanField(default=False)
    ativo = models.BooleanField(default=False)

    def __str__(self):
        return self.comunidade
'''