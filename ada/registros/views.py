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


class PortariaDeleteView(DeleteView):
   # login_url = '/autenticacao/login/'
    model = TipoPortariaADA
    form_class = TipoPortariaADA
    template_name = 'portaria_list.html'
    success_url = '/portaria/'


def portaria_delete(request, pk):
    portaria = Portaria.objects.get(pk=pk)
    portaria.delete()
    return redirect('tipo_portaria')


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

class SolicitacaoListView(ListView):
    # login_url = '/authenticate/login/'
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
        nome = self.request.GET.get("name")
        cpf = self.request.GET.get("cpf")
        prefeito = self.request.GET.get("prefeito")
        cpfprefeito = self.request.GET.get("cpfprefeito")
        ibge = self.request.GET.get("ibge")
        municipio = self.request.GET.get("municipio")
        uf = self.request.GET.get("uf")
        situacao = self.request.GET.get("uf")
        aceito = self.request.GET.get("uf")

        if nome:
            queryset = queryset.filter(name__contains=nome)

        if cpf:
            queryset = queryset.filter(cpfsolicitante__contains=cpf)

        if prefeito:
            queryset = queryset.filter(nomeprefeito__contains=prefeito)

        if cpfprefeito:
            queryset = queryset.filter(cpfprefeito__contains=cpfprefeito)

        if ibge:
            queryset = queryset.filter(ibge__contains=ibge)

        if municipio:
            queryset = queryset.filter(nomemunicipio__contains=municipio)

        if uf:
            queryset = queryset.filter(ufrgprefeito__contains=uf)

        if situacao:
            queryset = queryset.filter(situacao__contains=situacao)

        if aceito:
            queryset = queryset.filter(numero__contains=aceito)




        return queryset


class SolicitacaoUpdateView(UpdateView):
    # login_url = '/authenticate/login/'
    form_class = SolicitacaoForms
    model = TermoAdesaoADA
    template_name = 'solicitacao_create_update_form.html'
    success_url = '/solicitacao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class SolicitacaoCreateView(CreateView):
    # login_url = '/authenticate/login/'
    form_class = SolicitacaoForms
    model = TermoAdesaoADA
    template_name = 'solicitacao_create_update_form.html'
    success_url = '/solicitacao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

class TermoAdesaoListView(ListView):
    # login_url = '/authenticate/login/'
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
        nome = self.request.GET.get("name")
        cpf = self.request.GET.get("cpf")
        prefeito = self.request.GET.get("prefeito")
        cpfprefeito = self.request.GET.get("cpfprefeito")
        ibge = self.request.GET.get("ibge")
        municipio = self.request.GET.get("municipio")
        uf = self.request.GET.get("uf")
        situacao = self.request.GET.get("uf")
        aceito = self.request.GET.get("uf")

        if nome:
            queryset = queryset.filter(name__contains=nome)

        if cpf:
            queryset = queryset.filter(cpfsolicitante__contains=cpf)

        if prefeito:
            queryset = queryset.filter(nomeprefeito__contains=prefeito)

        if cpfprefeito:
            queryset = queryset.filter(cpfprefeito__contains=cpfprefeito)

        if ibge:
            queryset = queryset.filter(ibge__contains=ibge)

        if municipio:
            queryset = queryset.filter(nomemunicipio__contains=municipio)

        if uf:
            queryset = queryset.filter(ufrgprefeito__contains=uf)

        if situacao:
            queryset = queryset.filter(situacao__contains=situacao)

        if aceito:
            queryset = queryset.filter(numero__contains=aceito)




        return queryset


class TermoAdesaoUpdateView(UpdateView):
    # login_url = '/authenticate/login/'
    form_class = TermoAdesaoForms
    model = TermoAdesaoADA
    template_name = 'termoadesao_create_update_form.html'
    success_url = '/termoadesao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class TermoAdesaoCreateView(CreateView):
    # login_url = '/authenticate/login/'
    form_class = TermoAdesaoForms
    model = TermoAdesaoADA
    template_name = 'termoadesao_create_update_form.html'
    success_url = '/termoadesao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


