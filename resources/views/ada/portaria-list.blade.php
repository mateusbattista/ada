@extends('layouts.main-interno')
@section('title', 'Fomento')
@section('line-header')
    @include('fomento.line-header')
@endsection
@section('nav-bar')
    @include('fomento.nav-bar')
@endsection
@section('content')

<div class="row">
    <div class="col-md">
        <div class="br-card ">
            <div class="card-header">
                <div class="d-flex">
                    <div class="ml-6">
                        <div class="text-weight-semi-bold text-up-02" style="color:#5992ED;">TIPOS DE PORTARIAS</div>
                    </div>
                </div>
            </div>
            <div class="card-content ml-6 mr-6">
                <form action="{{ route('indexPortaria') }}" method="get" id="portaria_form">
                    
                    @csrf
                
                    <div class="form-group row">
                        <div class="col-sm-12 mb-6">
                            <div class="br-input">
                                <label for="nome_portarias">Portaria</label>
                                <input id="nome_portarias" type="text" name="nome_portarias" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 mt-6">
                            <a class="br-button mr-3" href="{{ route('indexADA') }}" type="button">
                                <i class="fas fa-arrow-left primary" style="padding-right: 20px;"></i>
                                Voltar
                            </a>
                            <a class="br-button secondary mr-3" href="{{ route('indexPortaria') }}" type="button">
                                <i class="fa fa-trash" style="padding-right: 20px;"></i>
                                Limpar Busca
                            </a>
                            <button class="br-button primary active mr-3" type="submit" formmethod="get">
                                <i class="fas fa-search primary" style="padding-right: 20px;"> </i>
                                Consultar
                            </button>
                        </div>
                    </div>
                    <span class="br-divider my-6" style="border-color:rgba(19, 81, 180, 1);"></span>
                    <div class="br-table">
                        <div class="top-bar">
                            <div class="table-title mb-4"></div>
                            <a href="{{ route('indexPortariaForm') }}" class="br-button mb-4" id="incluir">
                                <i class="fas fa-plus" style="padding-right: 20px;"></i>
                                Incluir
                            </a>
                        </div>
                        <div class="table-header">
                        </div>
                        <table>
                            <caption>Portarias</caption>
                            <thead>
                                <tr>
                                    <th scope="col" class="col-sm-2"></th>
                                    <th scope="col" class="col-sm-10 table-head">Tipo de Portarias</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                @if($filtro_portarias)
                                    @foreach($filtro_portarias as $portaria)
                                        <tr>
                                            <td data-th="Ações">
                                                <div class="scrimutilexemplo">
                                                    <a href="{{ route('indexPortariaForm', $portaria->id) }}" class="br-button circle"><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>
                                                    <button class="br-button circle" type="button" id="{{ $portaria->id }}"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>
                                                </div>
                                    
                                                <div class="br-scrim-util foco" id="modal-{{ $portaria->id }}" data-scrim="true" aria-hidden="true">
                                                    <div class="br-modal" >
                                                        <div class="br-modal-header"><strong>Excluir</strong></div>
                                                        <div class="br-modal-body">
                                                            
                                                            <p>Deseja realmente excluir a portaria <b>{{ $portaria->nome_portarias }}</b>?</p>
                                                        </div>
                                                        <div class="br-modal-footer justify-content-center">
                                                            <button class="br-button secondary" type="button" id="scrimfechar" data-dismiss="scrimexample">Não
                                                            </button>
                                                            <a href="{{ route('indexPortariaDelete', $portaria->id) }}" class="br-button primary mt-3 mt-sm-0 ml-sm-3" >Sim</a>
                                                            {{-- <form action=" {{ route('indexPortariaDelete',  $portaria->id )}} " method="post" id="portarias_delete">
                                                                @csrf
                                                                @method('delete')
                                                                <button class="br-button primary mt-3 mt-sm-0 ml-sm-3" type="submit" type="button">
                                                                    Sim
                                                                </button>
                                                            </form> --}}
                                                        </div>
                                                    </div>
                                                </div>
  

                                            </td>
                                            <td data-th="evento">{{ $portaria->nome_portarias }}</td>
                                        </tr>
                                    @endforeach
                                @elseif($portaria)
                                    <tr>
                                        <td data-th="Ações">
                                        </td>
                                        <td data-th="evento">{{ $portaria->nome_portarias }}</td>
                                    </tr>
                                @else
                                    <p style="text-align: center" class="my-2">Nenhum item foi encontrado para a
                                        busca com os parâmetros solicitados !</p>
                                @endif
                                    </tbody>
                        </table>

                        <nav class="br-pagination small" aria-label="Paginação de resultados"
                            data-total="{{ $filtro_portarias->lastPage() }}"
                            data-current="{{ $filtro_portarias->currentPage() }}">
                            <ul class="pagination">
                                <li class="page-item {{ $filtro_portarias->currentPage() == 1 ? 'disabled' : '' }}">
                                    <a class="br-button circle"
                                        href="{{ $filtro_portarias->previousPageUrl() }}"><i class="fas fa-angle-left" aria-hidden="true"></i></a>
                                </li>

                                @for ($i = 1; $i <= $filtro_portarias->lastPage(); $i++)
                                    <li>
                                        <a class="page {{ $filtro_portarias->currentPage() == $i ? 'active' : '' }}"
                                            href="{{ $filtro_portarias->url($i) }}">{{ $i }}</a>
                                    </li>
                                @endfor

                                <li class="page-item {{ $filtro_portarias->currentPage() == $filtro_portarias->lastPage() ? 'disabled' : '' }}">
                                    <a class="br-button circle"
                                        href="{{ $filtro_portarias->nextPageUrl() }}"><i class="fas fa-angle-right" aria-hidden="true"></i></a>
                                </li>
                            </ul>
                        </nav>

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