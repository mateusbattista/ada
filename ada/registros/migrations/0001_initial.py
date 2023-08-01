# Generated by Django 4.1.7 on 2023-07-31 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MetaADA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomemeta', models.CharField(max_length=50)),
                ('quantidade', models.BigIntegerField()),
            ],
            options={
                'db_table': 'meta_ada',
            },
        ),
        migrations.CreateModel(
            name='TermoAdesaoADA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.CharField(max_length=100, null=True)),
                ('ano', models.IntegerField(null=True)),
                ('processosei', models.CharField(max_length=100, null=True)),
                ('system_unit_id', models.IntegerField(null=True)),
                ('tipo', models.CharField(max_length=50, null=True)),
                ('municipio_id', models.BigIntegerField(null=True)),
                ('nomeprefeito', models.CharField(max_length=100, null=True)),
                ('telefoneprefeito', models.CharField(max_length=50, null=True)),
                ('cpfprefeito', models.CharField(max_length=20, null=True)),
                ('rgprefeito', models.CharField(max_length=50, null=True)),
                ('orgaorgprefeito', models.CharField(max_length=50, null=True)),
                ('ufrgprefeito', models.CharField(max_length=2, null=True)),
                ('cnpjprefeitura', models.CharField(max_length=20, null=True)),
                ('situacao', models.CharField(default='SOLICITADO', max_length=60, null=True)),
                ('arquivotermoadesao', models.CharField(max_length=50, null=True)),
                ('datasolicitacao', models.DateTimeField(auto_now_add=True, null=True)),
                ('datatermo', models.DateTimeField(null=True)),
                ('nomemunicipio', models.CharField(max_length=100, null=True)),
                ('ibge', models.CharField(max_length=20, null=True)),
                ('observacao', models.CharField(max_length=500, null=True)),
                ('cepprefeitura', models.CharField(max_length=10, null=True)),
                ('enderecoprefeitura', models.CharField(max_length=100, null=True)),
                ('bairroprefeitura', models.CharField(max_length=100, null=True)),
                ('numeroprefeitura', models.CharField(max_length=100, null=True)),
                ('complementoprefeitura', models.CharField(max_length=100, null=True)),
                ('emailprefeitura', models.CharField(max_length=150, null=True)),
                ('emailprefeito', models.CharField(max_length=150, null=True)),
                ('data_publicacao_dou', models.DateField(null=True)),
                ('link_publicacao_dou', models.CharField(max_length=200, null=True)),
                ('arquivoextrato', models.CharField(max_length=100, null=True)),
                ('municipioprefeitura', models.CharField(max_length=100, null=True)),
                ('quantidadecestas', models.BigIntegerField(null=True)),
                ('name', models.CharField(max_length=100, null=True)),
                ('login', models.CharField(max_length=100, null=True)),
                ('password', models.CharField(max_length=100, null=True)),
                ('emailsolicitante', models.CharField(max_length=100, null=True)),
                ('cpfsolicitante', models.CharField(max_length=20, null=True)),
                ('telefone1solicitante', models.CharField(max_length=20, null=True)),
                ('cepsolicitante', models.CharField(max_length=10, null=True)),
                ('enderecosolicitante', models.CharField(max_length=100, null=True)),
                ('bairrosolicitante', models.CharField(max_length=100, null=True)),
                ('municipiosolicitante_id', models.BigIntegerField(null=True)),
                ('funcao_gestor', models.CharField(max_length=100, null=True)),
                ('municipiounidade_id', models.BigIntegerField(null=True)),
                ('numerosolicitante', models.CharField(max_length=20, null=True)),
                ('complementosolicitante', models.CharField(max_length=50, null=True)),
                ('nomelocalarmazenamento', models.CharField(max_length=100, null=True)),
                ('bairroarmazenamento', models.CharField(max_length=100, null=True)),
                ('numeroarmazenamento', models.CharField(max_length=100, null=True)),
                ('complementoarmazenamento', models.CharField(max_length=100, null=True)),
                ('ceparmazenamento', models.CharField(max_length=10, null=True)),
                ('nomemunicipioarmazenamento', models.CharField(max_length=100, null=True)),
                ('municipioarmazenamento_id', models.BigIntegerField(null=True)),
                ('nomelocalcontrolesocial', models.CharField(max_length=100, null=True)),
                ('bairrocontrolesocial', models.CharField(max_length=100, null=True)),
                ('numerocontrolesocial', models.CharField(max_length=100, null=True)),
                ('complementocontrolesocial', models.CharField(max_length=100, null=True)),
                ('cepcontrolesocial', models.CharField(max_length=10, null=True)),
                ('nomemunicipiocontrolesocial', models.CharField(max_length=100, null=True)),
                ('municipiocontrolesocial_id', models.BigIntegerField(null=True)),
                ('telefone1controlesocial', models.CharField(max_length=20, null=True)),
                ('telefone2controlesocial', models.CharField(max_length=20, null=True)),
                ('emailcontrolesocial', models.CharField(max_length=150, null=True)),
                ('dirigentecontrolesocial', models.CharField(max_length=150, null=True)),
                ('enderecoarmazenamento', models.CharField(max_length=100, null=True)),
                ('enderecocontrolesocial', models.CharField(max_length=100, null=True)),
                ('funcao', models.CharField(max_length=100, null=True)),
            ],
            options={
                'db_table': 'termoadesao_ada',
            },
        ),
        migrations.CreateModel(
            name='TipoEventoADA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nometipoevento', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'tipoevento_ada',
            },
        ),
        migrations.CreateModel(
            name='TipoPortariaADA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nometipoportaria', models.CharField(max_length=50, null=True)),
            ],
            options={
                'db_table': 'tipoportaria_ada',
            },
        ),
        migrations.CreateModel(
            name='TipoPublicoADA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nometipopublico', models.CharField(max_length=50, null=True)),
            ],
            options={
                'db_table': 'tipopublico_ada',
            },
        ),
    ]