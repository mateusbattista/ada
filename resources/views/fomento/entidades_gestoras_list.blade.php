@extends('layouts.main-interno')

@section('title', 'Cadastro - Entidade Gestora')

@section('line-header')
    @include('fomento.line-header')
@endsection

@section('nav-bar')
    @include('fomento.nav-bar')
@endsection

@section('content')

    {{-- .form --}}
    <div class="br-card" style="margin-top:20px;">
        <div class="card-content">

            <div class="card-header mb-2">
                <p class="card-title d-sm-inline-block" style="color:#1351b4;">LISTAGEM DAS ENTIDADES GESTORAS</p>
                <hr style="margin-top:-10px;">
            </div>

            <div class="container" style="margin-top:30px;">
                <form action="{{ route('EntidadesGestorasList') }}" method="get" id='search'>
                    @csrf

                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="razao_social">Razão Social</label>
                                <input id="razao_social" type="text" placeholder="Razão Social" name="razao_social" />
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="id_cnpj">CNPJ (Sem pontuação)</label>
                                <input id="id_cnpj" type="text" placeholder="CNPJ" name="cnpj" />
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-6 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-estado">Estado</label>
                                    <input id="select-estado" type="text" name="estado"
                                        placeholder="Selecione o item" />
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1"
                                        data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0">
                                    @if ($slc_estados)
                                        @foreach ($slc_estados as $estado)
                                            <div class="br-item" tabindex="-1">
                                                <div class="br-radio">
                                                    <input id="rb{{ $estado->sigla }}" type="radio" name="estado"
                                                        value="{{ $estado->sigla }}" />
                                                    <label for="rb{{ $estado->sigla }}">{{ $estado->estado }}</label>
                                                </div>
                                            </div>
                                        @endforeach
                                    @endif
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-municipio">Município</label>
                                    <input id="select-municipio" name="municipio" type="text"
                                        placeholder="Selecione o item" />
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1"
                                        data-trigger="data-trigger">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" id="municipio-list" tabindex="0">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-simple-situacao">Situação</label>
                                    <input id="select-simple-situacao" type="text" name="situacao"
                                        placeholder="Selecione o item" />
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1"
                                        data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="br-list" tabindex="0">
                                    <div class="br-item" tabindex="-1">
                                        <div class="br-radio">
                                            <input id="habilitada" type="radio" value="Habilitada" />
                                            <label for="habilitada">Habilitada</label>
                                        </div>
                                    </div>
                                    <div class="br-item" tabindex="-1">
                                        <div class="br-radio">
                                            <input id="desabilitada" type="radio" value="Desabilitada" />
                                            <label for="desabilitada">Desabilitada</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top:20px;">
                        <a href="{{ route('indexFomento') }}"><button class="br-button primary mr-3" type="button"
                                style="background-color:#f8f5f5; color:#1351b4;"><i
                                    class="far fa-arrow-alt-circle-left"></i> Voltar</button></a>
                        <button class="br-button primary active mr-3" type="submit" formmethod="get">
                            <i class="fas fa-search primary" style="padding-right: 20px;"></i>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    {{-- .tb --}}
    <div class="br-card">
        <div class="card-header mb-4">
            <div class="d-flex">
                <div class="ml-auto">
                    <a class="br-button mr-3 secondary " href="" type="button"> <i class="fas fa-list"></i>
                        Exportar
                    </a>
                    <a class="br-button mr-3 primary" href="{{ route('EntidadesGestorasForm') }}" type="button"> <i
                            class="fas fa-plus"></i> Adicionar
                    </a>
                </div>
            </div>
        </div>
        <div class="br-table">
            <div class="table-header">
            </div>
            <table>
                <thead>
                    <tr>
                        <th class="table-head"></th>
                        <th class="table-head" style="font-weight:bold;">CNPJ</th>
                        <th class="table-head" style="font-weight:bold;">Estado</th>
                        <th class="table-head" style="font-weight:bold;">Sigla</th>
                        <th class="table-head" style="font-weight:bold;">Razão Social</th>
                        <th class="table-head" style="text-align: center !important; font-weight:bold;">Situação</th>
                    </tr>
                </thead>
                <tbody>
                    @if ($slc_entidadesGestoras)
                        @foreach ($slc_entidadesGestoras as $entidades)
                            <tr>
                                <td data-th="Ações">
                                    <a href="{{ route('EntidadesGestoraView', $entidades->id) }}"
                                        class="br-button circle "><i class="fas fa-eye" aria-hidden="true"></i></a>
                                    <a href="#" class="br-button circle "><i class="fas fa-user-plus"
                                            aria-hidden="true"></i></a>
                                </td>
                                <td data-th="CNPJ">{{ $entidades->cnpj }}</td>
                                <td data-th="estado">{{ $entidades->estado_id }}</td>
                                <td data-th="Nome Fantasia">{{ $entidades->sigla }}</td>
                                <td data-th="Razão Social">{{ $entidades->nome_fantasia }}</td>

                                @if ($entidades->situacao == 'habilitada')
                                    <td class="p-0" data-th="STATUS" style="text-align:center;">
                                        <button class="br-button success small mr-3" type="button"
                                            style="width:122px;">Habilitado</button>
                                    </td>
                                @else
                                    <td class="p-0" data-th="STATUS" style="text-align:center;">
                                        <button class="br-button success small mr-3" type="button"
                                            style="width:120px;">Habilitado</button>
                                    </td>
                                @endif
                        @endforeach
                    @endif
                </tbody>
            </table>
        </div>

        <nav class="br-pagination small" aria-label="Paginação de resultados"
            data-total="{{ $slc_entidadesGestoras->lastPage() }}"
            data-current="{{ $slc_entidadesGestoras->currentPage() }}">
            <ul class="pagination">
                <li class="page-item {{ $slc_entidadesGestoras->currentPage() == 1 ? 'disabled' : '' }}">
                    <a class="br-button circle"
                        href="{{ $slc_entidadesGestoras->previousPageUrl() }}"><i class="fas fa-angle-left" aria-hidden="true"></i></a>
                </li>

                @for ($i = 1; $i <= $slc_entidadesGestoras->lastPage(); $i++)
                    <li>
                        <a class="page {{ $slc_entidadesGestoras->currentPage() == $i ? 'active' : '' }}"
                            href="{{ $slc_entidadesGestoras->url($i) }}">{{ $i }}</a>
                    </li>
                @endfor

                <li class="page-item {{ $slc_entidadesGestoras->currentPage() == $slc_entidadesGestoras->lastPage() ? 'disabled' : '' }}">
                    <a class="br-button circle"
                        href="{{ $slc_entidadesGestoras->nextPageUrl() }}"><i class="fas fa-angle-right" aria-hidden="true"></i></a>
                </li>
            </ul>
        </nav>

    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/jquery.mask.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js"></script>
    <script>
        $(document).ready(function($) {
            $("input[type=text]").keyup(function() {
                $(this).val($(this).val().toUpperCase());
            });


            $('#id_cnpj').mask('00.000.000/0000-00')

        })
    </script>
    <script>
        $(document).ready(function() {
            $('input[name="estado"]').change(function() {
                var selectedEstado = $(this).val();
                var municipioDropdown = $('.select-municipio');
                console.log(municipioDropdown)

                // Make sure the selectedEstado is not empty or undefined before making the request
                if (selectedEstado) {
                    $.ajax({
                        url: "{{ url('fomento/fetch-municipios/') }}/" + selectedEstado,
                        type: 'GET',
                        data: {
                            _token: $('meta[name="csrf-token"]').attr('content')
                        },

                        success: function(response) {
                            // Clear existing municipio options
                            $('#municipio-list').empty(); // Replace content inside the div

                            // Populate options with filtered municipios
                            $.each(response, function(index, municipio) {
                                $('<div class="br-item" tabindex="-1"><div class="br-radio"><input type="radio" name="municipio" id="rb' +
                                        municipio.ibge + '" value="' + municipio.ibge +
                                        '"/><label for="rb' + municipio.ibge + '">' +
                                        municipio.nome + ' - ' + municipio.ibge +
                                        '</label></div></div>')
                                    .appendTo('#municipio-list');
                            });
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            // Log detailed error information to the console
                            console.error("AJAX Error:", textStatus, errorThrown);

                            // Handle errors gracefully
                            alert('Failed to fetch municipios. Check the console for details.');
                        }
                    });
                }
            });
        });

        $('.br-list').on('click', '.br-item', function() {
            var selectedMunicipio = $(this).find('input[type="radio"]').val();
            var selectedMunicipioName = $(this).find('label').text();

            $('#select-municipio').prop('title', selectedMunicipioName);
           

          
        });
    </script>
@endsection
