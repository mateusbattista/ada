<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Gov.Br</title>
    <link rel="icon" href="{{ asset('img/x-icon.png') }}" type="image/x-icon" />

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

    <div class="template-base">

        @yield('line-header')

        <main class="d-flex flex-fill mb-5" id="main">
            <div class="container-lg d-flex">
                <div class="row col-lg-12">

                    @yield('nav-bar')

                    {{-- .global/page --}}
                    <div class="col mb-5">
                        <div class="main-content pl-sm-3 mt-4" id="main-content" style="margin-top:-20px !important;">
                            @yield('content')

                        </div>
                    </div>

                </div>
            </div>
        </main>

        <footer class="br-footer pt-3" id="footer">
                <div class="container-lg">
                    <div class="info">
                        <div class="text-down-01 text-medium pb-3">Texto destinado a exibição de informações
                            relacionadas
                            à&nbsp;<strong><a href="">licença de uso</a>.</strong></div>
                    </div>
                </div>
        </footer>

    </div>

{{--    <div class="br-cookiebar default d-none" tabindex="-1"></div>--}}
    <script src="{{ asset('node_modules/@govbr-ds/core/dist/core-init.js') }}"></script>
    <script type="module" src="{{ asset('node_modules/@govbr-ds/core/dist/core.min.js') }}"></script>
    <script src="{{ asset('js/selectMunicipios.js') }}"></script>


    @yield('script')
</body>
</html>
