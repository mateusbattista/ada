@extends('layouts.main-interno')

@section('title', 'Cadastro - Entidade Executora')

@section('line-header')
    @include('ada.line-header')
@endsection

@section('nav-bar')
    @include('ada.nav-bar')
@endsection

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
        <div class="col-lg-12 mb-4 order-0">
            <div class="br-card">
                <div class='f"card-header d-flex align-items-center justify-content-between mb-2 '>
                    <h5 class="card-title d-sm-inline-block ml-6"  style="color:#5992ED;">SOLICITAÇÃO DE ADESÃO AO ADA</h5>
                </div>
                <span class="br-divider sm my-3"></span>
                <div class="card-content ml-6 mr-6">
                    <form method="post"  action="{{ $ada_solicitacao ? route('solicitacaoUpdateForm', $ada_solicitacao->id) : route('solicitacaoCreate') }}">
                        @csrf
                        @if($ada_solicitacao)
                            @method('put')
                        @endif
                        <div class="card-body">
                            <div class="header-subtitle"><strong style="color:#1351B4;">Dados do Solicitante da Ação de Distribuição de Cestas Emergenciais</strong></div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="name">Nome Completo</label>
                                        <input type="text" name="name"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->name : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="funcao">Função <s>*</s></label>
                                        <input type="text" name="funcao"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->funcao : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="cpf1">CPF</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="emailsolicitante">E-email</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="telefone1">Telefone</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="estado">Estado</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="municipio">Município (UF)</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="cep1">CEP</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="enderecosolicitante">Endereço</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="numerosolicitante">Número</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="complementosolicitante">Complemento</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="bairrosolicitante">Bairro</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>

                            <br>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Informações Gerais do Ente Federativo</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="estado">Estado</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="municipio">Município (UF)</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="cnpjprefeitura">CNPJ da Prefeitura:</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="emailprefeitura">E-mail</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="cep2">CEP</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="enderecoprefeitura">Endereço</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="numeroprefeitura">Número</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="complementoprefeitura">Complemento</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="bairroprefeitura">Bairro</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Informações do Prefeito(a) ou Governador(a)</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="nomeprefeito">Nome Completo</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="telefone2">Telefone</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="cpf2">CPF</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="rgprefeito">RG</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="orgaorgprefeito">Órgão Emissor do RG</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="ufrgprefeito">UF Emissora do RG</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="emailprefeito">E-mail</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Quantidade de Cestas Emergenciais
                                    Pleiteadas</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="quantidadecestas">Número de Cestas <s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Local de Armazenamento das Cestas</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="nomelocalarmazenamento">Nome do Local<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="estado">Estado</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="municipio">Município (UF)</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="cep3">CEP<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="enderecoarmazenamento">Endereço<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="numeroarmazenamento">Número<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="complementoarmazenamento">Complemento</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="bairroarmazenamento">Bairro<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Dados do Órgão de Controle Social</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="nomelocalcontrolesocial">Nome do Local<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="estado">Estado</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="municipio">Município (UF)</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="cep4">CEP<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="enderecocontrolesocial">Endereço<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="numerocontrolesocial">Número<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="complementocontrolesocial">Complemento</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="bairrocontrolesocial">Bairro<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="telefone3">Telefone<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="telefone4">Telefone<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="emailcontrolesocial">E-mail<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="dirigentecontrolesocial">Diretor/representante<s>*</s></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Arquivos</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-12 my-6">
                                    <div class="br-upload">
                                        <label class="upload-label" for="multiple-files"><span>Termo de Adesão assinado </span></label>
                                        <input class="upload-input" id="single-file" name="arquivo" type="file"/>
                                        <div class="upload-list"></div>
                                    </div>
                                    <p class="text-base mt-1">Clique ou arraste os arquivos para cima do componente Upload.</p>
                                </div>
                            </div>
                            {% if  solicitacaoada.arquivo %}
                            <div class="br-table">
                                <div class="table-header">
                                    <div class="top-bar">
                                        <div class="table-title mb-4"></div>
                                    </div>
                                </div>

                                <table>
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" class="table-head">Nome do Arquivo</th>
                                        <th scope="col" class="table-head">Tipo do Documento</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td data-th="Ações">
                                            <a href="#" target="_blank"
                                               class="br-button"> <i class="fas fa-eye" aria-hidden="true"></i></a>
                                            <a class="br-button circle" data-toggle="modal"
                                               data-target="#solicitacaoada#"><i
                                                    class="fas fa-trash-alt"
                                                    aria-hidden="true"></i></a>
                                            <div class="br-scrim-util foco" id="solicitacaoada#"
                                                 data-scrim="true">
                                                <div class="br-modal">
                                                    <div class="br-modal-header">
                                                        <strong>Excluir</strong>
                                                    </div>
                                                    <div class="br-modal-body">
                                                        <p>Deseja realmente excluir
                                                            <strong>{#</strong>
                                                            ?</p>
                                                    </div>
                                                    <div class="br-modal-footer justify-content-center">
                                                        <a class="br-button mr-3"
                                                           href="#"
                                                           type="button">
                                                            Não
                                                        </a>
                                                        <a class="br-button primary mr-3"
                                                           href="#"
                                                           type="button">
                                                            Sim
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td data-th="">#</td>
                                        <td data-th="">#</td>
                                        <td data-th="">Termo de Adesão Assinado</td>
                                    </tr>
                                    {#                                                                        {% endfor %}#}
                                    </tbody>
                                </table>
                                {% endif %}
                            </div>
                            <br>
                            <br>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Portaria</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="portaria"></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Evento</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="evento"></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Público</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="publico"></label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="header-subtitle"><strong style="color:#1351B4;">Parecer</strong>
                            </div>
                            <span class="br-divider sm my-3"></span>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-input small">
                                        <label for="situacao">Situação do Parecer</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-11 col-lg-11 mb-3">
                                    <div class="br-textarea">
                                        <label for="observacao">Descrição do Parecer</label>
                                        <input type="text" name="cpf1"
                                               value="{{ $ada_solicitacao ? $ada_solicitacao->cpf1 : '' }}" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer mt-3">
                            <div class="card-footer mt-3">
                                <div class="card-footer mt-3">
{{--                                    {% if form.errors %}--}}
{{--                                    {% for field in form %}--}}
{{--                                    {% for error in field.errors %}--}}

{{--                                    <div class="br-message danger" role="alert">--}}
{{--                                        <div class="icon"><i class="fas fa-times-circle fa-lg"--}}
{{--                                                             aria-hidden="true"></i>--}}
{{--                                        </div>--}}
{{--                                        <div class="content"><span--}}
{{--                                                class="message-title">Erro no campo {{ field.label }}.</span><span--}}
{{--                                                class="message-body"> {{ error }}</span>--}}
{{--                                        </div>--}}
{{--                                        <div class="close">--}}
{{--                                            <button class="br-button circle small" type="button"--}}
{{--                                                    aria-label="content"><i--}}
{{--                                                    class="fas fa-times" aria-hidden="true"></i>--}}
{{--                                            </button>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                    {% endfor %}--}}
{{--                                    {% endfor %}--}}
{{--                                    {% endif %}--}}
                                    <button type="submit" class="br-button primary mr-3"><i class="fas fa-save"
                                                                                            style="padding-right: 20px;"></i>
                                        Salvar
                                    </button>
                                    <a href="{% url 'solicitacao' %}" class="br-button">Cancelar</a>
                                </div>                  <!-- /.card-footer -->
                            </div>
                        </div>                  <!-- /.card-footer -->
                    </form>
                </div>

                <!-- /.card-footer -->
            </div>
        </div><!-- /.card-footer -->
    </div>
</div>
@endsection
