@extends('layouts.main-interno')

@section('title', 'Editar - Equipe')

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
                <p class="card-title d-sm-inline-block" style="color:#1351b4;">EDITAR EQUIPE 
                @if ($slc_tipoEquipe == 'mds')
                    DA UNIÃO
                @elseif ($slc_tipoEquipe == 'gestora')
                    GESTORA
                @elseif ($slc_tipoEquipe == 'executora')
                    EXECUTORA
                @elseif ($slc_tipoEquipe == 'tecnica')
                    TÉCNICA
                @else
                
                @endif
            </p>
                <hr style="margin-top:-10px;">
            </div>
            
            <div class="container" style="margin-top:30px;">
                <form action="{{ route('equipeResponsaveisUpdate', $slc_responsavel->id) }}" method="post" id='equipe_responsaveis_form'>
                    @csrf
                    @method('put')
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-entidade">Orgão/Entidade</label>
                                    <input id="select-entidade" name="entidade" value="{{ $slc_responsavel->entidade }}" type="text" required/>
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0">
                                    @foreach ($slc_entidades as $entidade)
                                        <div class="br-item" tabindex="-1">
                                            <div class="br-radio">
                                                <input id="{{ $entidade }}" type="radio" name="entidade" value="{{ $entidade }}"
                                                    {{ $entidade == $slc_responsavel->entidade ? 'checked' : '' }} />
                                                <label for="{{ $entidade }}">{{ $entidade }}</label>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="cpf">Número CPF</label>
                                <input id="input-default" value="{{ $slc_responsavel->cpf }}" type="text" placeholder="CPF" name="cpf" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="nome">Nome do Responsável</label>
                                <input id="input-default" value="{{ $slc_responsavel->nome }}" type="text" placeholder="Nome do Responsável" name="nome" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-cargo">Cargo</label>
                                    <input id="select-cargo" name="cargo" type="text" required/>
                                    <button class="br-button" value="{{ $slc_responsavel->cargo }}" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0">
                                    @foreach ($slc_cargos as $cargo)
                                        <div class="br-item" tabindex="-1">
                                            <div class="br-radio">   
                                                <input id="{{ $cargo }}" type="radio" name="cargo" value="{{ $cargo }}" 
                                                    {{ $cargo == $slc_responsavel->cargo ? 'checked' : '' }} />
                                                <label for="{{ $cargo }}">{{ $cargo }}</label>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="email">E-mail</label>
                                <input id="input-default" value="{{ $slc_responsavel->email }}" type="text" placeholder="E-mail" name="email" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="telefone">Número do DDD/Telefone</label>
                                <input id="input-default" value="{{ $slc_responsavel->telefone }}" type="text" placeholder="Número do DDD/Telefone" name="telefone" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-funcao">Função</label>
                                    <input id="select-funcao" name="funcao" value="{{ $slc_responsavel->funcao }}" type="text" required/>
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0">
                                    @foreach ($slc_funcoes as $funcao)
                                        <div class="br-item" tabindex="-1">
                                            <div class="br-radio">
                                                <input id="{{ $funcao }}" type="radio" name="funcao" value="{{ $funcao }}" 
                                                    {{ $funcao == $slc_responsavel->funcao ? 'checked' : '' }} />
                                                <label for="{{ $funcao }}">{{ $funcao }}</label>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="ml-auto">
                            <button type="submit" class="br-button primary mr-3">
                                <i class="fas fa-plus" style="padding-right: 20px;"></i>
                                Atualizar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
@endsection
