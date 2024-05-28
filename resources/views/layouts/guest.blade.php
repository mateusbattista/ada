<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

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

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans text-gray-900 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <a href="/">
                    <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
                </a>
            </div>

            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {{ $slot }}
            </div>
        </div>

        <script src="{{ asset('node_modules/@govbr-ds/core/dist/core-init.js') }}"></script>
        <script type="module" src="{{ asset('node_modules/@govbr-ds/core/dist/core.min.js') }}"></script>
        <script src="{{ asset('js/selectMunicipios.js') }}"></script>
    </body>
</html>
