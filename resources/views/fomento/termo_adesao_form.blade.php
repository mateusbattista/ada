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
        height: 200% !important;
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
</style>

<div class="wizard-sample-1 mx-auto">
    <div class="card-header mb-2">
        <h5 class="card-title d-sm-inline-block">Termo de adesão ao Programa Fomento Rural</h5>
    </div>
    <div class="card-header mb-2 text-center">
        <img src="{{ URL::asset('img/brasao-brasil.png') }}" alt="brasao" width="186px" /><br>
        <h5 class="card-title d-sm-inline-block">Ministério do Desenvolvimento e Assistência Social, Família
            e Combate à Fome - MDS</h5>
    </div>
    <form method="post" action="{{ route('termoAdesaoCreate') }}" id="plano_trabalho_form" autocomplete="off">
        @csrf
        <div class="br-wizard" collapsed="collapsed" step="1">
            <div class="my-4">
                <div class="wizard-progress" style="background-color: white  !important;">
                    <button class="wizard-progress-btn" type="button" title=">Identificação dos Partícipes">
                        <span class="info">Identificação dos Partícipes</span>
                    </button>
                    <button id="proxima-pagina" class="wizard-progress-btn" type="button" title="Descrição da Atividade"
                        active="active" disabled>
                        <span class="info">Descrição da Atividade</span>
                    </button>
                </div>
            </div>
            <div class="br-card mb-4">
                <div class="wizard-form">
                    {{-- Identificação dos Partícipes --}}
                    <div class="wizard-panel" active="active">
                        <div class="wizard-panel-content">


                            <div class="card-content mr-3">

                                <div class="br-content">

                                    <div class="form-group row">
                                        <div class="col-sm-12 my-3 mx-4">
                                            <div class="br-select">
                                                <div class="br-input">
                                                    <label for="tipo_unidade">Entidade Executora</label>
                                                    <input id="tipo_unidade" type="text"
                                                        placeholder="Selecione os itens" required/>
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
                                                            <label
                                                                for="executora_id{{$executora->id}}">{{$executora->nome_fantasia}}</label>
                                                        </div>
                                                    </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-3 mx-4">
                                            <div class="br-input">
                                                <label for="cnpj_executora">CNPJ da entidade executora</label>
                                                <input id="cnpj_executora" type="text" name="cnpj_executora"
                                                    placeholder="132365.6589.225/0001-02" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-3 mx-4">
                                            <div class="br-input">
                                                <label for="nome_tecnico">Nome do técnico/a e assinatira</label>
                                                <input id="nome_tecnico" type="text" name="nome_tecnico"
                                                    placeholder="nome do técnico" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-3 mx-4">
                                            <div class="br-input">
                                                <label for="cpf_tecnico">CPF do técnico/a</label>
                                                <input id="cpf_tecnico" type="text" name="cpf_tecnico"
                                                    placeholder="999.999.999-99" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row mx-1">
                                        <div class="col-sm-6 mb-3">
                                            <div class="br-select">
                                                <div class="br-input">
                                                    <label for="select-estado">Estado:</label>
                                                    <input id="select-estado" type="text" name="estado"
                                                        placeholder="..:: Selecione ::.." required/>
                                                    <button class="br-button" type="button" aria-label="Exibir lista"
                                                        tabindex="-1" data-trigger="data-trigger"><i
                                                            class="fas fa-angle-down" aria-hidden="true"></i>
                                                    </button>
                                                </div>

                                                <div class="br-list" tabindex="0">
                                                    @foreach ($slc_estados as $estado)
                                                    <div class="br-item" tabindex="-1">
                                                        <div class="br-radio">
                                                            <input id="rb{{ $estado->sigla }}" type="radio"
                                                                name="estado" value="{{ $estado->sigla }}" />
                                                            <label for="rb{{ $estado->sigla }}">{{ $estado->estado
                                                                }}</label>
                                                        </div>
                                                    </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-6 mb-3">
                                            <div class="br-select">
                                                <div class="br-input">
                                                    <label for="select-municipio">Município:</label>
                                                    <input id="select-municipio" name="municipio" type="text"
                                                        placeholder="..:: Selecione ::.." required/>
                                                    <button class="br-button" type="button" aria-label="Exibir lista"
                                                        tabindex="-1" data-trigger="data-trigger">
                                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                    </button>
                                                </div>

                                                <div class="br-list" tabindex="0">
                                                    @foreach ($slc_municipios as $municipio)
                                                    <div class="br-item" tabindex="-1">
                                                        <div class="br-radio">
                                                            <input id="{{ $municipio->ibge }}" type="radio"
                                                                name="municipio" value="{{ $municipio->ibge }}" />
                                                            <label for="{{ $municipio->ibge }}">{{ $municipio->nome
                                                                }}</label>
                                                        </div>
                                                    </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-3 mx-4">
                                            <div class="br-input">
                                                <label for="nome_beneficiario">Beneficiário/a assistido/a</label>
                                                <input id="nome_beneficiario" type="text" name="nome_beneficiario"
                                                    placeholder="beneficiário" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-3 mx-4">
                                            <div class="br-input">
                                                <label for="cpf_beneficiario">CPF do/a beneficiário/a</label>
                                                <input id="cpf_beneficiario" type="text" name="cpf_beneficiario"
                                                    placeholder="999.999.999-99" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-12 mb-3 mx-4">
                                            <div class="br-input">
                                                <label for="nis_beneficiario">NIS do/a beneficiário/a
                                                    assistido/a</label>
                                                <input id="nis_beneficiario" name="nis_beneficiario" type="text"
                                                    placeholder="12336596322540002596" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-6 mx-4">
                                            <div class="br-input">
                                                <label for="data">Data</label>
                                                <input id="data" type="date" name="data" required/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="div br-modal large mb-6" style="max-width: 100%; max-height: 400px;">
                                    <div class="br-modal-header">
                                        <h6 class="page-header text-center">TERMO DE ADESÃO</h5>
                                    </div>
                                    <div class="br-modal-body">
                                        <p><strong>PROGRAMA DE FOMENTO ÀS ATIVIDADES PRODUTIVAS RURAIS (PROGRAMA FOMENTO
                                                RURAL)</strong></p>
                                        <p>A(s) pessoa(s) responsável(is) pela família beneficiária aqui identificada(s)
                                            manifesta(m)
                                            livremente sua vontade de aderir ao PROGRAMA FOMENTO RURAL (Lei n° 12.512,
                                            de 14 de
                                            outubro de 2011) e declara(m) que:</p>
                                        <ol>
                                            <li>
                                                A família se enquadra nas condições previstas no art. 11 da Lei nº
                                                12.512/2011:
                                                <ul>
                                                    <li>
                                                        Estimular a geração de trabalho e renda com sustentabilidade.
                                                    </li>
                                                    <li>
                                                        Promover a segurança alimentar e nutricional dos beneficiários.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                A família se compromete a realizar, com a orientação do/a técnico/a que
                                                faz o
                                                atendimento
                                                familiar para a inclusão social e produtiva, as etapas que compõem o
                                                projeto de
                                                estruturação
                                                produtiva elaborado em comum acordo entre a família e o/a técnico/a, de
                                                acordo
                                                com as regras do
                                                <strong>PROGRAMA FOMENTO RURAL</strong> definidas no regulamento desse
                                                Programa.
                                            </li>

                                        </ol>

                                        <p><strong>Informações Gerais sobre o</strong></p>
                                        <p><strong>PROGRAMA DE FOMENTO ÀS ATIVIDADES PRODUTIVAS RURAIS</strong></p>

                                        <p>Objetivos:</p>
                                        <ul>
                                            <li>
                                                Estimular a geração de trabalho e renda com sustentabilidade.
                                            </li>
                                            <li>
                                                Promover a segurança alimentar e nutricional dos beneficiários.
                                            </li>
                                        </ul>
                                        <p>Funcionamento:</p>
                                        <ul>
                                            <li>
                                                A transferência dos recursos financeiros do <strong>PROGRAMA FOMENTO
                                                    RURAL</strong> depende da assinatura deste
                                                Termo de Adesão, da elaboração de um projeto de estruturação produtiva
                                                pela
                                                família beneficiária,
                                                com a orientação do/a técnico/a de atendimento familiar para a inclusão
                                                social e
                                                produtiva, e da
                                                execução de forma satisfatória por essa família das etapas previstas no
                                                projeto.
                                                A elaboração do projeto é, então,
                                                etapa obrigatória para o recebimento dos recursos do <strong>PROGRAMA
                                                    FOMENTO
                                                    RURAL</strong>.
                                            </li>
                                            <li>
                                                A transferência dos recursos financeiros do <strong>PROGRAMA FOMENTO
                                                    RURAL</strong> será feita à família beneficiária em parcelas,
                                                conforme a regulamentação em vigor, e diretamente à pessoa responsável
                                                por essa
                                                família.
                                            </li>
                                            <ul>
                                                <li>
                                                    A primeira parcela será liberada após a inclusão pelo/a técnico/a de
                                                    atendimento familiar para a inclusão social e
                                                    produtiva do Termo de Adesão assinado em sistema eletrônico e à
                                                    apresentação
                                                    do projeto de estruturação da unidade produtiva familiar.
                                                </li>
                                                <li>
                                                    A parcela seguinte será liberada após decorridos, no mínimo, dois
                                                    meses da
                                                    liberação da parcela anterior. A liberação da parcela seguinte
                                                    à primeira parcela dependerá dos laudos de acompanhamento feitos
                                                    pelo/a
                                                    técnico/a que acompanha a família beneficiária, atestando que as
                                                    etapas do projeto de estruturação produtiva estão sendo cumpridas de
                                                    forma
                                                    satisfatória
                                                </li>
                                            </ul>
                                            <li>
                                                A transferência de recursos financeiros de que trata este Termo de
                                                Adesão será
                                                suspensa ou cancelada se a família beneficiária não cumprir
                                                satisfatoriamente as etapas estabelecidas no projeto de estruturação
                                                produtiva.
                                            </li>
                                            <ul>
                                                <li>
                                                    Os recursos financeiros do <strong>PROGRAMA FOMENTO RURAL</strong>
                                                    serão
                                                    transferidos sem a exigência do seu reembolso e por meio da
                                                    estrutura de
                                                    pagamento do Programa Bolsa Família.
                                                </li>
                                                <li>
                                                    A Caixa Econômica Federal é o agente operador do <strong>PROGRAMA
                                                        FOMENTO
                                                        RURAL</strong> e fará o repasse das parcelas às famílias
                                                    beneficiárias.
                                                </li>
                                            </ul>
                                            <br>
                                        </ul>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-12 mb-3">
                                        <div class="br-checkbox">
                                            <input id="check-state-checked" name="check-state-checked"
                                                type="checkbox" required/>
                                            <label for="check-state-checked"><strong>Estou de acordo com o conteúdo
                                                    deste Termo
                                                    de Adesão</strong></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wizard-panel-btn">
                            <button id="botao-proximo" class="br-button primary wizard-btn-next" type="button"
                                disabled>Próximo
                                <i class="fas fa-chevron-right" style="padding-left: 20px;"></i>
                            </button>
                        </div>
                    </div>
                    {{-- Descrição da Atividade --}}
                    <div class="wizard-panel ">
                        <div class="wizard-panel-content ">
                            <div class="card-content mr-3">
                                <div class="mb-6 mx-4">

                                    <div class="col-sm-12 mb-6">
                                        <div class="br-select">
                                            <div class="br-input">
                                                <label for="projeto_estruturacao">Escolha a opção que mais se
                                                    adequada ao seu Projeto de Estruturação Produtiva</label>
                                                <input id="projeto_estruturacao" type="text" name="projeto_estruturacao"
                                                    placeholder="..:: Selecione ::.." required/>
                                                <button class="br-button" type="button" aria-label="Exibir lista"
                                                    tabindex="-1" data-trigger="data-trigger"><i
                                                        class="fas fa-angle-down" aria-hidden="true"></i>
                                                </button>
                                            </div>

                                            <div class="br-list" tabindex="0">
                                                @foreach ($slc_projeto_estruturacao as $pe)
                                                <div class="br-item" tabindex="-1">
                                                    <div class="br-radio">
                                                        <input id="rb{{ $pe }}" type="radio" name="pe"
                                                            value="{{ $pe }}" />
                                                        <label for="rb{{ $pe }}">{{ $pe
                                                            }}</label>
                                                    </div>
                                                </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div class="br-card mb-6">

                                    <div class="br-content mb-6 mx-4">
                                        <div class="br-modal-header mb-6">
                                            <h7 class="page-header text-center">Atividades Produtivas desenvolvidas no
                                                projeto</h5>
                                        </div>
                                        <div class="col-sm-12 mb-6">
                                            <div class="form-group row">

                                                <div class="col-sm-6 mb-3">
                                                    <div class="br-select">
                                                        <div class="br-input">
                                                            <label for="atividade_produtiva">Atividades
                                                                Produtivas</label>
                                                            <input id="atividade_produtiva" type="text"
                                                                name="atividade_produtiva"
                                                                placeholder="..:: Selecione ::.." />
                                                            <button class="br-button" type="button"
                                                                aria-label="Exibir lista" tabindex="-1"
                                                                data-trigger="data-trigger"><i class="fas fa-angle-down"
                                                                    aria-hidden="true"></i>
                                                            </button>
                                                        </div>

                                                        <div class="br-list" tabindex="0">
                                                            @foreach ($slc_atividades_produtivas as $ap)
                                                            <div class="br-item" tabindex="-1">
                                                                <div class="br-radio">
                                                                    <input id="rb{{ $ap }}" type="radio" name="ap"
                                                                        value="{{ $ap }}" />
                                                                    <label for="rb{{ $ap }}">{{ $ap
                                                                        }}</label>
                                                                </div>
                                                            </div>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6 mb-3">
                                                    <div class="br-select">
                                                        <div class="br-input">
                                                            <label for="tipo_atividade">Tipo de Atividade</label>
                                                            <input id="tipo_atividade" type="text" name="tipo_atividade"
                                                                placeholder="..:: Selecione ::.." />
                                                            <button class="br-button" type="button"
                                                                aria-label="Exibir lista" tabindex="-1"
                                                                data-trigger="data-trigger"><i class="fas fa-angle-down"
                                                                    aria-hidden="true"></i>
                                                            </button>
                                                        </div>

                                                        <div class="br-list" tabindex="0">
                                                            @foreach ($slc_tipos_atividades as $ta)
                                                            <div class="br-item" tabindex="-1">
                                                                <div class="br-radio">
                                                                    <input id="rb{{ $ta }}" type="radio" name="ta"
                                                                        value="{{ $ta }}" />
                                                                    <label for="rb{{ $ta }}">{{ $ta
                                                                        }}</label>
                                                                </div>
                                                            </div>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button class="br-button secondary" type="button">
                                                <i class="fas fa-plus" style="padding-right: 20px; color: #2B982B;"></i>
                                                Incluir
                                            </button>
                                            <hr>
                                            <!-- Adicionar lista de atividades inseridas -->

                                        </div>


                                    </div>
                                </div>

                                <div class="br-card mb-6">

                                    <div class="br-content mb-6 mx-4">
                                        <div class="br-modal-header mb-6">
                                            <h7 class="page-header text-center">Projetos Coletivos</h5>
                                        </div>

                                        <div class="col-sm-12 mb-3">
                                            <div class="br-input mb-3">
                                                <label for="nis_responsavel">Informe o NIS do responsável por cada
                                                    família beneficiária
                                                    <em style="opacity: 75%;">(Preferencialmente quem recebe o Programa
                                                        Bolsa Família)</em></label>
                                                <input id="nis_responsavel" type="text" name="nis_responsavel"
                                                    placeholder="023456768500002456476" />
                                            </div>
                                            <button class="br-button secondary" type="button">
                                                <i class="fas fa-plus" style="padding-right: 20px; color: #2B982B;"></i>
                                                Incluir
                                            </button>
                                            <hr>
                                            <!-- Adicionar lista de atividades inseridas -->
                                        </div>

                                    </div>
                                </div>

                                <div class="br-card mb-6">

                                    <div class="br-content mb-6 mx-4">

                                        <div class="col-sm-12 mb-6">
                                            <div class="br-textarea large">
                                                <label for="textarea-observacao">Observação</label>
                                                <textarea id="textarea-observacao" placeholder="Digite a observacao"
                                                    name="observacao" required></textarea>
                                            </div>
                                        </div><br>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wizard-panel-btn">
                            <button class="br-button primary wizard-btn-next" type="submit">
                                <i class="fas fa-save" style="padding-right: 20px;"></i>
                                Salvar
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

@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="{{ asset('js/jquery.mask.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js"></script>

<script>
    $(document).ready(function () {
        $('input[id=check-state-checked]').change(function () {
            if ($(this).is(':checked')) {
                document.getElementById("botao-proximo").disabled = false;
                document.getElementById("proxima-pagina").disabled = false;
            } else {
                document.getElementById("botao-proximo").disabled = true;
                document.getElementById("proxima-pagina").disabled = true;
            }
        });
    });
</script>

<script>
    $(document).ready(function ($) {
        $("input[type=text]").keyup(function () {
            $(this).val($(this).val().toUpperCase());
        });
        $('#cnpj_executora').mask('00.000.000/0000-00', {
            reverse: true
        });
        $('#cpf_tecnico').mask('000.000.000-00', {
            reverse: true
        });

        $('#cpf_beneficiario').mask('000.000.000-00', {
            reverse: true
        });
    })
</script>

@endsection