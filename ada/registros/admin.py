from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import TermoAdesaoADA
from .models import MetaADA
from .models import TipoPublicoADA
from .models import TipoEventoADA
from .models import TipoPortariaADA

admin.site.register(TermoAdesaoADA)
admin.site.register(MetaADA)
admin.site.register(TipoPublicoADA)
admin.site.register(TipoEventoADA)
admin.site.register(TipoPortariaADA)