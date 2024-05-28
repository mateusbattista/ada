@extends('layouts.main-interno')

@section('title', 'Registro de Usuários ')

@section('line-header')
    @include('ada.line-header')
@endsection

@section('nav-bar')
    @include('ada.nav-bar')
@endsection

@section('content')
    <div class="row">
        <div class="col-md">
            <div class="br-card ">
                <div class="card-header">
                    <div class="d-flex"><span class="br-avatar mt-1"/>
                        <div class="ml-6">
                            <div class="text-weight-semi-bold text-up-02">Adicionar Usuário</div>
                        </div>
                    </div>
                </div>
                <div class="card-content ml-6 mr-6">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3">
                                <div class="br-input">
                                    <label for="cpf">CPF</label>
                                    <input type="text" id="cpf" class="cpf" name="cpf" placeholder="CPF" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3">
                                <div class="br-input">
                                    <label for="name">Nome</label>
                                    <input type="text" name="name" placeholder="Nome completo" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3">
                                <div class="br-input">
                                    <label for="email">E-mail</label>
                                    <input type="email" name="email" placeholder="E-mail" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3">
                                <div class="br-input">
                                    <label for="senha">Senha</label>
                                    <input type="password" name="password" placeholder="Senha" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3">
                                <div class="br-input">
                                    <label for="password_confirmation">Confirmar Senha</label>
                                    <input type="password" name="password_confirmation" placeholder="Senha" required>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer">
                            <button type="submit" class="br-button primary mr-3"><i class="fas fa-save"
                                                                                    style="padding-right: 20px;"></i>
                                Salvar
                            </button>
                            <a href="{{Route('register')}}" class="br-button">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
{{--    <form method="POST" action="{{ route('register') }}">--}}
{{--        @csrf--}}

{{--        <!-- Name -->--}}
{{--        <div>--}}
{{--            <x-input-label for="name" :value="__('Name')" />--}}
{{--            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />--}}
{{--            <x-input-error :messages="$errors->get('name')" class="mt-2" />--}}
{{--        </div>--}}

{{--        <!-- Email Address -->--}}
{{--        <div class="mt-4">--}}
{{--            <x-input-label for="email" :value="__('Email')" />--}}
{{--            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />--}}
{{--            <x-input-error :messages="$errors->get('email')" class="mt-2" />--}}
{{--        </div>--}}

{{--        <!-- Password -->--}}
{{--        <div class="mt-4">--}}
{{--            <x-input-label for="password" :value="__('Password')" />--}}

{{--            <x-text-input id="password" class="block mt-1 w-full"--}}
{{--                            type="password"--}}
{{--                            name="password"--}}
{{--                            required autocomplete="new-password" />--}}

{{--            <x-input-error :messages="$errors->get('password')" class="mt-2" />--}}
{{--        </div>--}}

{{--        <!-- Confirm Password -->--}}
{{--        <div class="mt-4">--}}
{{--            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />--}}

{{--            <x-text-input id="password_confirmation" class="block mt-1 w-full"--}}
{{--                            type="password"--}}
{{--                            name="password_confirmation" required autocomplete="new-password" />--}}

{{--            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />--}}
{{--        </div>--}}

{{--        <div class="flex items-center justify-end mt-4">--}}
{{--            <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('login') }}">--}}
{{--                {{ __('Already registered?') }}--}}
{{--            </a>--}}

{{--            <x-primary-button class="ms-4">--}}
{{--                {{ __('Register') }}--}}
{{--            </x-primary-button>--}}
{{--        </div>--}}
{{--    </form>--}}
@endsection

@section('script')
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
@endsection
