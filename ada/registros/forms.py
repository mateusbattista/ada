from django import forms
from .models import *



class TipoPortariaForms(forms.ModelForm):
    class Meta:
        model = TipoPortariaADA
        fields = '__all__'


class TipoEventoForms(forms.ModelForm):
    class Meta:
        model = TipoEventoADA
        fields = '__all__'


class TipoPublicoForms(forms.ModelForm):
    class Meta:
        model = TipoPublicoADA
        fields = '__all__'