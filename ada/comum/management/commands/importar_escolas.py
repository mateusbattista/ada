# -*- coding: utf-8 -*-
from django.db import transaction
from django.core.management.base import BaseCommand
import tqdm
import xlrd2

from comum.models import Municipio, Estado
from entidades.models import Escola


class Command(BaseCommand):
    help = 'Importação das Escolas'

    def handle(self, *args, **options):
        planilha = xlrd2.open_workbook("comum/fixtures/escola_inep.xlsx")  # arquivo de dados a ser importado
        pagina = planilha.sheet_by_index(0)

        with transaction.atomic():
            for i in tqdm.tqdm(range(1, pagina.nrows)):
                nome_escola = str(pagina.cell_value(rowx=i, colx=1))
                codigo_inep = int(float(pagina.cell_value(rowx=i, colx=2)))
                estado = str(pagina.cell_value(rowx=i, colx=3))
                nome_municipio = str(pagina.cell_value(rowx=i, colx=4))
                categoria = str(pagina.cell_value(rowx=i, colx=7))
                if (categoria == "Pública"):
                    categoria = "PU"
                else:
                    categoria = "PR"
                endereco = str(pagina.cell_value(rowx=i, colx=8))
                telefone_instituicao = str(pagina.cell_value(rowx=i, colx=9))
                etapa_ensino = str(pagina.cell_value(rowx=i, colx=15))
                latitude = str(pagina.cell_value(rowx=i, colx=17))
                longitude = str(pagina.cell_value(rowx=i, colx=18))
                try:
                    uf = Estado.objects.get(sigla=estado.upper())
                    mun = Municipio.objects.get(nome=nome_municipio.upper(), estado=uf)
                    Escola.objects.get_or_create(nome_escola=nome_escola, codigo_inep=codigo_inep, estado=uf, municipio=mun, categoria=categoria, endereco=endereco, telefone_instituicao=telefone_instituicao, etapa_ensino=etapa_ensino, latitude=latitude, longitude=longitude, )
                except Exception as e:
                    print(e)