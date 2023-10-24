import os

from django.db import models
from comum.validators import valida_cpf, valida_cnpj
from comum.models import Estado, Municipio
from smart_selects.db_fields import ChainedForeignKey





class FornecedorADA(models.Model):

    SITUACAO = [
        ("ATIVO", "ATIVO"),
        ("INATIVO", "INATIVO" ),
    ]
    cnpjinstituicao = models.CharField(verbose_name="CNPJ", max_length=20, null=True, blank=True, validators=[valida_cnpj])
    razaosocial = models.CharField(verbose_name="RAZAO SOCIAL", max_length=150, null=True, blank=True)
    tipo = models.CharField(verbose_name="TIPO", max_length=50, null=True, blank=True)
    nomefantasia = models.CharField(verbose_name="NOME FANTASIA", max_length=100, null=True, blank=True)
    sigla = models.CharField(verbose_name="SIGLA", max_length=100, null=True, blank=True)
    inscricaoestadual = models.CharField(verbose_name="NUMERO DA INSCRICAO ESTADUAL", max_length=100, null=True, blank=True)
    dataconst = models.DateTimeField(verbose_name="DATA DA CONSTITUICAO", null=True, blank=True)
    ufinstituicao = models.CharField(verbose_name="UF", max_length=2, null=True, blank=True)
    enderecoinstituicao = models.CharField(verbose_name="ENDEREÇO DA INSTITUICAO", max_length=100, null=True, blank=True)
    cepinstituicao = models.CharField(verbose_name="CEP DA INSTITUICAO", max_length=10, null=True, blank=True)
    telefoneinstituicao = models.CharField(verbose_name="TELEFONE DA INSTITUICAO", max_length=50, null=True, blank=True)
    faxinstituicao = models.CharField(verbose_name="TELEFONE DA INSTITUICAO", max_length=50, null=True, blank=True)
    emailinstituicao = models.CharField(verbose_name="E-MAIL DA INSTITUICAO", max_length=150, null=True, blank=True)
    siteinstituicao = models.CharField(verbose_name="SITE DA INSTITUICAO", max_length=150, null=True, blank=True)
    cargoresponsavel = models.CharField(verbose_name="CARGO DO RESPONSAVEL", max_length=100, null=True, blank=True)
    nomeresponsavel = models.CharField(verbose_name="SITE DO RESPONSAVEL", max_length=100, null=True, blank=True)
    emailresponsavel = models.CharField(verbose_name="E-MAIL DO RESPONSAVEL", max_length=150, null=True, blank=True)
    telefoneresponsavel = models.CharField(verbose_name="TELEFONE DO RESPONSAVEL", max_length=50, null=True, blank=True)
    situacaofornecedor = models.CharField(verbose_name="SITUAÇÃO", max_length=60, null=True, default='ATIVO', choices=SITUACAO,blank=True)
    arquivonome = models.CharField(max_length=100, null=True, blank=True)
    dataavaliacao = models.DateTimeField(verbose_name="DATA DA AVALIAÇÃO", auto_now_add=True, null=True, blank=True)
    nomeavaliador = models.CharField(verbose_name="NOME DO AVALIADOR", max_length=100, null=True, blank=True)
    notatecnica = models.FileField(verbose_name="NOTA TECNICA", upload_to='notatecnica_fornecedores', blank=True)
    justificativa = models.TextField(blank=True)




    class Meta:
        db_table = 'fornecedor_ada'


class ArquivoFornecedores(models.Model):
    fornecedor = models.ForeignKey(FornecedorADA, on_delete=models.CASCADE, related_name="fornecedor")
    arquivo = models.FileField(upload_to='documentos_fornecedores', blank=True)

    def filename(self):
        return os.path.basename(self.arquivo.name)

    def get_model_fields(model):
        return model._meta.fields




