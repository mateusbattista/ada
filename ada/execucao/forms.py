from django import forms
from .models import *

class FornecedorForms(forms.ModelForm):

    
    notatecnica = forms.FileField(required=False)
    class Meta:
        model = FornecedorADA
        fields = '__all__'




