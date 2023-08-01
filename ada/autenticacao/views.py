from django.contrib.auth.views import LogoutView, LoginView

# Create your views here.

class LoginPageView(LoginView):
    template_name = 'login.html'

class LogoutPageView(LogoutView):
    template_name = 'index.html'

