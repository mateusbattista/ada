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
                    <div class="card-header d-flex align-items-center justify-content-between mb-2">
                        <h5 class="card-title d-sm-inline-block" style="color:#5992ED;">INCLUIR PÚBLICOS</h5>
                    </div>
                    <form action="{{ $slc_publicos ? route('publicosUpdateForm', $slc_publicos->id) : route('publicosCreate') }}"
                          method="post">
                            @csrf
                         @if($slc_publicos)
                            @method('put')
                         @endif
                        <div class="card-body">
                            <div class="form-group row">
                                <div class="col-sm-11 ml-3 mb-3">
                                    <div class="br-input small">
                                        <label for="nometipopublico">Tipo de Público</label>
                                        <input type="text" name="nometipopublico"
                                               value="{{ $slc_publicos ? $slc_publicos->nometipopublico : '' }}" required>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer mt-3">
                                <div class="card-footer mt-3">
                                    <div class="card-footer mt-3">
                                        <button type="submit" class="br-button primary mr-3"><i class="fas fa-save"
                                                                                                style="padding-right: 20px;"></i>
                                            Salvar
                                        </button>
                                        <a href="{{ route('publicosList') }}" class="br-button">Cancelar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection
