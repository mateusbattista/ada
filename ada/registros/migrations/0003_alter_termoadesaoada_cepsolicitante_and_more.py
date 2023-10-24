# Generated by Django 4.1.7 on 2023-10-24 15:19

import comum.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registros', '0002_remove_termoadesaoada_estado_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='termoadesaoada',
            name='cepsolicitante',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='CEP DO SOLICITANTE'),
        ),
        migrations.AlterField(
            model_name='termoadesaoada',
            name='cpfprefeito',
            field=models.CharField(blank=True, max_length=20, null=True, validators=[comum.validators.valida_cpf], verbose_name='CPF DO PREFEITO'),
        ),
    ]
