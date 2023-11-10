from django.views import View
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect


class Custom404View(View):
    def get(self, request, *args, **kwargs):
        return render(request, '404.html', {}, status=404)


class IndexView(TemplateView):
    template_name = 'index.html'



class IndexInternoView(LoginRequiredMixin, TemplateView):
    template_name = 'base-interno.html'
