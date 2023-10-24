import re

from django.db import transaction
from django.shortcuts import render
from django.http import HttpResponse
from django.template.context_processors import request
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from execucao.models import *
from execucao.forms import *
from autenticacao.models import *
from pprint import pprint


class FornecedorListView(LoginRequiredMixin, ListView):
    login_url = '/autenticacao/login/'
    model = FornecedorADA
    context_object_name = 'fornecedores'
    template_name = 'fornecedor_list.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["fornecedor_filtro_form"] = FornecedorForms()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        cnpjinstituicao = self.request.GET.get("cnpjinstituicao")
        razaosocial = self.request.GET.get("razaosocial")
        tipo = self.request.GET.get("tipo")
        ufinstituicao = self.request.GET.get("ufinstituicao")
        situacaofornecedor = self.request.GET.get("situacaofornecedor")


        if cnpjinstituicao:
            queryset = queryset.filter(cnpjinstituicao__contains=cnpjinstituicao)

        if razaosocial:
            queryset = queryset.filter(razaosocial__contains=razaosocial)

        if tipo:
            queryset = queryset.filter(tipo__contains=tipo)

        if ufinstituicao:
            queryset = queryset.filter(ufinstituicao__contains=ufinstituicao)

        if situacaofornecedor:
            queryset = queryset.filter(situacaofornecedor__contains=situacaofornecedor)


        return queryset

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("execucao.view_fornecedorada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)


class FornecedorUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/autenticacao/login/'
    form_class = FornecedorForms
    model = FornecedorADA
    template_name = 'fornecedor_create_update_form.html'
    success_url = '/fornecedor/'


    def get_context_data(self, **kwargs, ):

        context = super().get_context_data(**kwargs)

        fornecedorada = self.get_object()  # Obtém o objeto FornecedorADA atual

        # Agora você precisa obter os documentos relacionados ao fornecedor
        documentos = ArquivoFornecedores.objects.filter(fornecedor=fornecedorada)

        # Adicione os documentos ao contexto
        context['documentos'] = documentos


        if context['fornecedorada'].notatecnica:
            substring_filtrada = context['fornecedorada'].notatecnica.url
            padrao = r'(?:[^/]*\/){3}(.*)'

            # Procurar o padrão na string usando re.search()
            correspondencia = re.search(padrao, substring_filtrada)

            # correspondencia = correspondencia.encode('utf-8')

            if correspondencia:
                substring = correspondencia.group(1)
                context['substring_filtrada'] = substring
                context['extensao'] = os.path.splitext(substring_filtrada)[1]


        return context

    def form_valid(self, form):
        fornecedor_ada = form.save()

        # Agora, processe os documentos enviados e crie ou atualize instâncias de ArquivoFornecedores
        documentos_enviados = self.request.FILES.getlist('documentos')  # Certifique-se de que 'documentos' seja o nome do campo do formulário

        with transaction.atomic():
            for documento_enviado in documentos_enviados:
                # Verifique se o fornecedor já possui documentos
                if fornecedor_ada.documentos.filter(arquivo=documento_enviado).exists():
                    # Atualize o documento existente, se necessário
                    documento_existente = fornecedor_ada.documentos.get(arquivo=documento_enviado)
                    # Você pode adicionar lógica de atualização aqui, se necessário

                else:
                    # Crie uma nova instância de ArquivoFornecedores
                    novo_documento = ArquivoFornecedores(fornecedor=fornecedor_ada, arquivo=documento_enviado)
                    novo_documento.save()

        return super().form_valid(form)

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("execucao.change_fornecedorada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)

class FornecedorCreateView(LoginRequiredMixin, CreateView):
    login_url = '/autenticacao/login/'
    form_class = FornecedorForms
    model = FornecedorADA
    template_name = 'fornecedor_create_update_form.html'
    success_url = '/fornecedor/'

    def form_valid(self, form):
        # Primeiro, salve o objeto FornecedorADA
        fornecedor_ada = form.save()


        # Verifique se nomeavaliador está vazio
        if not fornecedor_ada.nomeavaliador:
            # Preencha nomeavaliador com o nome do usuário atual
            fornecedor_ada.nomeavaliador = self.request.user.nome
            fornecedor_ada.save()


        # Agora, processe os documentos enviados e crie instâncias de ArquivoFornecedores
        documentos_enviados = self.request.FILES.getlist('documentos')  # Certifique-se de que 'documentos' seja o nome do campo do formulário

        if documentos_enviados:
            with transaction.atomic():
                for documento_enviado in documentos_enviados:
                    novo_documento = ArquivoFornecedores(fornecedor=fornecedor_ada, arquivo=documento_enviado)
                    novo_documento.save()

        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_perm("execucao.add_fornecedorada"):
            return render(request, "pagina_erro_permissao.html")  # Redirecionar para página de erro de permissão
        return super().dispatch(request, *args, **kwargs)



def delete_nota(request, pk):
    fornecedor = get_object_or_404(FornecedorADA, pk=pk)
    fornecedor.notatecnica.delete()
    return redirect('fornecedor_update', pk=fornecedor.pk)

def delete_documento(request, pk):
    documento = get_object_or_404(ArquivoFornecedores, pk=pk)
    fornecedor = documento.fornecedor.id
    documento.arquivo.delete()
    documento.delete()
    return redirect('fornecedor_update', pk=fornecedor)