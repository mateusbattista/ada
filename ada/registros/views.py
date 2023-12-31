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
from django.db.models import Q


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

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.view_tipoportariaada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)




class PortariaUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPortariaForms
    model = TipoPortariaADA
    template_name = 'portaria_create_update_form.html'
    success_url = '/portaria/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.change_tipoportariaada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class PortariaCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPortariaForms
    model = TipoPortariaADA
    template_name = 'portaria_create_update_form.html'
    success_url = '/portaria/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.add_tipoportariaada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


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

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.view_tipoeventoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class EventoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TipoEventoForms
    model = TipoEventoADA
    template_name = 'evento_create_update_form.html'
    success_url = '/evento/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.change_tipoeventoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class EventoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TipoEventoForms
    model = TipoEventoADA
    template_name = 'evento_create_update_form.html'
    success_url = '/evento/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.add_tipoeventoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


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

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.view_tipopublicoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class PublicoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPublicoForms
    model = TipoPublicoADA
    template_name = 'publico_create_update_form.html'
    success_url = '/publico/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.change_tipopublicoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class PublicoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TipoPublicoForms
    model = TipoPublicoADA
    template_name = 'publico_create_update_form.html'
    success_url = '/publico/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.add_tipopublicoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


def Publico_delete(request, pk):
    publico = TipoPublicoADA.objects.get(pk=pk)
    publico.delete()
    return redirect('tipo_publico')


class SolicitacaoListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
    model = SolicitacaoADA
    context_object_name = 'solicitacoes'
    template_name = 'solicitacao_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["solicitacao_filtro_form"] = SolicitacaoForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.GET.get("name")
        cpfsolicitante = self.request.GET.get("cpfsolicitante")
        nomeprefeito = self.request.GET.get("nomeprefeito")
        cpfprefeito = self.request.GET.get("cpfprefeito")
        municipio_solicitante = self.request.GET.get("municipio_solicitante")
        estado_solicitante = self.request.GET.get("estado_solicitante")
        ibge = self.request.GET.get("ibge")
        situacao = self.request.GET.get("situacao")
        ntermo = self.request.GET.get("ntermo")

        if name:
            queryset = queryset.filter(name__icontains=name)

        if cpfsolicitante:
            queryset = queryset.filter(cpfsolicitante__icontains=cpfsolicitante)

        if nomeprefeito:
            queryset = queryset.filter(nomeprefeito__icontains=nomeprefeito)

        if cpfprefeito:
            queryset = queryset.filter(cpfprefeito__icontains=cpfprefeito)

        if municipio_solicitante:
            queryset = queryset.filter(municipio_solicitante=municipio_solicitante)

        if estado_solicitante:
            queryset = queryset.filter(estado_solicitante=estado_solicitante)

        if ibge:
            queryset = queryset.filter(ibge__icontains=ibge)

        if situacao:
            queryset = queryset.filter(situacao__icontains=situacao)

        if ntermo:
            queryset = queryset.filter(ntermo__icontains=ntermo)

        return queryset

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.view_solicitacaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)

class SolicitacaoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = SolicitacaoForms
    model = SolicitacaoADA
    template_name = 'solicitacao_create_update_form.html'
    success_url = '/solicitacao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if context['solicitacaoada'].arquivo:
            substring_filtrada = context['solicitacaoada'].arquivo.url

            padrao = r'(?:[^/]*\/){3}(.*)'

            # Procurar o padrão na string usando re.search()
            correspondencia = re.search(padrao, substring_filtrada)

            # correspondencia = correspondencia.encode('utf-8')
            if correspondencia:
                substring = correspondencia.group(1)

            context['substring_filtrada'] = substring
            context['extensao'] = substring[-3:]

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.change_solicitacaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class SolicitacaoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = SolicitacaoForms
    model = SolicitacaoADA
    template_name = 'solicitacao_create_update_form.html'
    success_url = '/solicitacao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.add_solicitacaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


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
        municipio_solicitante = self.request.GET.get("municipio_solicitante")
        estado_solicitante = self.request.GET.get("estado_solicitante")
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

        if municipio_solicitante:
            queryset = queryset.filter(municipio_solicitante=municipio_solicitante)

        if estado_solicitante:
            queryset = queryset.filter(estado_solicitante=estado_solicitante)

        if ufrgprefeito:
            queryset = queryset.filter(ufrgprefeito__contains=ufrgprefeito)

        if ibge:
            queryset = queryset.filter(ibge__contains=ibge)

        if situacao:
            queryset = queryset.filter(situacao__contains=situacao)


        return queryset

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.view_termoadesaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


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

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.change_termoadesaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class TermoAdesaoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = TermoAdesaoForms
    model = TermoAdesaoADA
    template_name = 'termoadesao_create_update_form.html'
    success_url = '/termoadesao/'


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['estados'] = Estado.objects.all()
        context['municipios'] = Municipio.objects.all()

        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.add_termoadesaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


def delete_termo_adesao(request, pk):
    termo = get_object_or_404(TermoAdesaoADA, pk=pk)
    termo.arquivo.delete()
    return redirect('termoadesao_update', pk=termo.pk)

def delete_solicitacao_termo_adesao(request, pk):
    termo = get_object_or_404(SolicitacaoADA, pk=pk)
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
        municipio_solicitante = self.request.GET.get("municipio_solicitante")
        estado_solicitante = self.request.GET.get("estado_solicitante")
        situacao = self.request.GET.get("situacao")

        if numero:
            queryset = queryset.filter(numero__contains=numero)

        if ano:
            queryset = queryset.filter(ano__contains=ano)

        if nomeprefeito:
            queryset = queryset.filter(nomeprefeito__contains=nomeprefeito)

        if municipio_solicitante:
            queryset = queryset.filter(municipio_solicitante=municipio_solicitante)

        if estado_solicitante:
            queryset = queryset.filter(estado_solicitante=estado_solicitante)

        if situacao:
            queryset = queryset.filter(situacao__contains=situacao)

        return queryset

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.view_termoadesaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


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

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("registros.change_termoadesaoada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)