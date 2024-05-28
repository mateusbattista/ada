@extends('layouts.main-interno')
@section('title', 'Fomento')
@section('line-header')
    @include('fomento.line-header')
@endsection
@section('nav-bar')
    @include('fomento.nav-bar')
@endsection
@section('content')

<div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
        <div class="col-lg-12 mb-4 order-0">
            <div class="br-card">
                <div class="card-header d-flex align-items-center justify-content-between mb-2">
                    <h5 class="card-title d-sm-inline-block" style="color:#5992ED;">INCLUIR PORTARIA</h5>
                </div>
                <form action="{{ $slc_portaria ? route('indexPortariaUpdate', $slc_portaria->id) : route('indexPortariaCreate') }}" method="post">
                      @csrf
                   @if($slc_portaria)
                      @method('put')
                   @endif
                  <div class="card-body">
                      <div class="form-group row">
                          <div class="col-sm-11 ml-3 mb-3">
                              <div class="br-input small">
                                  <label for="nomeportaria">Tipo de Portaria</label>
                                  <input type="text" name="nome_portarias" value="{{ $slc_portaria ? $slc_portaria->nome_portarias : '' }}" required>
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
                                  <a href="{{ route('indexPortaria') }}" class="br-button">Cancelar</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
                <!-- /.card-footer -->
            </div>
        </div>
    </div>
</div>

@endsection