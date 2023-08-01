from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from registros.models import *
from registros.forms import *




# Create your views here.
class PortariaListView(ListView):
    #login_url = '/authenticate/login/'
    model = TipoPortariaADA
    context_object_name = 'portarias'
    template_name = 'portaria_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["portaria_filtro_form"] = TipoPortariaForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        nome_tipoportaria = self.request.GET.get("nometipoportaria")

        if nome_tipoportaria:
            queryset = queryset.filter(nometipoportaria__contains=nome_tipoportaria)

        return queryset


class PortariaUpdateView(UpdateView):
    #login_url = '/authenticate/login/'
    form_class = TipoPortariaForms
    model = TipoPortariaADA
    template_name = 'portaria_create_update_form.html'
    success_url = '/portaria/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class PortariaCreateView(CreateView):
   # login_url = '/authenticate/login/'
    form_class = TipoPortariaForms
    model = TipoPortariaADA
    template_name = 'portaria_create_update_form.html'
    success_url = '/portaria/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class EventoListView(ListView):
    # login_url = '/authenticate/login/'
    model = TipoEventoADA
    context_object_name = 'eventos'
    template_name = 'evento_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["evento_filtro_form"] = TipoEventoForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        nome_tipoevento = self.request.GET.get("nometipoevento")

        if nome_tipoevento:
            queryset = queryset.filter(nometipoevento__contains=nome_tipoevento)

        return queryset


class EventoUpdateView(UpdateView):
    # login_url = '/authenticate/login/'
    form_class = TipoEventoForms
    model = TipoEventoADA
    template_name = 'evento_create_update_form.html'
    success_url = '/evento/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)


        return context


class EventoCreateView(CreateView):
    # login_url = '/authenticate/login/'
    form_class = TipoEventoForms
    model = TipoEventoADA
    template_name = 'evento_create_update_form.html'
    success_url = '/evento/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class PublicoListView(ListView):
    # login_url = '/authenticate/login/'
    model = TipoPublicoADA
    context_object_name = 'publicos'
    template_name = 'publico_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["publico_filtro_form"] = TipoPublicoForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        nome_tipopublico = self.request.GET.get("nometipopublico")

        if nome_tipopublico:
            queryset = queryset.filter(nometipopublico__contains=nome_tipopublico)

        return queryset


class PublicoUpdateView(UpdateView):
    # login_url = '/authenticate/login/'
    form_class = TipoPublicoForms
    model = TipoPublicoADA
    template_name = 'publico_create_update_form.html'
    success_url = '/publico/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class PublicoCreateView(CreateView):
    # login_url = '/authenticate/login/'
    form_class = TipoPublicoForms
    model = TipoPublicoADA
    template_name = 'publico_create_update_form.html'
    success_url = '/publico/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context