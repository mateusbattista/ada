
from django.contrib import admin

from .models import FornecedorADA
from .models import ArquivoFornecedores
from .models import SolicitacaoCestasADA
from .models import ArquivosCestas


admin.site.register(FornecedorADA)
admin.site.register(ArquivoFornecedores)
admin.site.register(SolicitacaoCestasADA)
admin.site.register(ArquivosCestas)
