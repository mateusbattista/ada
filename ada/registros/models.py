import os

from django.db import models
from comum.validators import valida_cpf, valida_cnpj
from comum.models import Estado, Municipio
from smart_selects.db_fields import ChainedForeignKey





class TipoPublicoADA(models.Model):
    nometipopublico = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.nometipopublico
    class Meta:
        db_table = 'tipopublico_ada'


class TipoEventoADA(models.Model):
    nometipoevento = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.nometipoevento
    class Meta:
        db_table = 'tipoevento_ada'



class TipoPortariaADA(models.Model):
    nometipoportaria = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.nometipoportaria
    class Meta:
        db_table = 'tipoportaria_ada'


class MetaADA(models.Model):
    nomemeta = models.CharField(max_length=50, null=False)
    quantidade = models.BigIntegerField(null=False)
    publico_id = models.ForeignKey(TipoPublicoADA, on_delete=models.CASCADE, null=True,  blank=True)


    class Meta:
        db_table = 'meta_ada'


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
    numero = models.CharField(verbose_name="Número", max_length=100, null=True, blank=True)
    ano = models.IntegerField(verbose_name="ANO", null=True, blank=True)
    processosei = models.CharField(verbose_name="PROCESSO SEI", max_length=100, null=True, blank=True)
    system_unit_id = models.IntegerField(null=True, blank=True)
    tipo = models.CharField(verbose_name="TIPO", max_length=50, null=True, blank=True)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE, null=True, blank=True)
    municipio = ChainedForeignKey(Municipio,
                                  on_delete=models.CASCADE,
                                  chained_field='estado',
                                  chained_model_field='estado',
                                  show_all=False,
                                  auto_choose=False,
                                  null=True,
                                  blank=True
                                  )
    nomeprefeito = models.CharField(verbose_name="NOME DO PREFEITO", max_length=100, null=True, blank=True)
    telefoneprefeito = models.CharField(verbose_name="TELEFONE DO PREFEITO", max_length=50, null=True, blank=True)
    cpfprefeito = models.CharField(verbose_name="CPF DO PREFEITO", max_length=20, null=True, blank=True)
    rgprefeito = models.CharField(verbose_name="RG DO PREFEITO",  max_length=50, null=True, blank=True)
    orgaorgprefeito = models.CharField(verbose_name="ORGÃO DO RG", max_length=50, null=True, blank=True)
    ufrgprefeito = models.CharField(verbose_name="UF", max_length=2, null=True, blank=True)
    cnpjprefeitura = models.CharField(verbose_name="CNPJ", max_length=20, null=True, blank=True, validators=[valida_cnpj])
    situacao = models.CharField(verbose_name="SITUAÇÃO", max_length=60, null=True, default='SOLICITADO', choices=SITUACAO_TERMO_CHOICE,blank=True)
    datasolicitacao = models.DateTimeField(verbose_name="DATA DA SOLICITAÇÃO", auto_now_add=True, null=True, blank=True)
    datatermo = models.DateTimeField(verbose_name="DATA DA SOLICITAÇÃO", null=True, blank=True)
    nome = models.CharField(verbose_name="NOME", max_length=100, null=True, blank=True)
    ibge = models.CharField(verbose_name="IBGE", max_length=20, null=True, blank=True)
    observacao = models.TextField()
    cepprefeitura = models.CharField(verbose_name="CEP DA PREFEITURA", max_length=10, null=True, blank=True)
    enderecoprefeitura = models.CharField(verbose_name="ENDEREÇO DA PREFEITURA", max_length=100, null=True, blank=True)
    bairroprefeitura = models.CharField(verbose_name="BAIRRO DA PREFEITURA", max_length=100, null=True, blank=True)
    numeroprefeitura = models.CharField(verbose_name="NÚMERO DA PREFEITURA",  max_length=100, null=True, blank=True)
    complementoprefeitura = models.CharField(verbose_name="COMPLEMENTO DA PREFEITURA", max_length=100, null=True, blank=True)
    emailprefeitura = models.CharField(verbose_name="E-MAIL DA PREFEITURA", max_length=150, null=True, blank=True)
    emailprefeito = models.CharField(verbose_name="E-MAIL DO PREFEITO", max_length=150, null=True, blank=True)
    data_publicacao_dou = models.DateField(verbose_name="DATA DA PUBLICAÇÃO DOU", null=True, blank=True)
    link_publicacao_dou = models.CharField(verbose_name="LINK DA PUBLICAÇÃO DOU", max_length=200, null=True, blank=True)
    arquivoextrato = models.CharField(max_length=100, null=True, blank=True)
    municipioprefeitura = models.CharField( max_length=100, null=True, blank=True)
    quantidadecestas = models.BigIntegerField(verbose_name="QUANTIDADE DE CESTAS", null=True, blank=True)
    name = models.CharField(verbose_name="NOME DO SOLICITANTE", max_length=100, null=True, blank=True)
    emailsolicitante = models.CharField( verbose_name="E-MAIL DO SOLICITANTE", max_length=100, null=True, blank=True)
    cpfsolicitante = models.CharField(verbose_name="CPF DO SOLICITANTE", max_length=20, null=True, blank=True, validators=[valida_cpf])
    telefone1solicitante = models.CharField( verbose_name="TELEFONE 2 DO SOLICITANTE ", max_length=20, null=True, blank=True)
    cepsolicitante = models.CharField(verbose_name="TELEFONE 2 DO SOLICITANTE", max_length=10, null=True, blank=True)
    enderecosolicitante = models.CharField( verbose_name="ENDEREÇO DO SOLICITANTE", max_length=100, null=True, blank=True)
    bairrosolicitante = models.CharField( verbose_name="BAIRRO DO SOLICITANTE", max_length=100, null=True, blank=True)
    municipiosolicitante_id = models.BigIntegerField(verbose_name="MUNICÍPIO", null=True, blank=True)
    funcao_gestor = models.CharField(verbose_name="FUNÇÃO", max_length=100, null=True, blank=True)
    municipiounidade_id = models.BigIntegerField(verbose_name="MUNICÍPIO", null=True, blank=True)
    numerosolicitante = models.CharField(verbose_name="NÚMERO DO SOLICITANTE", max_length=20, null=True, blank=True)
    complementosolicitante = models.CharField(verbose_name="COMPLEMENTO SOLICITANTE", max_length=50, null=True, blank=True)
    nomelocalarmazenamento = models.CharField(verbose_name="NOME DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    bairroarmazenamento = models.CharField(verbose_name="BAIRRO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    numeroarmazenamento = models.CharField(verbose_name="NÚMERO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    complementoarmazenamento = models.CharField(verbose_name="COMPLEMENTO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    ceparmazenamento = models.CharField(verbose_name="CEP DO LOCAL DE ARMAZENAMENTO", max_length=10, null=True, blank=True)
    nomemunicipioarmazenamento = models.CharField(verbose_name="NOME DO MUNICÍPIO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    nomemunicipio = models.CharField(verbose_name="NOME DO MUNICÍPIO", max_length=100, null=True, blank=True)
    municipioarmazenamento_id = models.BigIntegerField(null=True, blank=True)
    nomelocalcontrolesocial = models.CharField(verbose_name="NOME DO LOCAL DE CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    bairrocontrolesocial = models.CharField(verbose_name="BAIRRO DO CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    numerocontrolesocial = models.CharField(verbose_name="NÚMERO DO CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    complementocontrolesocial = models.CharField(verbose_name="COMPLEMENTO DO CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    cepcontrolesocial = models.CharField(verbose_name="CEP DO CONTROLE SOCIAL", max_length=10, null=True, blank=True)
    nomemunicipiocontrolesocial = models.CharField(verbose_name="NOME DO MUNICÍPIO DO CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    municipiocontrolesocial_id = models.BigIntegerField(null=True, blank=True)
    telefone1controlesocial = models.CharField(verbose_name="TELEFONE 1", max_length=20, null=True, blank=True)
    telefone2controlesocial = models.CharField(verbose_name="TELEFONE 2", max_length=20, null=True, blank=True)
    emailcontrolesocial = models.CharField(verbose_name="E-MAIL DO CONTROLE SOCIAL", max_length=150, null=True, blank=True)
    dirigentecontrolesocial = models.CharField(verbose_name="DIRETOR DO CONTROLE SOCIAL", max_length=150, null=True, blank=True)
    enderecoarmazenamento = models.CharField(verbose_name="ENDEREÇO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    enderecocontrolesocial = models.CharField(verbose_name="ENDEREÇO DO LOCAL DO CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    funcao = models.CharField(verbose_name="FUNÇÃO", max_length=100, null=True, blank=True)
    ntermo = models.CharField(max_length=10, null=True, choices=ACEITO_TERMO, blank=True)
    arquivo = models.FileField(verbose_name="ARQUIVO", upload_to='registros', blank=True)
    publico_id = models.ForeignKey(TipoPublicoADA, on_delete=models.CASCADE, null=True,  blank=True, verbose_name="PÚBLICO")
    evento_id = models.ForeignKey(TipoEventoADA, on_delete=models.CASCADE, null=True, blank=True, verbose_name="EVENTO")
    portaria_id = models.ForeignKey(TipoPortariaADA, on_delete=models.CASCADE, null=True,  blank=True, verbose_name="PORTARIA",)


    class Meta:
        db_table = 'termoadesao_ada'


