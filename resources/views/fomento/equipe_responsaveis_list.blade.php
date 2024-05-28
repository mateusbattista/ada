@extends('layouts.main-interno')

@section('title', 'Cadastro - Equipe')

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
                <p class="card-title d-sm-inline-block" style="color:#1351b4;">CADASTRO DA EQUIPE 
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
                <form action="{{ route('equipeResponsaveisCreate', $slc_tipoEquipe) }}" method="post" id='equipe_responsaveis_form'>
                    @csrf

                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-entidade">Orgão/Entidade</label>
                                    <input id="select-entidade" name="entidade" type="text" placeholder="..:: Selecione ::.." required/>
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0">
                                    @foreach ($slc_entidades as $entidade)
                                        <div class="br-item" tabindex="-1">
                                            <div class="br-radio">
                                                <input id="{{ $entidade }}" type="radio" name="entidade" value="{{ $entidade }}" required/>
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
                                <input id="input-default" type="text" placeholder="CPF" name="cpf" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="nome">Nome do Responsável</label>
                                <input id="input-default" type="text" placeholder="Nome do Responsável" name="nome" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-cargo">Cargo</label>
                                    <input id="select-cargo" name="cargo" type="text" placeholder="..:: Selecione ::.." required/>
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0">
                                    @foreach ($slc_cargos as $cargo)
                                        <div class="br-item" tabindex="-1">
                                            <div class="br-radio">
                                                <input id="{{ $cargo }}" type="radio" name="cargo" value="{{ $cargo }}" required/>
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
                                <input id="input-default" type="text" placeholder="E-mail" name="email" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-input">
                                <label for="telefone">Número do DDD/Telefone</label>
                                <input id="input-default" type="text" placeholder="Número do DDD/Telefone" name="telefone" required/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mb-3">
                            <div class="br-select">
                                <div class="br-input">
                                    <label for="select-funcao">Função</label>
                                    <input id="select-funcao" name="funcao" type="text" placeholder="..:: Selecione ::.." required/>
                                    <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="br-list" tabindex="0">
                                    @foreach ($slc_funcoes as $funcao)
                                        <div class="br-item" tabindex="-1">
                                            <div class="br-radio">
                                                <input id="{{ $funcao }}" type="radio" name="funcao" value="{{ $funcao }}" required/>
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
                                Adicionar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    {{-- .tb --}}
    <div class="br-card">
        <div class="card-header mb-2">
            <p class="card-title d-sm-inline-block" style="color:#000000;font-weight:bold;">
            @if ($slc_tipoEquipe == 'mds')
                Responsáveis MDS inseridas
            @elseif ($slc_tipoEquipe == 'gestora')
                Responsáveis da Gestora inseridos
            @elseif ($slc_tipoEquipe == 'executora')
                Responsáveis da Executora inseridos
            @elseif ($slc_tipoEquipe == 'tecnica')
                Lista de Técnicos da Equipe Técnica
            @else
            
            @endif
            </p>
        </div>
        <div class="br-table">
            <div class="table-header">
            </div>
            <table>
                <thead>
                    <tr>
                        <th class="table-head"></th>
                        <th class="table-head" style="font-weight:bold;">CPF</th>
                        <th class="table-head" style="font-weight:bold;">Nome</th>
                        <th class="table-head" style="font-weight:bold;">Cargo</th>
                        <th class="table-head" style="font-weight:bold;">Telefone</th>
                        <th class="table-head" style="font-weight:bold;">E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    @if ($slc_equipeResponsaveis)
                        @foreach ($slc_equipeResponsaveis as $slc_responsavel)
                            <tr>
                                <td data-th="Ações">
                                    <div class="scrimutilexemplo">
                                        <a href=" {{ route('equipeResponsaveisUpdateForm', $slc_responsavel->id) }} " class="br-button circle "><i class="fas fa-pen" aria-hidden="true"></i></a>
                                        <button class="br-button circle" type="button" id="{{ $slc_responsavel->id }}"><i class="fas fa-trash" aria-hidden="true"></i></button>
                                    </div>
                                        
                                    <div class="br-scrim-util foco" id="modal-{{ $slc_responsavel->id }}" data-scrim="true" aria-hidden="true">
                                        <div class="br-modal" >
                                            <div class="br-modal-header"><strong>Excluir</strong></div>
                                            <div class="br-modal-body">
                                                <p>Deseja realmente excluir o responsável <strong>{{ $slc_responsavel->nome }}</strong>?</p>
                                                <div class="br-modal-footer justify-content-center">
                                                    <button class="br-button secondary" type="button" id="scrimfechar" data-dismiss="scrimexample">Cancelar</button>
                                                    <form action=" {{ route('equipeResponsaveisDelete', $slc_responsavel->id) }} " method="post" id='equipe_responsaveis_delete'>
                                                        @csrf
                                                        @method('delete')
                                                        <button type="submit" class="br-button primary mt-3 mt-sm-0 ml-sm-3" type="button">
                                                            Sim
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td data-th="CPF">{{ $slc_responsavel->cpf }}</td>
                                <td data-th="Nome">{{ $slc_responsavel->nome }}</td>
                                <td data-th="Cargo">{{ $slc_responsavel->cargo }}</td>
                                <td data-th="Telefone">{{ $slc_responsavel->telefone }}</td>
                                <td data-th="E-mail">{{ $slc_responsavel->email }}</td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
        </div>

        <nav class="br-pagination small" aria-label="Paginação de resultados"
            data-total="{{ $slc_equipeResponsaveis->lastPage() }}"
            data-current="{{ $slc_equipeResponsaveis->currentPage() }}">
            <ul class="pagination">
                <li class="page-item {{ $slc_equipeResponsaveis->currentPage() == 1 ? 'disabled' : '' }}">
                    <a class="br-button circle"
                        href="{{ $slc_equipeResponsaveis->previousPageUrl() }}"><i class="fas fa-angle-left" aria-hidden="true"></i></a>
                </li>

                @for ($i = 1; $i <= $slc_equipeResponsaveis->lastPage(); $i++)
                    <li>
                        <a class="page {{ $slc_equipeResponsaveis->currentPage() == $i ? 'active' : '' }}"
                            href="{{ $slc_equipeResponsaveis->url($i) }}">{{ $i }}</a>
                    </li>
                @endfor

                <li class="page-item {{ $slc_equipeResponsaveis->currentPage() == $slc_equipeResponsaveis->lastPage() ? 'disabled' : '' }}">
                    <a class="br-button circle"
                        href="{{ $slc_equipeResponsaveis->nextPageUrl() }}"><i class="fas fa-angle-right" aria-hidden="true"></i></a>
                </li>
            </ul>
        </nav>

    </div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    for (const buttonBloco1 of window.document.querySelectorAll('.scrimutilexemplo button')) {
        buttonBloco1.addEventListener('click', () => {
            const scrscrim = window.document.querySelector('#modal-'+ buttonBloco1.id)
            const scrimfoco = new core.Scrim({
                closeElement: '#scrimfechar',
                trigger: scrscrim,
            })
            scrimfoco.showScrim()
        })
    }
</script>
@endsection