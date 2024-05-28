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
                        <h5 class="card-title d-sm-inline-block" style="color:#1351b4;">CADASTRO DE ENTIDADES EXECUTORAS</h5>
                    </div>

                    <form method="post" action="{{ route('entidadesExecutorasCreate') }}" id="entidades_executora_form" enctype="multipart/form-data">
                        @csrf
                        <div class="card-content mr-3">
                            <div class="br-tab" data-counter="true">

                                {{-- optionsContent/all --}}
                                <nav class="tab-nav">
                                    <ul>
                                        <li class="tab-item is-active" title="Dados">
                                            <button type="button" data-panel="panel-1-count" style="color:#1351b4;"><span
                                                    class="name">Dados da
                                                    Instituição</span></button>
                                        </li>
                                        <li class="tab-item" title="Documentação">
                                            <button type="button" data-panel="panel-2-count" style="color:#1351b4;"><span
                                                    class="name">Documentação</span></button>
                                        </li>
                                        <li class="tab-item" title="Responsáveis">
                                            <button type="button" data-panel="panel-3-count" style="color:#1351b4;"><span
                                                    class="name">Responsáveis Associados</span></button>
                                        </li>
                                    </ul>
                                </nav>

                                <div class="tab-content">

                                    {{-- .dadosInstituicao --}}
                                    <div class="tab-panel active" id="panel-1-count">

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="nome_completo">CNPJ:</label>
                                                    <input id="cnpj" type="text" name="cnpj" placeholder="132365.6589.225/0001-02" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="nome_completo">Nome da Entidade Executora:</label>
                                                    <input id="nome_fantasia" type="text" name="nome_fantasia" placeholder="Nome da entidade" required/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="nome_completo">Sigla da Entidade Executora:</label>
                                                    <input id="sigla" type="text" name="sigla" placeholder="sigla" required/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-6 mb-3">
                                                <div class="br-select">
                                                    <div class="br-input">
                                                        <label for="select-estado">Estado:</label>
                                                        <input id="select-estado" type="text" name="estado" placeholder="..:: Selecione ::.." required/>
                                                        <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
                                                        </button>
                                                    </div>

                                                    <div class="br-list" tabindex="0">
                                                        @foreach ($slc_estados as $estado)
                                                            <div class="br-item" tabindex="-1">
                                                                <div class="br-radio">
                                                                    <input id="{{ $estado->sigla }}" type="radio" name="estado" value="{{ $estado->sigla }}" />
                                                                    <label for="{{ $estado->sigla }}">{{ $estado->estado }}</label>
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
                                                        <input id="select-municipio" name="municipio" type="text" placeholder="..:: Selecione ::.." required/>
                                                        <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger">
                                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                        </button>
                                                    </div>

                                                    <div class="br-list" tabindex="0">
                                                        @foreach ($slc_municipios as $municipio)
                                                            <div class="br-item" tabindex="-1">
                                                                <div class="br-radio">
                                                                    <input id="{{ $municipio->ibge }}" type="radio" name="municipio" value="{{ $municipio->ibge }}" />
                                                                    <label for="{{ $municipio->ibge }}">{{ $municipio->nome }}</label>
                                                                </div>
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="cep">CEP:</label>
                                                    <input id="input-default" type="text" name="cep" placeholder="55555-555" required/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="endereco">Endereço:</label>
                                                    <input id="input-default" type="text" name="endereco" placeholder="endereço" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="telefone">Telefone:</label>
                                                    <input id="input-default" name="telefone" type="text" placeholder="telefone" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="email">E-mail:</label>
                                                    <input id="input-default" name="email_instituicao" type="text" placeholder="exemplo@exemplo.com" required/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {{-- .termos --}}
                                    <div class="tab-panel" id="panel-2-count">
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-upload">
                                                    <label class="upload-label" for="multiple-file">
                                                        <span>Documentos Comprobatório</span></label>
                                                    <input class="upload-input" id="multiple-file"
                                                        name='documentos_comprobatorios[]' type="file" multiple="multiple"/>
                                                    <div class="upload-list"></div>
                                                </div>
                                                <p class="text-base mt-1">Clique ou arraste os arquivos para
                                                    cima do
                                                    componente
                                                    Upload.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {{-- .responsaveisAssociados --}}
                                    <div class="tab-panel" id="panel-3-count">
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-select" multiple="multiple">
                                                    <div class="br-input">
                                                        <label for="select-multtiple">CPF</label>
                                                        <input id="select-multtiple" multiple="multiple" type="text"
                                                            name="cpf_responsavel" placeholder="Selecione o item" />
                                                        <button class="br-button" type="button"
                                                            aria-label="Exibir lista" tabindex="-1"
                                                            data-trigger="data-trigger"><i class="fas fa-angle-down"
                                                                aria-hidden="true"></i>
                                                        </button>
                                                    </div>

                                                    <div class="br-list" tabindex="0">
                                                        @foreach ($slc_responsaveis as $responsavel)
                                                            <div class="br-item" tabindex="-1">
                                                                <div class="br-checkbox">
                                                                    <input id="{{ $responsavel->cpf }}"
                                                                        value="{{ $responsavel->id }}"
                                                                        name="responsaveis_id[]" type="checkbox" />
                                                                    <label
                                                                        for="{{ $responsavel->cpf }}">{{ $responsavel->nome }}
                                                                        - {{ $responsavel->cpf }}</label>
                                                                </div>
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="ml-auto mb-4">
                                                <a href="{{ route('responsaveisForm') }}" class="br-button">Cadastrar Responsável</a>
                                                <button class="br-button mr-3 primary" onclick="adicionarExecutoras()"
                                                    type="button"> <i class="fas fa-plus"></i> Adicionar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr>
                            <div class="card-footer">
                                <div class="d-flex">
                                    <div class="ml-auto">
                                        <!-- /.card-body -->
                                        <button type="submit" class="br-button primary mr-3">
                                            <i class="fas fa-save" style="padding-right: 20px;"></i>
                                            Salvar
                                        </button>
                                        <a href="{{ route('entidadesExecutorasList') }}" class="br-button">Cancelar</a>
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
    <script>
        function adicionarExecutoras() {
            const selectedItems = document.querySelectorAll(".br-select input[type='checkbox']:checked");
            const table = document.getElementById("tabelaExecutoras");

            for (const item of selectedItems) {
                console.log(item)
                const row = document.createElement("tr");

                const actionCell = document.createElement("td");
                actionCell.textContent = "";

                const ufCell = document.createElement("td");
                ufCell.textContent = item.value;

                const nomeCell = document.createElement("td");
                nomeCell.textContent = item.value;
                // Create and set content for CNPJ cell based on actual data (e.g., item.cnpj)
                const cnpjCell = document.createElement("td");
                cnpjCell.textContent = item.id;
                console.log(item) // Replace item with appropriate data point

                // Create and set content for hidden CNPJ input
                const hiddenCnpjInput = document.createElement("input");
                hiddenCnpjInput.type = "hidden";
                hiddenCnpjInput.name = "programa";
                hiddenCnpjInput.value = item.cnpj; // Replace item with appropriate data point
                cnpjCell.appendChild(hiddenCnpjInput);

                // Repeat the above pattern for other data points (Estado, Nome da Entidade)
                // ...
                row.appendChild(actionCell)
                row.appendChild(cnpjCell);

                row.appendChild(nomeCell);



                const fragment = document.createDocumentFragment();
                fragment.appendChild(row);
                table.appendChild(fragment);
            }
        }
    </script>

<script src="{{ asset('js/jquery.mask.js') }}"></script>
<script>
    $(document).ready(function ($) {
        $('#cnpj').mask('00.000.000/0000-00', {
            reverse: true
        });
    })
</script>
@endsection
