from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect



class IndexView(TemplateView):
    template_name = 'index.html'


class IndexInternoView(LoginRequiredMixin, TemplateView):
    template_name = 'base-interno.html'
'''
from comum.forms import ComunidadesForm, AtividadesEconomicasForm, QualificacaoForm, ComunidadesFiltroForm
from comum.models import Comunidade, AtividadesEconomicas, Qualificacao, Estado, Municipio
'''

# Create your views here.



'''
class AtividadesEconomicaCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    model = AtividadesEconomicas
    form_class = AtividadesEconomicasForm
    template_name = 'atividadeseconomicas_create_form.html'
    success_url = '/atividadeseconomicas/'

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.GET:
            atividades_economicas_filtro = self.request.GET["descricao"]
            queryset = queryset.filter(descricao__icontains=atividades_economicas_filtro)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['atividadeseconomicas'] = self.get_queryset()
        return context


class AtividadesEconomicasUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    model = AtividadesEconomicas
    form_class = AtividadesEconomicasForm
    template_name = 'atividadeseconomicas_create_form.html'
    success_url = '/atividadeseconomicas/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['atividadeeconomica'] = context.pop('atividadeseconomicas')
        return context


def atividades_economicas_delete(request, pk):
    atividades_economicas = AtividadesEconomicas.objects.get(pk=pk)
    atividades_economicas.delete()
    return redirect('atividades_add')









 QualificacaoCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    model = Qualificacao
    form_class = QualificacaoForm
    template_name = 'qualificacao_create_form.html'
    success_url = '/qualificacao/'

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.GET:
            qualificacoes_filtro = self.request.GET["descricao"]
            queryset = queryset.filter(descricao__icontains=qualificacoes_filtro)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['qualificacoes'] = self.get_queryset()
        return context


class QualificacaoUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/authenticate/login/'
    model = Qualificacao
    form_class = QualificacaoForm
    template_name = 'qualificacao_create_form.html'
    success_url = '/qualificacao/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['qualificacao'] = context.pop('qualificacao')
        return context


class QualificacaoDeleteView(LoginRequiredMixin, DeleteView):
    login_url = '/autenticacao/login/'
    model = Qualificacao
    form_class = QualificacaoForm
    template_name = 'qualificacao_create_form.html'
    success_url = '/qualificacao/'


def qualificacao_delete(request, pk):
    qualificacao = Qualificacao.objects.get(pk=pk)
    qualificacao.delete()
    return redirect('qualificacao_add')
'''