class SolicitacaoCestaADA(models.Model):
    municipioentefederativo= models.CharField(verbose_name="MUNICIPIO ENTE FEDERATIVO", max_length=100, null=True, blank=True)
    ibge = models.CharField(verbose_name="IBGE ENTE FEDERATIVO", max_length=20, null=True, blank=True)
    cnpjentefederativo = models.CharField(verbose_name="CNPJ ENTEFEDERATIVO", max_length=20, null=True, blank=True, validators=[valida_cnpj])
    cepentefederativo = models.CharField(verbose_name="CEP DO ENTE FEDERATIVO", max_length=10, null=True, blank=True)
    enderecoentefederativo = models.CharField( verbose_name="ENDEREÇO DO ENTE FEDERATIVO", max_length=100, null=True, blank=True)
    numeroentefederativo = models.CharField(verbose_name="NÚMERO DO ENTE FEDERATIVO", max_length=100, null=True, blank=True)
    uf = models.CharField(verbose_name="UF ENTE FEDERATIVO", max_length=100, null=True, blank=True)
    nomeprefeito = models.CharField(verbose_name="NOME DO PREFEITO", max_length=100, null=True, blank=True)
    telefone1entefederativo = models.CharField(verbose_name="TELEFONE 1 RESPONSAVEL", max_length=20, null=True, blank=True)
    telefone2entefederativo = models.CharField(verbose_name="TELEFONE 2", max_length=20, null=True, blank=True)
    emailentefederativo = models.CharField(verbose_name="E-MAIL DO ENTE FEDERATIVO", max_length=150, null=True, blank=True)
    nomeresponsavel = models.CharField(verbose_name="NOME DO RESPONSAVEL", max_length=100, null=True, blank=True)
    rgresponsavel = models.CharField(verbose_name="RG DO RESPONSAVEL",  max_length=50, null=True, blank=True)
    orgaoresponsavel = models.CharField(verbose_name="ORGÃO DO RG", max_length=50, null=True, blank=True)
    cpfresponsavel = models.CharField(verbose_name="CPF DO RESPONSAVEL", max_length=20, null=True, blank=True, validators=[valida_cpf])
    cargoresponsavel = models.CharField(verbose_name="CARGO DO RESPONSAVEL", max_length=100, null=True, blank=True)
    emailresponsavel  = models.CharField(verbose_name="E-MAIL DO RESPONSAVEL", max_length=150, null=True, blank=True)
    telefone1responsavel  = models.CharField(verbose_name="TELEFONE RESPONSAVEL", max_length=20, null=True, blank=True)
    setor = models.CharField(verbose_name="SETOR", max_length=100, null=True, blank=True)
    nomecoordenador = models.CharField(verbose_name="NOME DO COORDENADOR", max_length=100, null=True, blank=True)
    cpfcoordenador = models.CharField(verbose_name="CPF DO COORDENADOR", max_length=20, null=True, blank=True, validators=[valida_cpf])
    cargocoordenador = models.CharField(verbose_name="CARGO DO COORDENADOR", max_length=100, null=True, blank=True)
    telefone1coordenador = models.CharField(verbose_name="TELEFONE 1 COORDENADOR", max_length=20, null=True, blank=True)
    telefone2coordenador = models.CharField(verbose_name="TELEFONE 2 COORDENADOR", max_length=20, null=True, blank=True)
    quantidadecestas = models.BigIntegerField(verbose_name="QUANTIDADE DE CESTAS", null=True, blank=True)
    nomelocalarmazenamento = models.CharField(verbose_name="NOME DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    bairroarmazenamento = models.CharField(verbose_name="BAIRRO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    numeroarmazenamento = models.CharField(verbose_name="NÚMERO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    complementoarmazenamento = models.CharField(verbose_name="COMPLEMENTO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    enderecoarmazenamento = models.CharField(verbose_name="ENDERECO DO LOCAL DE ARMAZENAMENTO", max_length=100, null=True, blank=True)
    ceparmazenamento = models.CharField(verbose_name="CEP DO LOCAL DE ARMAZENAMENTO", max_length=10, null=True, blank=True)
    estado_local_armazenamento = models.ForeignKey(Estado, on_delete=models.CASCADE, null=True, blank=True,
                                                   related_name='solicitacao_cesta_local_armazenamento')
    municipio_local_armazenamento = ChainedForeignKey(
        Municipio,
        chained_field="estado_local_armazenamento",
        chained_model_field="estado",
        show_all=False,
        auto_choose=False,
        null=True,
        blank=True,
        related_name='solicitacao_cesta_municipio_local_armazenamento'
    )
    nomecontrolesocial = models.CharField(verbose_name="NOME DA ENTIDADE", max_length=100, null=True, blank=True)
    enderecocontrolesocial = models.CharField(verbose_name="ENDERECO DO CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    complementocontrolesocial = models.CharField(verbose_name="COMPLEMENTO DO LOCAL DO CONTROLE SOCIAL", max_length=100, null=True, blank=True)
    cepcontrolesocial = models.CharField(verbose_name="CEP CONTROLE SOCIAL", max_length=10, null=True, blank=True)
    estado_controlesocial = models.ForeignKey(Estado, on_delete=models.CASCADE, null=True, blank=True,
                                                   related_name='solicitacao_cesta_controle_social')
    municipio_controlesocial = ChainedForeignKey(
        Municipio,
        chained_field="estado_controle_social",
        chained_model_field="estado",
        show_all=False,
        auto_choose=False,
        null=True,
        blank=True,
        related_name='solicitacao_cesta_municipio_controle_social'
    )
    telefone1controlesocial = models.CharField(verbose_name="TELEFONE 1 CONTROLE SOCIAL", max_length=20, null=True, blank=True)
    telefone2controlesocial = models.CharField(verbose_name="TELEFONE 2 CONTROLE SOCIAL", max_length=20, null=True, blank=True)
    emailcontrolesocial  = models.CharField(verbose_name="E-MAIL DO CONTROLE SOCIAL", max_length=150, null=True, blank=True)
    nomerepresentante = models.CharField(verbose_name="NOME DO REPRESENTANTE", max_length=100, null=True, blank=True)
    cargorepresentante = models.CharField(verbose_name="CARGO DO REPRESENTANTE", max_length=100, null=True, blank=True)


    class Meta:
        db_table = 'solicitacao_cestas_ada'

class ArquivosCestas(models.Model):
    solicitacaocestas = models.ForeignKey(SolicitacaoCestaADA, on_delete=models.CASCADE, related_name="solicitacaocestas")
    arquivo = models.FileField(upload_to='documentos_fornecedores', blank=True)
    tipo = models.CharField(verbose_name="TIPO DO ARQUIVO", max_length=100, null=True, blank=True)

    def filename(self):
        return os.path.basename(self.arquivo.name)

    def get_model_fields(model):
        return model._meta.fields
