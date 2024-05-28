@extends('layouts.main-interno')

@section('title', 'Cadastro - Entidade Executora')

@section('line-header')
    @include('fomento.line-header')
@endsection

@section('nav-bar')
    @include('fomento.nav-bar')
@endsection

@section('content')


    @if (session('message'))
    <div class="br-message {{ session('message.class') }}" role="alert">
        <div class="icon"><i class="fas fa-check-circle fa-lg" aria-hidden="true"></i>
        </div>
        <div class="content"><span class="message-title">{{ session('message.title') }}</span><span class="message-body"> {{ session('message.body') }} </span></div>
        <div class="close">
            <button class="br-button circle small" type="button" aria-label="Fechar"><i class="fas fa-times" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    @endif
    <div class="br-card" style="margin-top:20px;">
        <div class="card-content">

            <div class="card-header mb-2">
                <p class="card-title d-sm-inline-block" style="color:#1351b4;">LISTAGEM DE PLANOS OPERACIONAIS</p>
                <hr style="margin-top:-10px;">
            </div>

            <div class="container" style="margin-top:30px;">
                <form action="{{ route('PlanoOperacionalList') }}" method="get" id='search'>
                    @csrf

                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-estado">Entidade Executora:</label>
                                    <input id="select-estado" type="text" name="entidade_executora"
                                        placeholder="Selecione a Entidade" />
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1"
                                        data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0" style="z-index: 9999">
                                    @foreach ($slc_entidadesExecutoras as $executora)
                                        <div class="br-item" tabindex="-1">
                                            <div class="br-radio">
                                                <input id="rb{{ $executora->id }}" type="radio" name="entidade_executora"
                                                    value="{{ $executora->id }}" />
                                                <label for="rb{{ $executora->id }}">{{ $executora->nome_fantasia }}</label>
                                            </div>
                                        </div>
                                    @endforeach
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
                    <a class="br-button mr-3 secondary " href="" type="button"> <i class="fas fa-list"></i> Exportar
                    </a>
                    <a class="br-button mr-3 primary" href="{{ route('PlanoOperacionalForm') }}" type="button"> <i
                            class="fas fa-plus"></i> Cadastrar Plano
                    </a>
                </div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="table-head"></th>
                    <th class="table-head" style="font-weight:bold;">Entidade</th>
                    <th class="table-head" style="font-weight:bold;">Tipo Unidade</th>
                    <th class="table-head" style="font-weight:bold;">Tipo Parceria</th>
                    <th class="table-head" style="font-weight:bold;">Nº Instrumento</th>
                    <th class="table-head" style="font-weight:bold;">Nº SEI</th>
                    <th class="table-head" style="text-align: center !important; font-weight:bold;">Estado</th>
                </tr>
            </thead>
            <tbody>
                @if ($slc_planosOperacionais)
                    @foreach ($slc_planosOperacionais as $pa)
                        <tr>
                            <td data-th="Ações">
                                <a href="{{ route('PlanoOperacionalView',  $pa->id) }}" class="br-button circle"><i class="fas fa-eye" aria-hidden="true"></i></a>                                
                            </td>

                            @foreach ($slc_entidadesExecutoras->where('id', $pa->entidade_id) as $executora)
                                <td data-th="CNPJ">{{ $executora->nome_fantasia }}</td>
                            @endforeach

                            <td data-th="CNPJ">{{ $pa->tipo_unidade }}</td>
                            <td data-th="estado">{{ $pa->tipo_parceria }}</td>
                            <td data-th="Nome Fantasia">{{ $pa->n_instrumento_parceria }}</td>
                            <td data-th="Razão Social">{{ $pa->n_processo_sei }}</td>
                            <td data-th="Razão Social">{{ $pa->estado_entidade }}</td>
                    @endforeach
                @endif
            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
@endsection
