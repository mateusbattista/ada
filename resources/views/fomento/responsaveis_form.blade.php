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
            <div class="col-lg-12 mb-4 order-0 mx-auto">
                <div class="container br-card">

                    <div class="card-header mb-2">
                        <h5 class="card-title d-sm-inline-block" style="color:#1351b4;">CADASTRO DE RESPONSÁVEIS</h5>
                    </div>

                    <form method="post" action="{{ route('responsaveisCreate') }}" id="responsaveis_form">
                        @csrf
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3">
                                <div class="br-select">
                                    <div class="br-input">
                                        <label for="select-entidade">Entidade:</label>
                                        <input id="select-entidade" name="entidade" type="text" placeholder="..:: Selecione ::.." />
                                        <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </button>
                                    </div>

                                    <div class="br-list" tabindex="0">
                                        @foreach ($slc_entidades as $entidade)
                                            <div class="br-item" tabindex="-1">
                                                <div class="br-radio">
                                                    <input id="{{ $entidade }}" type="radio" name="entidade" value="{{ $entidade }}" />
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
                                    <label for="nome">Nome do Responsável</label>
                                    <input id="input-default" type="text" placeholder="Nome do Responsável" name="nome" required/>
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
                                    <label for="cargo">Cargo</label>
                                    <input id="input-default" type="text" placeholder="Cargo" name="cargo" required/>
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
                                <div class="br-input">
                                    <label for="funcao">Função</label>
                                    <input id="input-default" type="text" placeholder="Função" name="funcao" required/>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="ml-auto">
                                <button type="submit" class="br-button primary mr-3">
                                    <i class="fas fa-save" style="padding-right: 20px;"></i>
                                    Salvar
                                </button>
                                <a href="{{ route('indexFomento') }}" class="br-button">Cancelar</a>
                            </div>
                        </div>
                    </form>
                    <br>
                </div>
            </div>
        </div>
    </div>

@endsection
@section('script')
    <script>
        const selectList = []
        const notFoundElement = `
<div class="br-item not-found">
<div class="container">
<div class="row">
<div class="col">
<p><strong>Ops!</strong> Não encontramos o que você está procurando!</p>
</div>
</div>
</div>
</div>
`
        for (const brSelect of window.document.querySelectorAll('.br-select')) {
            const brselect = new core.BRSelect('br-select', brSelect, notFoundElement)
            //Exemplo de uso de listener do select
            brSelect.addEventListener('onChange', function(e) {})
            selectList.push(brselect)
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
@endsection