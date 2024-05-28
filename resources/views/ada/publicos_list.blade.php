@extends('layouts.main-interno')

@section('title', 'Cadastro - Entidade Executora')

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
                            <div class="text-weight-semi-bold text-up-02" style="color:#5992ED;">TIPOS DE PÚBLICOS</div>
                        </div>
                    </div>
                </div>
                <div class="card-content ml-6 mr-6">
                    <form action="{{ route('publicosList') }}" method="get" id='publicolist'>
                         @csrf 
                        <div class="form-group row">
                            <div class="col-sm-11 mb-3">
                                <label for="publico">Públicos</label>
                                <div class="br-input small">
                                    <input id="select-estado" type="text" name="nometipopublico"/>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12 mt-6">
                                <a class="br-button mr-3" href="{{ route('indexADA') }}"
                                   type="button">
                                    <i class="fas fa-arrow-left primary" style="padding-right: 20px;"></i>
                                    Voltar
                                </a>
                                <a class="br-button secondary mr-3"href="{{ route('publicosList') }}"
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
                        <span class="br-divider my-6" style="border-color:rgba(19, 81, 180, 1);"></span>
                        <div class="br-table">
                            <div class="top-bar">
                                <div class="table-title mb-4"></div>
                                 <a href="{{ route('publicosForm') }}" class="br-button mb-4" id="incluir-bnt">
                                    <i class="fas fa-plus" style="padding-right: 20px;"></i>
                                    Incluir
                                </a> 
                            </div>
                            <div class="table-header"></div>
                            <table>
                                <caption>Publicos</caption>
                                <thead>
                                    <tr>
                                        <th scope="col" class="col-sm-2"></th>
                                        <th scope="col" class="col-sm-10 table-head">Tipos de Publicos</th>
                                    </tr>
                                </thead>
                                <tbody>

                            @if($slc_publicos)
                            @foreach( $slc_publicos as $publico )
                                <tr>
                                <td data-th="Ações">
                                            <div class="scrimutilexemplo">
                                                <a href=" {{ route('publicosForm', $publico->id) }} " class="br-button circle "><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>
                                                <button class="br-button circle" type="button" id="{{ $publico->id }}"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>
                                            </div>
                                            
                                            <div class="br-scrim-util foco" id="modal-{{ $publico->id }}" data-scrim="true" aria-hidden="true">
                                                <div class="br-modal" >
                                                    <div class="br-modal-header"><strong>Excluir</strong></div>
                                                    <div class="br-modal-body">
                                                        <p>Deseja realmente excluir o publico {{ $publico->nometipopublico }}?</p>
                                                        <div class="br-modal-footer justify-content-center">
                                                            <button class="br-button secondary" type="button" id="scrimfechar" data-dismiss="scrimexample">Cancelar</button>
                                                            <a href="{{ route('publicosDelete', $publico->id) }}" class="br-button primary mt-3 mt-sm-0 ml-sm-3" >Sim</a>
                                                            {{-- <form action=" {{ route('publicosDelete', $publico->id) }} " method="post" id='publicodelete'>
                                                                @csrf 
                                                                @method('delete') 
                                                                <button class="br-button primary mt-3 mt-sm-0 ml-sm-3" type="submit" type="button">Sim</button>
                                                            </form> --}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-th="publico">{{ $publico->nometipopublico }}</td>
                                    </tr>
                            @endforeach
                            @elseif($publico)
                                    <tr>
                                        <td data-th="Ações"></td>
                                        <td data-th="publico">{{ $publico->nometipopublico }}</td>
                                    </tr> 
                            @else
                                    <p style="text-align: center" class="my-2">Nenhum item foi encontrado para a busca com os parâmetros solicitados !</p>
                            @endif 
                                </tbody>
                            </table>
                            <div class="table-footer">
                            <nav class="br-pagination small" aria-label="Paginação de resultados"
                                data-total="{{ $slc_publicos->lastPage() }}"
                                data-current="{{ $slc_publicos->currentPage() }}">
                                <ul class="pagination">
                                    <li class="page-item {{ $slc_publicos->currentPage() == 1 ? 'disabled' : '' }}">
                                        <a class="br-button circle"
                                            href="{{ $slc_publicos->previousPageUrl() }}"><i class="fas fa-angle-left" aria-hidden="true"></i></a>
                                    </li>

                                    @for ($i = 1; $i <= $slc_publicos->lastPage(); $i++)
                                        <li>
                                            <a class="page {{ $slc_publicos->currentPage() == $i ? 'active' : '' }}"
                                                href="{{ $slc_publicos->url($i) }}">{{ $i }}</a>
                                        </li>
                                    @endfor

                                    <li class="page-item {{ $slc_publicos->currentPage() == $slc_publicos->lastPage() ? 'disabled' : '' }}">
                                        <a class="br-button circle"
                                            href="{{ $slc_publicos->nextPageUrl() }}"><i class="fas fa-angle-right" aria-hidden="true"></i></a>
                                    </li>
                                </ul>
                            </nav>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
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
