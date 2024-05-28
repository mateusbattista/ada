<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>BrasilMDS</title>
    <!-- Fonte Rawline-->
    <link rel="stylesheet"
          href="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/fonts/rawline/css/rawline.css" />
    <!-- Fonte Raleway-->
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900&amp;display=swap" />
    <!-- Design System de Governo-->
    <link rel="stylesheet" href="{{ asset('node_modules/@govbr-ds/core/dist/core.css') }}" />
    <link rel="stylesheet" href="{{ asset('node_modules/@govbr-ds/core/dist/core.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('node_modules/@govbr-ds/core/dist/core.js') }}" />
    <!-- Fontawesome-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
    <link rel="stylesheet" href="{{ asset('css/forms.css') }}" />
</head>
<body>

<header class="br-header mb-4" id="header" data-sticky="data-sticky">
    <div class="container-lg">
        <div class="header-top">
            <div class="header-logo">
                <a href="{{route('indexADA')}}">
                    <img src="{{ URL::asset('img/gov-br-logo.png') }}" alt="logo" />
                </a>
                <span class="br-divider vertical"></span>
                <div class="header-sign m-2">
                    Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome
                </div>

            </div>
            <div class="header-actions">
                <div class="header-login">
                    <div class="header-sign-in">
                        |
                        <a href="#"><i class="fas fa-chart-bar" style="font-size:18px; color:#1351b4;"></i></a>
                        <a href="#"><i class="fas fa-headphones-alt" style="font-size:18px; color:#1351b4;"></i></a>
                        <a href="#"><i class="fas fa-comment" style="font-size:18px; color:#1351b4;"></i></a>
                        <a href="#"><i class="fas fa-adjust" style="font-size:18px; color:#1351b4;"></i></a>
                    </div>
                    <div class="header-avatar"></div>
                </div>
            </div>
        </div>

    </div>
</header>

<main class="d-flex flex-fill mb-5" id="main">
    <div class="container-lg d-flex">
        <div class="row col-lg-12">
            <div class="col mb-12">
                <div class="main-content pl-sm-12 mt-12" id="main-content">
                    <div class="row" style="padding-top: 2.5em">
                        <div class="col-lg-12 mt-6" style="display: flex; justify-content: center; align-items: center">
                            <div class="authentication-wrapper authentication-basic container-p-y col-lg-4 mt-6"
                                 style="text-align: center">
                                <div class="authentication-inner">
                                    <div class="br-card">
                                        <div class="card-header">
                                            <img width="55%"
                                                 src="{{ URL::asset('img/logo-governo-federal-uniao-reconstrucao-alta-vetor-1-scaled.jpg') }}"
                                                 alt="logo"/>
                                        </div>
                                        <form id="formAuthentication" class="mb-3" method="POST">
                                            @csrf
                                            <div class="form-group row mt-3"
                                                 style="display: flex; justify-content: center">
                                                <i class="fas fa-solid fa-user"
                                                   style="display: flex; align-items: center"></i>
                                                <div class="br-input" style="width: 60%">
                                                    <input type="text" class="cpf" name="cpf" placeholder="CPF" required>
                                                </div>
                                            </div>
                                            <div class="mb-3 form-password-toggle">
                                                <div class="form-group row"
                                                     style="display: flex; justify-content: center">
                                                    <i class="fas fa-solid fa-key"
                                                       style="display: flex; align-items: center"></i>
                                                    <div class="br-input" style="width: 60%">
                                                        <input type="password" name="password" placeholder="Senha" required>
                                                    </div>
                                                </div>
                                                <button class="br-button mt-5 mb-2"
                                                        style="background-color: darkred; width: 70%; color: white"
                                                        type="submit">Entrar
                                                </button>
                                            </div>
                                            <div class="card-footer"
                                                 style="display: flex; justify-content: space-evenly">
                                                <div>
                                                    <i class="fas fa-regular fa-eraser" style="color: orangered"></i>
                                                    <a href="auth-forgot-password-basic.html">
                                                        <small>Redefinir senha</small>
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

    <script>
        $(document).ready(function() {
            $('.telefone').mask('(00) 0000-0000');
            $('.cep').mask('00000-000');
            $('.cpf').mask('000.000.000-00');
        });
    </script>
    <script>
        $("input[type=text]").keyup(function () {
            $(this).val($(this).val().toUpperCase());
        });
    </script>
</body>
</html>



{{--<x-guest-layout>--}}
{{--    <!-- Session Status -->--}}
{{--    <x-auth-session-status class="mb-4" :status="session('status')" />--}}

{{--    <form method="POST" action="{{ route('login') }}">--}}
{{--        @csrf--}}

{{--        <!-- Email Address -->--}}
{{--        <div>--}}
{{--            <x-input-label for="email" :value="__('Email')" />--}}
{{--            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />--}}
{{--            <x-input-error :messages="$errors->get('email')" class="mt-2" />--}}
{{--        </div>--}}

{{--        <!-- Password -->--}}
{{--        <div class="mt-4">--}}
{{--            <x-input-label for="password" :value="__('Password')" />--}}

{{--            <x-text-input id="password" class="block mt-1 w-full"--}}
{{--                            type="password"--}}
{{--                            name="password"--}}
{{--                            required autocomplete="current-password" />--}}

{{--            <x-input-error :messages="$errors->get('password')" class="mt-2" />--}}
{{--        </div>--}}

{{--        <!-- Remember Me -->--}}
{{--        <div class="block mt-4">--}}
{{--            <label for="remember_me" class="inline-flex items-center">--}}
{{--                <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">--}}
{{--                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>--}}
{{--            </label>--}}
{{--        </div>--}}

{{--        <div class="flex items-center justify-end mt-4">--}}
{{--            @if (Route::has('password.request'))--}}
{{--                <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('password.request') }}">--}}
{{--                    {{ __('Forgot your password?') }}--}}
{{--                </a>--}}
{{--            @endif--}}

{{--            <x-primary-button class="ms-3">--}}
{{--                {{ __('Log in') }}--}}
{{--            </x-primary-button>--}}
{{--        </div>--}}
{{--    </form>--}}
{{--</x-guest-layout>--}}
