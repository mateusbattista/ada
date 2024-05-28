@extends('layouts.main-interno')

@section('title', 'Solicitação')

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
                <div class="d-flex">
                    <div class="ml-6">
                        <div class="text-weight-semi-bold text-up-02" style="color:#5992ED;">SOLICITAÇÃO DE ADESÃO AO ADA</div>
                    </div>
                </div>
            </div>
            <div class="card-content ml-6 mr-6">
                <form method="get" id="solicitacao_filtro_form" action="{{ route('solicitacaoList') }}" >
                    @csrf
                    <div class="form-group row">
                        <div class="col-sm-11 mb-3">
                            <label for="name">Nome Solicitante</label>
                            <div class="br-input small">
                                <input id="solicitacao-name" type="text" name="name"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 mb-3">
                            <label for="cpfsolicitante">CPF do Solicitante</label>
                            <div class="br-input small">
                                <input id="cpfsolicitante" type="text" name="cpfsolicitante"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 mb-3">
                            <label for="nomeprefeito">Nome Prefeito</label>
                            <div class="br-input small">
                                <input id="nomeprefeito" type="text" name="nomeprefeito"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 mb-3">
                            <label for="cpfprefeito">CPF Prefeito</label>
                            <div class="br-input small">
                                <input id="cpfprefeito" type="text" name="cpfprefeito"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 mb-3">
                            <label for="ibge">IBGE</label>
                            <div class="br-input small">
                                <input id="ibge" type="text" name="ibge"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 col-lg-11 mb-3">
                            <div class="br-input small">
                                <label for="estado">Estado</label>
                                <input id="estado" type="text" name="estado"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 col-lg-11 mb-3">
                            <div class="br-input small">
                                <label for="municipio">Município (UF)</label>
                                <input id="municipio" type="text" name="municipio"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 mb-3">
                            <label for="situacao">Situação</label>
                            <div class="br-input small">
                                <input id="situacao" type="text" name="situacao"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-11 mb-3">
                            <label for="ntermo">Aceito?</label>
                            <div class="br-input small">
                                <input id="ntermo" type="text" name="ntermo"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mt-6">
                            <a class="br-button mr-3" href="{{route('indexADA')}}"
                               type="button">
                                <i class="fas fa-arrow-left primary" style="padding-right: 20px;"></i>
                                Voltar
                            </a>
                            <a class="br-button secondary mr-3"href="{{route('solicitacaoList')}}"
                               type="button">
                                <i class="fa fa-trash" style="padding-right: 20px;"></i>
                                Limpar Busca
                            </a>
                            <button class="br-button primary active mr-3" type="submit" formmethod="get">
                                <i class="fas fa-search primary" style="padding-right: 20px;"></i>
                                Consultar
                            </button>
                        </div>
                    </div>
                    <span class="br-divider my-6" style="border-color:rgba(19, 81, 180, 1);
                        ;"></span>
                    <div class="br-table">
                        <div class="table-header">
                            <div class="top-bar">
                                <div class="table-title mb-3">SOLICITAÇÕES DE ADESÃO</div>
                                <a href="{{route('solicitacaoForm')}}" class="br-button mb-3"><i class="fas fa-plus" style="padding-right: 20px;"></i>Incluir</a>
                            </div>
                        </div>
                        <table>
                            <caption>SOLICITAÇÕES DE ADESÃO</caption>
                            <thead>
                                <tr>
                                    <th scope="col" class="table-head"></th>
                                    <th scope="col" class="table-head"></th>
                                    <th scope="col" class="table-head">IBGE</th>
                                    <th scope="col" class="table-head">UF</th>
                                    <th scope="col" class="table-head">Município</th>
                                    <th scope="col" class="table-head">CPF(Solicitante)</th>
                                    <th scope="col" class="table-head">Nome(Solicitante)</th>
                                    <th scope="col" class="table-head">Nº Cestas</th>
                                    <th scope="col" class="table-head">Função</th>
                                    <th scope="col" class="table-head">Solicitado em</th>
                                    <th scope="col" class="table-head">Situação</th>
                                    <th scope="col" class="table-head">Aceito?</th>
                                    <th scope="col" class="table-head">Solicitações</th>
                                    <th scope="col" class="table-head">Nome Prefeito</th>
                                </tr>
                            </thead>
                            <tbody>
                            @if($solicitacoes)
                            @foreach($solicitacoes as $solicitacao)
                            <tr>
                                <td data-th="Ações">
                                    <a href="{{route('solicitacaoUpdateForm', $solicitacao->id)}}"
                                       class="br-button"><i
                                            class="fas fa-pen" aria-hidden="true"></i></a>
                                </td>
                                @if($solicitacao->arquivo)
                                <td data-th="link">
                                    <a href="" target="_blank" class="br-button"><i class="fas fa-eye" aria-hidden="true"></i></a>
                                </td>
                                @else
                                <td data-th="link">
                                </td>
                                @endif
                                <td data-th="ibge">{{ $solicitacao->ibge }}</td>
                                <td data-th="ufprefeitura">{{ $solicitacao->ufrgprefeito }}</td>
                                <td data-th="nomemunicipio">{{ $solicitacao->municipio_solicitante }}</td>
                                <td data-th="cpfsolicitante">{{ $solicitacao->cpfsolicitante }}</td>
                                <td data-th="name">{{ $solicitacao->name }}</td>
                                <td data-th="quantidadecestas">{{ $solicitacao->quantidadecestas }}</td>
                                <td data-th="funcao">{{ $solicitacao->funcao }}</td>
                                <td data-th="data_publicacao_dou">{{ $solicitacao->data_publicacao_dou }}</td>
                                <td data-th="situacao">{{ $solicitacao->situacao }}</td>
                                <td data-th="ntermo">{{ $solicitacao->ntermo }}</td>
                                <td data-th="qtdsolicitacoes">{{ $solicitacao->ibge }}</td>
                                <td data-th="nomeprefeito">{{ $solicitacao->nomeprefeito }}</td>
                            </tr>
                            @endforeach
                            @else
                            <p style="text-align: center" class="my-2">Não encontramos nenhum dado para a
                                pesquisa realizada !</p>
                            @endif
                            </tbody>
                        </table>
                        <div class="table-footer">

                            <nav class="br-pagination" aria-label="Paginação de resultados">
                                <div class="pagination-arrows ml-auto ml-sm-0">


                                    <a class="br-button circle"
                                       href=""
                                       aria-label="Voltar página">
                                        <i class="fas fa-angle-left" aria-hidden="true"></i>
                                    </a>

                                    <div class="pagination-information d-none d-sm-flex"><span
                                            class="current"></span><span
                                            class="per-page"></span>&nbsp;de&nbsp;<span
                                            class="total"></span>&nbsp;páginas
                                    </div>

                                    <a class="br-button circle"
                                       href=""
                                       aria-label="Avançar página">
                                        <i class="fas fa-angle-right" aria-hidden="true"></i>
                                    </a>

                                </div>
                            </nav>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<script src="{% static '@govbr-ds/core/dist/core.js' %}"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
<script>
    $(document).ready(function() {
        $('.cpf').mask('000.000.000-00');
    });
</script>
<script>
    $("input[type=text]").keyup(function () {
        $(this).val($(this).val().toUpperCase());
    });
</script>

@endsection


