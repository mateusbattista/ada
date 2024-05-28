@extends('layouts.main-interno')
@section('title', 'Fomento')
@section('line-header')
    @include('fomento.line-header')
@endsection
@section('nav-bar')
    @include('fomento.nav-bar')
@endsection
@section('content')
    <style>
       
        .wizard-sample-1 {
            height: 200% !important;
            min-height: 100% !important;
        }

        .wizard-form {
            height: 300% !important;
            min-height: 100% !important;
            border-top: 0 !important;
        }

        .br-wizard {
            background-color: white !important;
            max-height: 300% !important;
            min-height: 100% !important;
        }

        .wizard-panel-btn {
            background-color: white !important;
        }

        .wizard-panel-content {
            width: 100% !important;
            overflow: hidden !important;
        }

        #cronograma td,
        #cronograma th {
            border: 1px solid black;
            text-align: center !important;
        }

        .responsive {
            overflow: auto;
        }

        #incluir{
            position: fixed;
        }
    </style>

    <div class="wizard-sample-1 mx-auto">
        <form method="post" action="{{ route('PlanoOperacionalCreate') }}"  id="plano_trabalho_form" autocomplete="off">
            @csrf
            <div class="br-wizard" collapsed="collapsed" step="1">
                <div class="br-card my-4">
                    <div class="wizard-progress" style="background-color: white  !important;">
                        <button class="wizard-progress-btn" type="button" title=">Identificação dos Partícipes"><span
                                class="info">Identificação dos Partícipes</span></button>
                        <button class="wizard-progress-btn" type="button" title="Descrição da Proposta - Parte 1"
                            active="active"><span class="info">Descrição da Proposta - Parte 1</span></button>
                        <button class="wizard-progress-btn" type="button" title="Descrição da Proposta - Parte 2"
                            active="active"><span class="info">Descrição da Proposta - Parte 2</span></button>
                        <button class="wizard-progress-btn" type="button" title="Cronograma Geral de Execução do ACT"
                            active="active"><span class="info">Cronograma Geral de Execução do ACT</span></button>
                    </div>
                </div>
                <div class="br-card mb-4">
                    <div class="wizard-form">
                        {{-- Identificação dos Partícipes --}}
                        <div class="wizard-panel" active="active">
                            <div class="wizard-panel-content">
                                <div class="text" tabindex="0">

                                    <div class="form-group row">
                                        <div class="col-sm-12 my-6 mx-4">
                                            <div class="br-input">
                                                <label for="tipo_parceria">Tipo de Parceria:</label>
                                                <input id="tipo_parceria" type="text" name="tipo_parceria"
                                                    placeholder="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-6 mx-4">
                                            <div class="br-input">
                                                <label for="numero_instrumento">Nº do Instrumento de Parceria:</label>
                                                <input id="numero_instrumento" type="text" name="numero_instrumento"
                                                    placeholder="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-6 mx-4">
                                            <div class="br-input">
                                                <label for="numero_sei">Número do Processo SEI:</label>
                                                <input id="numero_sei" type="text" name="numero_sei" placeholder="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-6 mx-4">
                                            <div class="br-select">
                                                <div class="br-input">
                                                    <label for="select-estado">Estado:</label>
                                                    <input id="select-estado" type="text" name="estado_entidade"
                                                        placeholder="Selecione o Estado" />
                                                    <button class="br-button" type="button" aria-label="Exibir lista"
                                                        tabindex="-1" data-trigger="data-trigger"><i
                                                            class="fas fa-angle-down" aria-hidden="true"></i>
                                                    </button>
                                                </div>

                                                <div class="br-list" tabindex="0" style="z-index: 9999">
                                                    @foreach ($slc_estados as $estado)
                                                        <div class="br-item" tabindex="-1">
                                                            <div class="br-radio">
                                                                <input id="{{ $estado->sigla }}" type="radio"
                                                                    name="estado_entidade" value="{{ $estado->sigla }}" />
                                                                <label
                                                                    for="{{ $estado->sigla }}">{{ $estado->estado }}</label>
                                                            </div>
                                                        </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    {{-- Identificação do MDS / SESAN --}}
                                    <div class="form-group row">
                                        <div class="col-sm-12 m-4">
                                            <div class="br-accordion" id="accordion4-negative" single="single">
                                                <div class="item" >
                                                    <button class="header" type="button" aria-controls="id16"><span
                                                            class="title">Identificação do MDS / SESAN</span><span
                                                            class="icon"><i class="fas fa-angle-down"
                                                                aria-hidden="true"></i></span>
                                                    </button>

                                                </div>
                                                <div class="content" id="id16">

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="nome_ministerio">Órgão /
                                                                    Unidade:</label>
                                                                <input id="nome_ministerio" type="text"
                                                                    name="nome_ministerio" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="cpf_responsavel_ministerio">Número
                                                                    CPF:</label>
                                                                <input id="cpf_responsavel_ministerio" type="text"
                                                                    name="cpf_responsavel_ministerio" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="nome_responsavel_ministerio">Nome do
                                                                    Responsável:</label>
                                                                <input id="nome_responsavel_ministerio" type="text"
                                                                    name="nome_responsavel_ministerio" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="cargo_responsavel_ministerio">Cargo:</label>
                                                                <input id="cargo_responsavel_ministerio" type="text"
                                                                    name="cargo_responsavel_ministerio" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="email_responsavel_ministerio">E-mail:</label>
                                                                <input id="email_responsavel_ministerio" type="text"
                                                                    name="email_responsavel_ministerio" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="telefone_responsavel_ministerio">Número
                                                                    do
                                                                    DDD/Telefone:</label>
                                                                <input id="telefone_responsavel_ministerio" type="text"
                                                                    name="telefone_responsavel_ministerio"
                                                                    placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {{-- Identificação dos Participes/Unidade Gestora --}}
                                    <div class="form-group row">
                                        <div class="col-sm-12 m-4">
                                            <div class="br-accordion" id="accordion4-negative" single="single">
                                                <div class="item" >
                                                    <button class="header" type="button" aria-controls="id17"><span
                                                            class="title">Identificação dos Partícipes
                                                            Estaduais</span><span class="icon"><i
                                                                class="fas fa-angle-down" aria-hidden="true"></i></span>
                                                    </button>

                                                </div>
                                                <div class="content" id="id17">

                                                    <h2>Unidade Gestora </h2>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-select">
                                                                <div class="br-input">
                                                                    <label for="select-entidade-gestora">Unidade Gestora:</label>
                                                                    <input id="select-entidade-gestora" type="text" name="entidade_gestora"
                                                                        placeholder="Selecione a Entidade Gestora" />
                                                                    <button class="br-button" type="button" aria-label="Exibir lista"
                                                                        tabindex="-1" data-trigger="data-trigger"><i
                                                                            class="fas fa-angle-down" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                
                                                                <div class="br-list" tabindex="0" style="z-index: 9999">
                                                                    @foreach ($slc_entidadesGestoras as $gestora)
                                                                        <div class="br-item" tabindex="-1">
                                                                            <div class="br-radio">
                                                                                <input id="{{ $gestora->id }}" type="radio"
                                                                                    name="entidade_gestora" value="{{ $gestora->id }}" />
                                                                                <label
                                                                                    for="{{ $gestora->id }}">{{ $gestora->razao_social }}</label>
                                                                            </div>
                                                                        </div>
                                                                    @endforeach
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                    

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-select">
                                                                <div class="br-input">
                                                                    <label for="select-responsavel">Responsável:</label>
                                                                    <input id="select-responsavel" type="text" name="responsavel"
                                                                        placeholder="Selecione a Entidade Gestora" />
                                                                    <button class="br-button" type="button" aria-label="Exibir lista"
                                                                        tabindex="-1" data-trigger="data-trigger"><i
                                                                            class="fas fa-angle-down" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                
                                                                <div class="br-list" tabindex="0" style="z-index: 9999">
                                                                    @foreach ($slc_responsaveis as $responsavel)
                                                                        <div class="br-item" tabindex="-1">
                                                                            <div class="br-radio">
                                                                                <input id="{{ $responsavel->id }}" type="radio"
                                                                                    name="responsavel" value="{{ $responsavel->id }}" />
                                                                                <label
                                                                                    for="{{ $responsavel->id }}">{{ $responsavel->nome }}</label>
                                                                            </div>
                                                                        </div>
                                                                    @endforeach
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 

                                                    <hr class="mb-6">

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="nome_gestor_termo">Gestor do Termo de
                                                                    Adesão:</label>
                                                                <input id="nome_gestor_termo" type="text"
                                                                    name="nome_gestor_termo" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="cargo_gestor_termo">Cargo:</label>
                                                                <input id="cargo_gestor_termo" type="text"
                                                                    name="cargo_gestor_termo" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="cpf_gestor_termo">Número CPF:</label>
                                                                <input id="cpf_gestor_termo" type="text"
                                                                    name="cpf_gestor_termo" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="email_gestor_termo">E-mail:</label>
                                                                <input id="email_gestor_termo" type="text"
                                                                    name="email_gestor_termo"
                                                                    placeholder="exemplo@mail.com" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-6">
                                                            <div class="br-input">
                                                                <label for="telefone_gestor_termo">Número do
                                                                    DDD/Telefone:</label>
                                                                <input id="telefone_gestor_termo" type="text"
                                                                    name="telefone_gestor_termo" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-6 mx-4">
                                            <div class="br-select">
                                                <div class="br-input">
                                                    <label for="tipo_unidade">Entidade Executora</label>
                                                    <input id="tipo_unidade" type="text"
                                                        placeholder="Selecione os itens" />
                                                    <button class="br-button" type="button" aria-label="Exibir lista"
                                                        tabindex="-1" data-trigger="data-trigger"><i
                                                            class="fas fa-angle-down" aria-hidden="true"></i>
                                                    </button>
                                                </div>

                                                <div class="br-list">
                                                    @foreach ($slc_entidadesExecutoras as $executora)
                                                        <div class="br-item" tabindex="-1">
                                                            <div class="br-radio">
                                                                <input id="executora_id{{$executora->id}}" type="radio"
                                                                    name="executora_id" value="{{$executora->id}}" />
                                                                <label for="executora_id{{$executora->id}}">{{$executora->nome_fantasia}}</label>
                                                            </div>
                                                        </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="wizard-panel-btn">
                                <button class="br-button primary wizard-btn-next" type="button">Avançar
                                </button>
                            </div>
                        </div>

                        {{-- Descrição da Proposta - Parte 1 --}}
                        <div class="wizard-panel ">
                            <div class="wizard-panel-content ">
                                <div class="form-group row">
                                    <div class="col-sm-12 mb-2 my-6 mx-4">
                                        <div class="text-weight-semi-bold text-up-02 text-info">2.1. Meta Física
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-2">
                                                <div class="br-input">
                                                    <label for="numero_familias">Nº Total de Famílias a serem
                                                        Atendidas:</label>
                                                    <input id="numero_familias" type="number" min="1"
                                                        name="numero_familias" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-3">
                                                <div class="br-select" multiple="multiple">
                                                    <div class="br-input">
                                                        <label for="select-multtiple">Estado:</label>
                                                        <input id="select-multtiple" type="text" name="estado2"
                                                            placeholder="Selecione o(s) Estado(s)" />
                                                        <button class="br-button" type="button"
                                                            aria-label="Exibir lista" tabindex="-1"
                                                            data-trigger="data-trigger"><i class="fas fa-angle-down"
                                                                aria-hidden="true"></i>
                                                        </button>
                                                    </div>

                                                    <div class="br-list" tabindex="0">
                                                        <div class="br-item highlighted" data-all="data-all"
                                                            tabindex="-1">
                                                            <div class="br-checkbox">
                                                                <input id="cb" name="cb" type="checkbox" />
                                                                <label for="cb">Selecionar todos</label>
                                                            </div>
                                                        </div>
                                                        @foreach ($slc_estados as $estado)
                                                            <div class="br-item" tabindex="-1">
                                                                <div class="br-checkbox">
                                                                    <input id="lb{{ $estado->estado }}" type="checkbox"
                                                                        name="estado3" value="{{ $estado->sigla }}" />
                                                                    <label
                                                                        for="lb{{ $estado->estado }}">{{ $estado->estado }}</label>
                                                                </div>
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-6 ">
                                                <!-- [html-validate-disable input-attributes]-->
                                                <div class="br-datetimepicker" data-mode="single" data-type="text">
                                                    <div class="br-input has-icon">
                                                        <label for="simples-input">Data Início de Execução:</label>
                                                        <input id="simples-input" type="text" placeholder="dd/mm/aaaa"
                                                            data-input="data-input" />
                                                        <button class="br-button circle small" type="button"
                                                            aria-label="Abrir Timepicker" data-toggle="data-toggle"
                                                            id="simples-input-btn"><i class="fas fa-calendar-alt"
                                                                aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-sm-6 ">
                                                <!-- [html-validate-disable input-attributes]-->
                                                <div class="br-datetimepicker" data-mode="single" data-type="text">
                                                    <div class="br-input has-icon">
                                                        <label for="simples-input">Data Final de Execução:</label>
                                                        <input id="simples-input" type="text" placeholder="dd/mm/aaaa"
                                                            data-input="data-input" />
                                                        <button class="br-button circle small" type="button"
                                                            aria-label="Abrir Timepicker" data-toggle="data-toggle"
                                                            id="simples-input-btn"><i class="fas fa-calendar-alt"
                                                                aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-12 mb-2 mb-6 mx-4 ">
                                        <div class="text-weight-semi-bold text-up-02 text-info">2.2. Priorização de
                                            Territórios /
                                            Municípios</div>
                                        <p>
                                            Descrever os critérios utilizados na priorização de territórios e/ou
                                            municípios dentro do estado. Sugere-se levar em consideração municípios
                                            com
                                            baixo IDH, com grande concentração de famílias em situação de extrema
                                            pobreza e municípios com grande concentração de famílias com alto índice
                                            de
                                            insegurança alimentar.
                                        </p>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-2">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8">Descrever os critérios utilizados na
                                                        priorização de territórios e/ou municípios dentro do
                                                        estado:</label>
                                                    <textarea id="textarea-id8" placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-12 mb-2 mb-6 mx-4">
                                        <div class="text-weight-semi-bold text-up-02 text-info">2.3. Adicionar
                                            Territórios /
                                            Municípios</div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-3">
                                                <div class="br-select">
                                                    <div class="br-input">
                                                        <label for="select-municipio">Município</label>
                                                        <input id="select-municipio" name="municipio" type="text"
                                                            placeholder="Selecione o item" />
                                                        <button class="br-button" type="button"
                                                            aria-label="Exibir lista" tabindex="-1"
                                                            data-trigger="data-trigger">
                                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                        </button>
                                                    </div>

                                                    <div class="br-list" id="municipio-list"
                                                        data-url="{{ url('/fomento/fetch-municipios/') }}" tabindex="0">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-2">
                                                <div class="br-input">
                                                    <label for="numeroFamilias">Nº Total de Famílias a serem
                                                        Atendidas:</label>
                                                    <input id="numeroFamilias" type="number" min="1"
                                                        name="numeroFamilias" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-2">
                                                <div class="br-input">
                                                    <label for="gtpe_value">GPTE:</label>
                                                    <input id="gtpe_value" type="text" min="1"
                                                        name="gtpe_value" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-2">
                                                <div class="br-input">
                                                    <label for="pct_value">PCT:</label>
                                                    <input id="pct_value" type="text" min="1" name="pct_value"
                                                        placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-flex">
                                            <div class="ml-auto my-4">
                                                <button class="br-button mr-3 primary" id="adicionarTerritorios"
                                                    type="button"> <i class="fas fa-plus"></i> Adicionar
                                                    Território</button>
                                            </div>
                                        </div>

                                        <div id="tablesDiv">
                                            <div class="d-flex">
                                                <h5 class="ml-auto">Total de famílias atendidas: <span
                                                        class="totalFamiliasAtendidas"></span></h5>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div class="wizard-panel-btn">
                                <button class="br-button primary wizard-btn-next" type="button">Avançar
                                </button>
                                <button class="br-button secondary wizard-btn-prev" type="button">Voltar
                                </button>
                            </div>
                        </div>

                        {{-- Descrição da Proposta - Parte 2 Metodologia --}}
                        <div class="wizard-panel ">
                            <div class="wizard-panel-content ">
                                <div class="form-group row">
                                    <div class="col-sm-12 mb-2 my-6 mx-4 ">
                                        <div class="text-weight-semi-bold text-up-02 text-info">2.3. Metodologia /
                                            Descrição das Atividades
                                        </div>
                                        <div class="mx-2 my-2 text-weight-semi-bold text-justify">
                                            Apresentar a metodologia que será adotada no trabalho junto às famílias
                                            e
                                            descrever as atividades individuais e coletivas abaixo listadas, aberta
                                            para
                                            inclusão de outras atividades, tendo como parâmetro mínimo seis
                                            atividades
                                            coletivas, além do acompanhamento individual às unidades familiares a
                                            cada
                                            60 dias, para os 36 meses de acompanhamento de ATER, contados a partir
                                            da
                                            publicação da assinatura do instrumento de parceria no Diário Oficial da
                                            União.
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8 mx-2">1 - Atividade de mobilização e
                                                        seleção das famílias: </label>
                                                    <textarea id="textarea-id8" name='metodologia_mobilizacao' placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8 mx-2">2 - Atividade de elaboração de
                                                        diagnóstico da unidade familiar:</label>
                                                    <textarea id="textarea-id8" name='metodologia_diagnostico' placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8 mx-2">3 - Atividade de elaboração do
                                                        projeto de estruturação produtiva e assinatura do termo de
                                                        adesão:</label>
                                                    <textarea id="textarea-id8" name='metodologia_estruturacao' placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8 mx-2">4 - Atividade de acompanhamento
                                                        e
                                                        orientação produtiva e assinatura do termo de
                                                        adesão:</label>
                                                    <textarea id="textarea-id8" name='metodologia_acompanhamento' placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8 mx-2">5 - Atividade de capacitação
                                                        técnica
                                                        das famílias:</label>
                                                    <textarea id="textarea-id8" name='metodologia_capacitacao' placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8 mx-2">6 - Atividade de avaliação:
                                                        ?</label>
                                                    <textarea id="textarea-id8" name='metodologia_avaliacao' placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="br-textarea">
                                                    <label for="textarea-id8 mx-2">6 .1- Complemento da Atividade
                                                        de
                                                        avaliação:</label>
                                                    <textarea id="textarea-id8" name='metodologia_complemento_avaliacao' placeholder="Escreva aqui a sua justificativa" maxlength="1000"></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="wizard-panel-btn">
                                <button class="br-button primary wizard-btn-next" type="button">Avançar
                                </button>
                                <button class="br-button secondary wizard-btn-prev" type="button">Voltar
                                </button>
                            </div>
                        </div>

                        {{-- Cronograma Geral de Execução do ACT --}}
                        <div class="wizard-panel">
                            <div class="wizard-panel-content">
                                <div class="form-group row">
                                    <div class="col-sm-12 my-6 mx-4">
                                        <div class="text-weight-semi-bold text-up-02 text-info">3. Cronograma Geral
                                            de
                                            Execução do ACT
                                        </div>
                                        <div class="mx-2 my-2 text-weight-semi-bold text-justify">
                                            Apresentar a metodologia que será adotada no trabalho junto às famílias
                                            e
                                            descrever as atividades individuais e coletivas abaixo listadas, aberta
                                            para
                                            inclusão de outras atividades, tendo como parâmetro mínimo seis
                                            atividades
                                            coletivas, além do acompanhamento individual às unidades familiares a
                                            cada
                                            60 dias, para os 36 meses de acompanhamento de ATER, contados a partir
                                            da
                                            publicação da assinatura do instrumento de parceria no Diário Oficial da
                                            União.
                                        </div>

                                        <div class="responsive">
                                            <table id="cronograma">
                                                <thead>
                                                    <tr>
                                                        <th colspan="2" scope="col"></th>
                                                        <th colspan="12" align="center" scope="col">Meses
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col">Atividade</th>
                                                        <th scope="col">Responsável</th>
                                                        <th scope="col">1</th>
                                                        <th scope="col">2</th>
                                                        <th scope="col">3</th>
                                                        <th scope="col">4</th>
                                                        <th scope="col">5</th>
                                                        <th scope="col">6</th>
                                                        <th scope="col">7</th>
                                                        <th scope="col">8</th>
                                                        <th scope="col">9</th>
                                                        <th scope="col">10</th>
                                                        <th scope="col">11</th>
                                                        <th scope="col">12</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Mobilização e seleção das famílias
                                                        </td>
                                                        <td>
                                                            Unidade Gestora / Unidade Executora
                                                        </td>
                                                        <?php
                                                        for ($x = 1; $x <= 12; $x++) {
                                                            echo "<td>
                                                                    <div class='br-checkbox'>
                                                                        <input id='mobilizacao$x' name='mobilizacao[]'
                                                                        value='$x'
                                                                        type='checkbox' aria-label='mobilizacao$x' />
                                                                        <label for='mobilizacao$x'></label>
                                                                    </div>
                                                                </td>";
                                                        }
                                                        ?>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Diagnóstico da unidade familiar
                                                        </td>
                                                        <td>
                                                            Unidade Executora
                                                        </td>
                                                        <?php
                                                        for ($x = 1; $x <= 12; $x++) {
                                                            echo "<td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class='br-checkbox'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <input id='diagnostico$x' name='diagnostico[]'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        value='$x'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            type='checkbox' aria-label='diagnostico $x' />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <label for='diagnostico$x'></label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </td>";
                                                        }
                                                        ?>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Projeto de estruturação produtiva familiar e assinatura
                                                            do
                                                            Termo de adesão familiar
                                                        </td>
                                                        <td>
                                                            Unidade Executora
                                                        </td>
                                                        <?php
                                                        for ($x = 1; $x <= 12; $x++) {
                                                            echo "<td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class='br-checkbox'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <input id='projeto$x' name='projeto[]'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        value='$x'    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        type='checkbox' aria-label='projeto $x' />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <label for='projeto$x'></label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </td>";
                                                        }
                                                        ?>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Liberação da 1ª parcela do recurso com definição de
                                                            amostra
                                                            para aplicação do questionário
                                                        </td>
                                                        <td>
                                                            Gov. Federal
                                                        </td>
                                                        <?php
                                                        for ($x = 1; $x <= 12; $x++) {
                                                            echo "<td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class='br-checkbox'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <input id='liberacao$x' name='liberacao[]'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        value='$x'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            type='checkbox' aria-label='liberacao $x' />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <label for='liberacao$x'></label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </td>";
                                                        }
                                                        ?>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Visita de acompanhamento e orientação técnica às
                                                            famílias
                                                        </td>
                                                        <td>
                                                            Unidade Executora
                                                        </td>
                                                        <?php
                                                        for ($x = 1; $x <= 12; $x++) {
                                                            echo "<td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class='br-checkbox'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <input id='visita$x' name='visita[]'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        value='$x'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            type='checkbox' aria-label='visita $x' />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <label for='visita$x'></label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </td>";
                                                        }
                                                        ?>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Avaliação dos resultados com as famílias
                                                        </td>
                                                        <td>
                                                            Unidade Gestora / Unidade Executora
                                                        </td>
                                                        <?php
                                                        for ($x = 1; $x <= 12; $x++) {
                                                            echo "<td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class='br-checkbox'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <input id='avaliacao$x' name='avaliacao[]'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        value='$x'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            type='checkbox' aria-label='avaliacao $x' />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <label for='avaliacao$x'></label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </td>";
                                                        }
                                                        ?>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="wizard-panel-btn">
                                <button class="br-button primary wizard-btn-next" type="submit">Enviar Plano
                                </button>
                                <button class="br-button secondary wizard-btn-prev" type="button">Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script>
        $(document).ready(function() {

            $("input[type=text]").keyup(function() {
                $(this).val($(this).val().toUpperCase());
            });

            $('#adicionarTerritorios').on('click', function() {
                const municipio = $(".br-select input[type='radio']:checked").val();
                const table = $("#tabelasTerritorios")[0];

                if ($.trim($('#gtpe_value').val()) == '') {
                    alert('Input can not be left blank');
                }


                $.ajax({
                    url: 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/' +
                        municipio,
                    type: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(response) {




                        const territorio = response['microrregiao']['nome'];
                        text = territorio.replace(/ /g, '');


                        if (document.getElementsByClassName(text).length > 0) {

                            const table2 = document.getElementsByClassName(text)[0]
                            const row = document.createElement("tr");

                            const actionCell = document.createElement("td");
                            actionCell.innerHTML =
                                '<a href="#" class="br-button circle "><i class="fas fa-trash" aria-hidden="true"></i></a>';

                            const territorioCell = document.createElement("td");
                            territorioCell.textContent = territorio


                            const nomeCell = document.createElement("td");
                            nomeCell.textContent = response['nome'];

                            const numeroFamilasValue = $("#numeroFamilias").val();

                            const numeroFamiliasCell = document.createElement("td");
                            numeroFamiliasCell.textContent = numeroFamilasValue;
                            numeroFamiliasCell.classList.add("numFamilias")

                            const GPTEValue = $("#gtpe_value").val();

                            const GTPECell = document.createElement("td");
                            GTPECell.textContent = GPTEValue;

                            const PCTValue = $("#pct_value").val();

                            const PCTCell = document.createElement("td");
                            PCTCell.textContent = PCTValue;

                            row.appendChild(actionCell);
                            row.appendChild(territorioCell);
                            row.appendChild(nomeCell);
                            row.appendChild(numeroFamiliasCell);
                            row.appendChild(GTPECell);
                            row.appendChild(PCTCell);

                            const fragment = document.createDocumentFragment();
                            fragment.appendChild(row);
                            table2.appendChild(fragment);
                            table2.classList.add(text)
                            updateTotal();
                            updateRegiao(text)

                        } else {
                            var div = document.createElement("div");
                            var divContainer = document.createElement("div");
                            var divFlex = document.createElement("div");
                            var divResponsive = document.createElement("div");
                            div.classList.add("br-table")
                            divResponsive.classList.add("responsive")
                            const table2 = document.createElement("table")

                            table2.classList.add("my-2")

                            const header = table2.createTHead();
                            header.style.backgroundColor = "#f0f0f0";
                            const rowHeader = header.insertRow(0)
                            const cell1 = rowHeader.insertCell(0)
                            const cell2 = rowHeader.insertCell(0)
                            const cell3 = rowHeader.insertCell(0)
                            const cell4 = rowHeader.insertCell(0)
                            const cell5 = rowHeader.insertCell(0)
                            const cell6 = rowHeader.insertCell(0)
                            cell6.innerHTML = ''
                            cell5.innerHTML = 'Território/Região'
                            cell4.innerHTML = 'Município'
                            cell3.innerHTML = 'Nº de Famílias'
                            cell2.innerHTML = 'GPTES'
                            cell1.innerHTML = 'Povos'

                            const row = document.createElement("tr");

                            const actionCell = document.createElement("td");
                            actionCell.innerHTML =
                                '<a href="#" class="br-button circle "><i class="fas fa-trash" aria-hidden="true"></i></a>';

                            const territorioCell = document.createElement("td");
                            territorioCell.textContent = territorio


                            const nomeCell = document.createElement("td");
                            nomeCell.textContent = response['nome'];

                            const numeroFamilasValue = $("#numeroFamilias").val();

                            const numeroFamiliasCell = document.createElement("td");
                            numeroFamiliasCell.textContent = numeroFamilasValue;
                            numeroFamiliasCell.classList.add("numFamilias")

                            const GPTEValue = $("#gtpe_value").val();

                            const GTPECell = document.createElement("td");
                            GTPECell.textContent = GPTEValue;

                            const PCTValue = $("#pct_value").val();

                            const PCTCell = document.createElement("td");
                            PCTCell.textContent = PCTValue;

                            row.appendChild(actionCell);
                            row.appendChild(territorioCell);
                            row.appendChild(nomeCell);
                            row.appendChild(numeroFamiliasCell);
                            row.appendChild(GTPECell);
                            row.appendChild(PCTCell);

                            const fragment = document.createDocumentFragment();
                            fragment.appendChild(row);
                            table2.appendChild(fragment);
                            table2.classList.add(text)
                            divResponsive.appendChild(table2)

                            const numFamiliasTerritorio = document.createElement("h6")
                            const numSpan = document.createElement("span")
                            numSpan.classList.add(text)
                            numFamiliasTerritorio.textContent =
                                "Total de famílias atendidas na região:"


                            numSpan.style.fontWeight = "800"
                            numSpan.style.fontSize = "16.8px"
                            divContainer.appendChild(numFamiliasTerritorio);
                            divContainer.appendChild(numSpan);

                            divFlex.appendChild(divContainer);

                            divResponsive.appendChild(divFlex);


                            divFlex.classList.add("d-flex")

                            numFamiliasTerritorio.style.display = "inline-block";
                            divContainer.classList.add("ml-auto");



                            div.appendChild(divResponsive)

                            const tablesDiv = document.getElementById("tablesDiv");
                            tablesDiv.appendChild(div);
                            updateTotal();
                            updateRegiao(text)
                        }




                    },
                    error: function(error) {
                        console.error('Error:', error);
                    }
                });

                function updateTotal() {
                    var totalFamilias = 0;

                    $('table td.numFamilias').each(function() {
                        var familiaValue = parseInt($(this).text(), 10);
                        totalFamilias += familiaValue;
                    });

                    $('span.totalFamiliasAtendidas').text(totalFamilias);
                }

                function updateRegiao(regiao) {
                    var totalFamilias = 0;
                    console.log('table.' + regiao + ' td.numFamilias ')
                    $('table.' + regiao + ' td.numFamilias ').each(function() {
                        var familiaValue = parseInt($(this).text(), 10);
                        totalFamilias += familiaValue;
                    });

                    $('span.' + regiao).text(totalFamilias);
                } // Update the total

            })


        });
    </script>

    <script src="{{ asset('js/jquery.mask.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js"></script>
    <script>
        $(document).ready(function($) {
            $("input[type=text]").keyup(function() {
                $(this).val($(this).val().toUpperCase());
            });
            $('#id_cnpj').mask('00.000.000/0000-00', {
                reverse: true
            });
            $('#id_cpf').mask('000.000.000-00', {
                reverse: true
            });

            $('#cpf_responsavel_gestora').mask('000.000.000-00', {
                reverse: true
            });

            $('#cpf_responsavel_ministerio').mask('000.000.000-00', {
                reverse: true
            });

            $('#cpf_gestor_termo').mask('000.000.000-00', {
                reverse: true
            });

            $('#telefone_gestor_termo').mask('(00) 00000-0000')

            $('#telefone_responsavel_ministerio').mask('(00) 00000-0000')
        })
    </script>
@endsection
