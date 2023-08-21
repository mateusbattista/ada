import re

from django.db import transaction
from django.shortcuts import render
from django.http import HttpResponse
from django.template.context_processors import request
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from registros.models import *
from registros.forms import *
from pprint import pprint


# Create your views here.
class PortariaListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
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


class PortariaUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPortariaForms
    model = TipoPortariaADA
    template_name = 'portaria_create_update_form.html'
    success_url = '/portaria/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class PortariaCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPortariaForms
    model = TipoPortariaADA
    template_name = 'portaria_create_update_form.html'
    success_url = '/portaria/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


def Portaria_delete(request, pk):
    portaria = TipoPortariaADA.objects.get(pk=pk)
    portaria.delete()
    return redirect('tipo_portaria')


class EventoListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
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


class EventoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TipoEventoForms
    model = TipoEventoADA
    template_name = 'evento_create_update_form.html'
    success_url = '/evento/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class EventoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TipoEventoForms
    model = TipoEventoADA
    template_name = 'evento_create_update_form.html'
    success_url = '/evento/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


def Evento_delete(request, pk):
    evento = TipoEventoADA.objects.get(pk=pk)
    evento.delete()
    return redirect('tipo_evento')


class PublicoListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
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


class PublicoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPublicoForms
    model = TipoPublicoADA
    template_name = 'publico_create_update_form.html'
    success_url = '/publico/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class PublicoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPublicoForms
    model = TipoPublicoADA
    template_name = 'publico_create_update_form.html'
    success_url = '/publico/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


def Publico_delete(request, pk):
    publico = TipoPublicoADA.objects.get(pk=pk)
    publico.delete()
    return redirect('tipo_publico')


class SolicitacaoListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
    model = TermoAdesaoADA
    context_object_name = 'solicitacoes'
    template_name = 'solicitacao_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["solicitacao_filtro_form"] = SolicitacaoForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        numero = self.request.GET.get("numero")
        ano = self.request.GET.get("ano")
        nomeprefeito = self.request.GET.get("nomeprefeito")
        cpfprefeito = self.request.GET.get("cpfprefeito")
        municipioprefeitura = self.request.GET.get("municipioprefeitura")
        ufrgprefeito = self.request.GET.get("ufrgprefeito")
        ibge = self.request.GET.get("ibge")
        situacao = self.request.GET.get("situacao")

        if numero:
            queryset = queryset.filter(numero__contains=numero)

        if ano:
            queryset = queryset.filter(ano__contains=ano)

        if nomeprefeito:
            queryset = queryset.filter(nomeprefeito__contains=nomeprefeito)

        if cpfprefeito:
            queryset = queryset.filter(cpfprefeito__contains=cpfprefeito)

        if municipioprefeitura:
            queryset = queryset.filter(municipioprefeitura__contains=municipioprefeitura)

        if ufrgprefeito:
            queryset = queryset.filter(ufrgprefeito__contains=ufrgprefeito)

        if ibge:
            queryset = queryset.filter(ibge__contains=ibge)

        if situacao:
            queryset = queryset.filter(situacao__contains=situacao)

        return queryset

class SolicitacaoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = SolicitacaoForms
    model = TermoAdesaoADA
    template_name = 'solicitacao_create_update_form.html'
    success_url = '/solicitacao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if context['termoadesaoada'].arquivo:
            substring_filtrada = context['termoadesaoada'].arquivo.url

            padrao = r'(?:[^/]*\/){3}(.*)'

            # Procurar o padrão na string usando re.search()
            correspondencia = re.search(padrao, substring_filtrada)

            # correspondencia = correspondencia.encode('utf-8')
            if correspondencia:
                substring = correspondencia.group(1)

            context['substring_filtrada'] = substring
            context['extensao'] = substring[-3:]

        return context


class SolicitacaoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = SolicitacaoForms
    model = TermoAdesaoADA
    template_name = 'solicitacao_create_update_form.html'
    success_url = '/solicitacao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class TermoAdesaoListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
    model = TermoAdesaoADA
    context_object_name = 'termos'
    template_name = 'termoadesao_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["termo_adesao_filtro_form"] = TermoAdesaoForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        numero = self.request.GET.get("numero")
        ano = self.request.GET.get("ano")
        nomeprefeito = self.request.GET.get("nomeprefeito")
        cpfprefeito = self.request.GET.get("cpfprefeito")
        municipioprefeitura = self.request.GET.get("municipioprefeitura")
        ufrgprefeito = self.request.GET.get("ufrgprefeito")
        ibge = self.request.GET.get("ibge")
        situacao = self.request.GET.get("situacao")

        if numero:
            queryset = queryset.filter(numero__contains=numero)

        if ano:
            queryset = queryset.filter(ano__contains=ano)

        if nomeprefeito:
            queryset = queryset.filter(nomeprefeito__contains=nomeprefeito)

        if cpfprefeito:
            queryset = queryset.filter(cpfprefeito__contains=cpfprefeito)

        if municipioprefeitura:
            queryset = queryset.filter(municipioprefeitura__contains=municipioprefeitura)

        if ufrgprefeito:
            queryset = queryset.filter(ufrgprefeito__contains=ufrgprefeito)

        if ibge:
            queryset = queryset.filter(ibge__contains=ibge)

        if situacao:
            queryset = queryset.filter(situacao__contains=situacao)


        return queryset


class TermoAdesaoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TermoAdesaoForms
    model = TermoAdesaoADA
    template_name = 'termoadesao_create_update_form.html'
    success_url = '/termoadesao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if context['termoadesaoada'].arquivo:
            substring_filtrada = context['termoadesaoada'].arquivo.url

            padrao = r'(?:[^/]*\/){3}(.*)'

            # Procurar o padrão na string usando re.search()
            correspondencia = re.search(padrao, substring_filtrada)

            # correspondencia = correspondencia.encode('utf-8')

            if correspondencia:
                substring = correspondencia.group(1)

            context['substring_filtrada'] = substring
            context['extensao'] = substring[-3:]

        return context


class TermoAdesaoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TermoAdesaoForms
    model = TermoAdesaoADA
    template_name = 'termoadesao_create_update_form.html'
    success_url = '/termoadesao/'


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


def delete_termo_adesao(request, pk):
    termo = get_object_or_404(TermoAdesaoADA, pk=pk)
    termo.arquivo.delete()
    return redirect('termoadesao_update', pk=termo.pk)

def delete_solicitacao_termo_adesao(request, pk):
    termo = get_object_or_404(TermoAdesaoADA, pk=pk)
    termo.arquivo.delete()
    return redirect('solicitacao_update', pk=termo.pk)


class TermoAdesaoLocalListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
    model = TermoAdesaoADA
    context_object_name = 'termos'
    template_name = 'termoadesao_local_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["termo_adesao_filtro_form"] = TermoAdesaoForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        numero = self.request.GET.get("numero")
        ano = self.request.GET.get("ano")
        nomeprefeito = self.request.GET.get("nomeprefeito")
        municipioprefeitura = self.request.GET.get("municipioprefeitura")
        situacao = self.request.GET.get("situacao")

        if numero:
            queryset = queryset.filter(numero__contains=numero)

        if ano:
            queryset = queryset.filter(ano__contains=ano)

        if nomeprefeito:
            queryset = queryset.filter(nomeprefeito__contains=nomeprefeito)

        if municipioprefeitura:
            queryset = queryset.filter(municipioprefeitura__contains=municipioprefeitura)

        if situacao:
            queryset = queryset.filter(situacao__contains=situacao)

        return queryset


class TermoAdesaoLocalUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TermoAdesaoForms
    model = TermoAdesaoADA
    template_name = 'termoadesao_local_create_update_form.html'
    success_url = '/termoadesao_local/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if context['termoadesaoada'].arquivo:
            substring_filtrada = context['termoadesaoada'].arquivo.url

            padrao = r'(?:[^/]*\/){3}(.*)'

            # Procurar o padrão na string usando re.search()
            correspondencia = re.search(padrao, substring_filtrada)

            # correspondencia = correspondencia.encode('utf-8')

            if correspondencia:
                substring = correspondencia.group(1)

            context['substring_filtrada'] = substring
            context['extensao'] = substring[-3:]

        return context