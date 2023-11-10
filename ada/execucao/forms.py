from django import forms
from .models import *

class FornecedorForms(forms.ModelForm):
    notatecnica = forms.FileField(required=False)
    class Meta:
        model = FornecedorADA
        fields = '__all__'


class SolicitacaoCestasForms(forms.ModelForm):
    tipo = forms.CharField(required=False)  # Ou outro tipo de campo adequado ao seu caso
    notatecnica = forms.FileField(required=False)
    class Meta:
        model = SolicitacaoCestasADA
        fields = '__all__'





