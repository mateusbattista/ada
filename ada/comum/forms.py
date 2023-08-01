'''from django import forms
from .models import Comunidade, AtividadesEconomicas, Qualificacao

class ComunidadesFiltroForm(forms.ModelForm):
    class Meta:
        model = Comunidade
        fields = (
            'estado',
            'municipio',
            'comunidade',
            'qualificacao'
        )
class ComunidadesForm(forms.ModelForm):
    class Meta:
        model = Comunidade
        fields = '__all__'


class AtividadesEconomicasForm(forms.ModelForm):
    class Meta:
        model = AtividadesEconomicas
        fields = '__all__'

class QualificacaoForm(forms.ModelForm):
    class Meta:
        model = Qualificacao
        fields = '__all__'


'''




