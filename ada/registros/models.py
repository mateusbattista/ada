import os

from django.db import models



class TermoAdesaoADA(models.Model):
    SITUACAO_TERMO_CHOICE = [
        ("SOLICITADO", "SOLICITADO"),
        ("ACEITO (AGUARDANDO ASSINATURA SEI)", "ACEITO (AGUARDANDO ASSINATURA SEI)"),
        ("ACEITO (AGUARDANDO PUBLICACAO NO D.O.U)", "ACEITO (AGUARDANDO PUBLICACAO NO D.O.U)"),
        ("ADERIDO", "ADERIDO"),
        ("NEGADO","NEGADO"),
    ]

    ACEITO_TERMO = [
        ("SIM", "SIM"),
        ("NAO", "NAO" ),
    ]
    numero = models.CharField(max_length=100, null=True, blank=True)
    ano = models.IntegerField(null=True, blank=True)
    processosei = models.CharField(max_length=100, null=True, blank=True)
    system_unit_id = models.IntegerField(null=True, blank=True)
    tipo = models.CharField(max_length=50, null=True, blank=True)
    municipio_id = models.BigIntegerField(null=True, blank=True)
    nomeprefeito = models.CharField(max_length=100, null=True, blank=True)
    telefoneprefeito = models.CharField(max_length=50, null=True, blank=True)
    cpfprefeito = models.CharField(max_length=20, null=True, blank=True)
    rgprefeito = models.CharField(max_length=50, null=True, blank=True)
    orgaorgprefeito = models.CharField(max_length=50, null=True, blank=True)
    ufrgprefeito = models.CharField(max_length=2, null=True, blank=True)
    cnpjprefeitura = models.CharField(max_length=20, null=True, blank=True)
    situacao = models.CharField(max_length=60, null=True, default='SOLICITADO', choices=SITUACAO_TERMO_CHOICE,
                                blank=True)
    datasolicitacao = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    datatermo = models.DateTimeField(null=True, blank=True)
    nome = models.CharField(max_length=100, null=True, blank=True)
    ibge = models.CharField(max_length=20, null=True, blank=True)
    observacao = models.TextField()
    cepprefeitura = models.CharField(max_length=10, null=True, blank=True)
    enderecoprefeitura = models.CharField(max_length=100, null=True, blank=True)
    bairroprefeitura = models.CharField(max_length=100, null=True, blank=True)
    numeroprefeitura = models.CharField(max_length=100, null=True, blank=True)
    complementoprefeitura = models.CharField(max_length=100, null=True, blank=True)
    emailprefeitura = models.CharField(max_length=150, null=True, blank=True)
    emailprefeito = models.CharField(max_length=150, null=True, blank=True)
    data_publicacao_dou = models.DateField(null=True, blank=True)
    link_publicacao_dou = models.CharField(max_length=200, null=True, blank=True)
    arquivoextrato = models.CharField(max_length=100, null=True, blank=True)
    municipioprefeitura = models.CharField(max_length=100, null=True, blank=True)
    quantidadecestas = models.BigIntegerField(null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    emailsolicitante = models.CharField(max_length=100, null=True, blank=True)
    cpfsolicitante = models.CharField(max_length=20, null=True, blank=True)
    telefone1solicitante = models.CharField(max_length=20, null=True, blank=True)
    cepsolicitante = models.CharField(max_length=10, null=True, blank=True)
    enderecosolicitante = models.CharField(max_length=100, null=True, blank=True)
    bairrosolicitante = models.CharField(max_length=100, null=True, blank=True)
    municipiosolicitante_id = models.BigIntegerField(null=True, blank=True)
    funcao_gestor = models.CharField(max_length=100, null=True, blank=True)
    municipiounidade_id = models.BigIntegerField(null=True, blank=True)
    numerosolicitante = models.CharField(max_length=20, null=True, blank=True)
    complementosolicitante = models.CharField(max_length=50, null=True, blank=True)
    nomelocalarmazenamento = models.CharField(max_length=100, null=True, blank=True)
    bairroarmazenamento = models.CharField(max_length=100, null=True, blank=True)
    numeroarmazenamento = models.CharField(max_length=100, null=True, blank=True)
    complementoarmazenamento = models.CharField(max_length=100, null=True, blank=True)
    ceparmazenamento = models.CharField(max_length=10, null=True, blank=True)
    nomemunicipioarmazenamento = models.CharField(max_length=100, null=True, blank=True)
    nomemunicipio = models.CharField(max_length=100, null=True, blank=True)
    municipioarmazenamento_id = models.BigIntegerField(null=True, blank=True)
    nomelocalcontrolesocial = models.CharField(max_length=100, null=True, blank=True)
    bairrocontrolesocial = models.CharField(max_length=100, null=True, blank=True)
    numerocontrolesocial = models.CharField(max_length=100, null=True, blank=True)
    complementocontrolesocial = models.CharField(max_length=100, null=True, blank=True)
    cepcontrolesocial = models.CharField(max_length=10, null=True, blank=True)
    nomemunicipiocontrolesocial = models.CharField(max_length=100, null=True, blank=True)
    municipiocontrolesocial_id = models.BigIntegerField(null=True, blank=True)
    telefone1controlesocial = models.CharField(max_length=20, null=True, blank=True)
    telefone2controlesocial = models.CharField(max_length=20, null=True, blank=True)
    emailcontrolesocial = models.CharField(max_length=150, null=True, blank=True)
    dirigentecontrolesocial = models.CharField(max_length=150, null=True, blank=True)
    enderecoarmazenamento = models.CharField(max_length=100, null=True, blank=True)
    enderecocontrolesocial = models.CharField(max_length=100, null=True, blank=True)
    funcao = models.CharField(max_length=100, null=True, blank=True)
    ntermo = models.CharField(max_length=10, null=True, choices=ACEITO_TERMO, blank=True)
    arquivo = models.FileField(upload_to='registros', blank=True)


    class Meta:
        db_table = 'termoadesao_ada'

class MetaADA(models.Model):
    nomemeta = models.CharField(max_length=50, null=False)
    quantidade = models.BigIntegerField(null=False)

    class Meta:
        db_table = 'meta_ada'


class TipoPublicoADA(models.Model):
    nometipopublico = models.CharField(max_length=50, null=True)

    class Meta:
        db_table = 'tipopublico_ada'


class TipoEventoADA(models.Model):
    nometipoevento = models.CharField(max_length=50, null=False)

    class Meta:
        db_table = 'tipoevento_ada'


class TipoPortariaADA(models.Model):
    nometipoportaria = models.CharField(max_length=50, null=True)

    class Meta:
        db_table = 'tipoportaria_ada'
