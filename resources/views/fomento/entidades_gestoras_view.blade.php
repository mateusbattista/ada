@extends('layouts.main-interno')

@section('title', 'Fomento')

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


    <div class="container-xxl flex-grow-1 container-p-y">
        <div class="row">
            <div class="col-lg-12 mb-4 order-0 mx-auto">
                <div class="container br-card">

                    <div class="card-header mb-2">
                        <h5 class="card-title d-sm-inline-block" style="color:#1351b4;">Entidade Gestora: {{$slc_entidadeGestora->nome_fantasia}}</h5>
                    </div>

                    <form method="post" id="entidades_gestora_form">
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
                                        <li class="tab-item" title="Executoras">
                                            <button type="button" data-panel="panel-2-count" style="color:#1351b4;"><span
                                                    class="name">Entidades
                                                    Executoras Associadas</span></button>
                                        </li>
                                        <li class="tab-item" title="Documentação">
                                            <button type="button" data-panel="panel-3-count" style="color:#1351b4;"><span
                                                    class="name">Documentação</span></button>
                                        </li>
                                        <li class="tab-item" title="Responsáveis">
                                            <button type="button" data-panel="panel-4-count" style="color:#1351b4;"><span
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
                                                    <input id="input-default" type="text"
                                                        value='{{ $slc_entidadeGestora->cnpj }}' disabled name="cnpj"
                                                        placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="nome_completo">Nome da Entidade Gestora:</label>
                                                    <input id="input-default"
                                                        value='{{ $slc_entidadeGestora->nome_fantasia }}' disabled
                                                        type="text" name="nome_fantasia" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="sigla">Sigla da Entidade Gestora:</label>
                                                    <input id="input-default" type="text"
                                                        value='{{ $slc_entidadeGestora->sigla }}' disabled name="sigla"
                                                        placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="cep">CEP:</label>
                                                    <input id="input-default" value='{{ $slc_entidadeGestora->cep }}'
                                                        disabled type="text" name="cep" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="endereco">Endereço:</label>
                                                    <input id="input-default" value='{{ $slc_entidadeGestora->endereco }}'
                                                        disabled type="text" name="endereco" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="telefone">Telefone:</label>
                                                    <input id="input-default"
                                                        value='{{ $slc_entidadeGestora->telefone_instituicao }}' disabled
                                                        name="telefone" type="text" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="email">E-mail:</label>
                                                    <input id="input-default"
                                                        value='{{ $slc_entidadeGestora->email_instituicao }}' disabled
                                                        name="email_instituicao" type="text" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {{-- .entidadesExecutoras --}}
                                    <div class="tab-panel" id="panel-2-count">
                                        <table class="mb-4">
                                            <thead>
                                                <tr>
                                                    <th class="table-header"></th>
                                                    <th class="table-header">CNPJ</th>
                                                    <th class="table-header">Nome da Entidade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @if ($slc_executoras_array[0])
                                                    @foreach ($slc_executoras_array as $executora)
                                                        <tr>
                                                            <td></td>
                                                            <td>{{ $executora->cnpj }}</td>
                                                            <td>{{ $executora->sigla }}</td>
                                                        </tr>
                                                    @endforeach
                                                @endif
                                            </tbody>
                                        </table>
                                    </div>

                                    {{-- .termos --}}
                                    <div class="tab-panel" id="panel-3-count">
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-upload">
                                                    <label class="upload-label" for="single-file">
                                                        <span>Documentos Comprobatório</span></label>
                                                    <input class="upload-input" id="single-file"
                                                        name='documentos_comprobatorios' type="file" />
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
                                    <div class="tab-panel" id="panel-4-count">
                                        <table class="mb-4">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="table-header"></th>
                                                    <th scope="col" class="table-header">Nome</th>
                                                    <th scope="col" class="table-header">CPF</th>
                                                    <th scope="col" class="table-header">Cargo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @if ($slc_responsaveis_array[0])
                                                    @foreach ($slc_responsaveis_array as $responsavel)
                                                        <tr>
                                                            <td></td>
                                                            <td>{{ $responsavel->nome }}</td>
                                                            <td>{{ $responsavel->cpf }}</td>
                                                            <td>{{ $responsavel->cargo }}</td>
                                                        </tr>
                                                    @endforeach
                                                @endif
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex">
                                    <div class="ml-auto"> <!-- /.card-body -->

                                        <a href="{{ route('EntidadesGestorasList') }}" class="br-button">Voltar</a>
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
                cnpjCell.textContent = item.name;
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
@endsection
