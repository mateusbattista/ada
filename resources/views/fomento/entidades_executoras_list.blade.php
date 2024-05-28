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

    {{-- .form --}}
    <div class="br-card" style="margin-top:20px;">
        <div class="card-content">
            
            <div class="card-header mb-2">
                <p class="card-title d-sm-inline-block" style="color:#1351b4;">LISTAGEM DAS ENTIDADES EXECUTORAS</p>
                <hr style="margin-top:-10px;">
            </div>
            
            <div class="container" style="margin-top:30px;">
                <form action="{{ route('entidadesExecutorasList') }}" method="get" id='search'>
                @csrf

                <div class="form-group row">
                    <div class="col-sm-12 mb-3">
                        <div class="br-input">
                            <label for="razao_social">Razão Social</label>
                            <input id="input-default" type="text" placeholder="Razão Social" name="razao_social" />
                        </div>
                    </div>
                </div>
                    
                <div class="form-group row">
                    <div class="col-sm-12 mb-3">
                        <div class="br-input">
                            <label for="cnpj">CNPJ (Sem pontuação)</label>
                            <input id="input-default" type="text" placeholder="CNPJ" name="cnpj" />
                        </div>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-6 mb-3">
                        <div class="br-select">
                            <div class="br-input">
                                <label for="select-estado">Estado</label>
                                <input id="select-estado" type="text" name="estado" placeholder="Selecione o item" />
                                <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1"
                                    data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
                                </button>
                            </div>

                            <div class="br-list" tabindex="0">
                                @foreach ($slc_estados as $estado)
                                    <div class="br-item" tabindex="-1">
                                        <div class="br-radio">
                                            <input id="rb{{ $estado->sigla }}" type="radio" name="estado"
                                                value="{{ $estado->sigla }}" />
                                            <label for="rb{{ $estado->sigla }}">{{ $estado->estado }}</label>
                                        </div>
                                    </div>
                                @endforeach
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

                            <div class="br-list" tabindex="0">
                                @foreach ($slc_municipios as $municipio)
                                    <div class="br-item" tabindex="-1">
                                        <div class="br-radio">
                                            <input id="{{ $municipio->ibge }}" type="radio" name="municipio"
                                                value="{{ $municipio->ibge }}" />
                                            <label for="{{ $municipio->ibge }}">{{ $municipio->nome }}</label>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12 mb-3">
                        <div class="br-select">
                            <div class="br-input">
                                <label for="select-simple">Situação</label>
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
                    <a href="{{ route('indexFomento') }}"><button class="br-button primary mr-3" type="button" style="background-color:#f8f5f5; color:#1351b4;"><i class="far fa-arrow-alt-circle-left"></i> Voltar</button></a>
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
                    <a class="br-button mr-3 secondary " href="" type="button"> <i
                            class="fas fa-list"></i> Exportar
                    </a>
                    <a class="br-button mr-3 primary" href="{{ route('entidadesExecutorasForm') }}" type="button"> <i
                            class="fas fa-plus"></i> Adicionar
                    </a>
                </div>
            </div>
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
                @if ($slc_entidadesExecutoras)
                    @foreach ($slc_entidadesExecutoras as $entidade)
                        <tr>
                            <td data-th="Ações">
                                <a href="{{ route('entidadesExecutoraView', $entidade->id) }}" class="br-button circle"><i class="fas fa-eye" aria-hidden="true"></i></a>
                                <a href="#" class="br-button circle"><i class="fas fa-user-plus" aria-hidden="true"></i></a>
                                <a href="{{ route('habilitacaoExecutora', $entidade->id) }}" class="br-button circle"><i class="fa fa-clipboard-list" aria-hidden="true"></i></a>
                            </td>
                            <td data-th="CNPJ">{{ $entidade->cnpj }}</td>
                            <td data-th="estado">{{ $entidade->estado_id }}</td>
                            <td data-th="Nome Fantasia">{{ $entidade->sigla }}</td>
                            <td data-th="Razão Social">{{ $entidade->nome_fantasia }}</td>

                            @if($entidade->situacao == 'Habilitada')
                                    <td class="p-0" data-th="STATUS" style="text-align:center;">
                                        <button class="br-button success small mr-3" type="button" style="width:122px;">Habilitado</button>
                                    </td>
                                @else
                                    <td class="p-0" data-th="STATUS" style="text-align:center;">
                                        <button class="br-button danger small mr-3" type="button" style="width:120px;">Desabilitado</button>
                                    </td>
                            @endif
                    @endforeach
                @endif
            </tbody>
        </table>
        

        <nav class="br-pagination small" aria-label="Paginação de resultados"
            data-total="{{ $slc_entidadesExecutoras->lastPage() }}"
            data-current="{{ $slc_entidadesExecutoras->currentPage() }}">
            <ul class="pagination">
                <li class="page-item {{ $slc_entidadesExecutoras->currentPage() == 1 ? 'disabled' : '' }}">
                    <a class="br-button circle"
                        href="{{ $slc_entidadesExecutoras->previousPageUrl() }}"><i class="fas fa-angle-left" aria-hidden="true"></i></a>
                </li>

                @for ($i = 1; $i <= $slc_entidadesExecutoras->lastPage(); $i++)
                    <li>
                        <a class="page {{ $slc_entidadesExecutoras->currentPage() == $i ? 'active' : '' }}"
                            href="{{ $slc_entidadesExecutoras->url($i) }}">{{ $i }}</a>
                    </li>
                @endfor

                <li class="page-item {{ $slc_entidadesExecutoras->currentPage() == $slc_entidadesExecutoras->lastPage() ? 'disabled' : '' }}">
                    <a class="br-button circle"
                        href="{{ $slc_entidadesExecutoras->nextPageUrl() }}"><i class="fas fa-angle-right" aria-hidden="true"></i></a>
                </li>
            </ul>
        </nav> 
        

    </div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
@endsection
