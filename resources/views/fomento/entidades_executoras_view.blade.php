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
                        <h5 class="card-title d-sm-inline-block" style="color:#1351b4;">Entidade Executora: {{$slc_entidadeExecutora->nome_fantasia}}</h5>
                    </div>

                    <form method="post" id="entidades_executora_form">
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
                                                        value='{{ $slc_entidadeExecutora->cnpj }}' disabled name="cnpj"
                                                        placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="sigla">Sigla da Entidade Executora:</label>
                                                    <input id="input-default" type="text"
                                                        value='{{ $slc_entidadeExecutora->sigla }}' disabled name="sigla"
                                                        placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="cep">CEP:</label>
                                                    <input id="input-default" value='{{ $slc_entidadeExecutora->cep }}'
                                                        disabled type="text" name="cep" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="endereco">Endereço:</label>
                                                    <input id="input-default" value='{{ $slc_entidadeExecutora->endereco }}'
                                                        disabled type="text" name="endereco" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="telefone">Telefone:</label>
                                                    <input id="input-default"
                                                        value='{{ $slc_entidadeExecutora->telefone_instituicao }}' disabled
                                                        name="telefone" type="text" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                                <div class="br-input">
                                                    <label for="email">E-mail:</label>
                                                    <input id="input-default"
                                                        value='{{ $slc_entidadeExecutora->email_instituicao }}' disabled
                                                        name="email_instituicao" type="text" placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    {{-- .termos --}}
                                    <div class="tab-panel" id="panel-3-count">
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-6">
                                            @if(!is_null($slc_documentos_comprobatorios_array))
                                                @foreach ($slc_documentos_comprobatorios_array as $documento_comprobatorio)
                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-3">
                                                            <a href="{{ Storage::url('fomento/entidade_executora/documentos_comprobatorios/'.$documento_comprobatorio) }}"
                                                                target="_blank">{{ $documento_comprobatorio }}</a>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            @endif
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
                                                @if ($slc_responsaveis_array)
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

                                        <a href="{{ route('entidadesExecutorasList') }}" class="br-button">Voltar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                @if($slc_habilitacao)
                <div class="container br-card">
                    <div class="card-header mb-2">
                        <h6 class="card-title d-sm-inline-block" style="color:#1351b4;font-weight:bold;">Situação / Avaliação</h6>
                        <hr>
                    </div>

                    <div class="card-content mr-12">
                        <form action="{{ route('habilitacaoExecutoraCreate') }}" method="post" id='habilitacao_executora_form' enctype="multipart/form-data">
                            @csrf
                            <div class="card-content mr-3"  style="background-color: #1351B414;">
                                <input name="executora_id" value="{{ $slc_entidadeExecutora->id }}" hidden />
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3">
                                        <div class="br-input">
                                            <label for="nome_completo">Nome do Avaliador:</label>
                                            <input id="input-default" type="text" name="nome_avaliador"
                                            value="{{ $slc_avaliacao ?  $slc_avaliacao->nome_avaliador : '' }}" placeholder="Nome" />
                                        </div>
                                    </div>
                                    <div class="col-sm-6 mb-3">
                                        <div class="br-input">
                                            <label for="nome_completo">Data Avaliação:</label>
                                            <input id="input-default" type="date" name="data_avaliacao"
                                            value="{{ $slc_avaliacao ?  $slc_avaliacao->data_avaliacao : '' }}"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-12 mb-3">
                                        <div class="br-select">
                                            <div class="br-input">
                                                <label for="select-simple">Situação / Avaliação do Fornecedor:</label>
                                                <input id="select-simple-situacao" type="text" name="situacao"
                                                    placeholder="Selecione o item" />
                                                <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1"
                                                    data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <div class="br-list" tabindex="0">
                                                <div class="br-item" tabindex="-1">
                                                    <div class="br-radio">
                                                        <input id="habilitada" type="radio" value="Habilitada"
                                                        @if($slc_avaliacao)
                                                            {{ $slc_avaliacao->situacao == 'Habilitada' ? 'checked' : '' }}
                                                        @endif
                                                        />
                                                        <label for="habilitada">Habilitada</label>
                                                    </div>
                                                </div>
                                                <div class="br-item" tabindex="-1">
                                                    <div class="br-radio">
                                                        <input id="desabilitada" type="radio" value="Desabilitada"
                                                        @if($slc_avaliacao)
                                                            {{ $slc_avaliacao->situacao == 'Desabilitada' ? 'checked' : '' }}
                                                        @endif
                                                        />
                                                        <label for="desabilitada">Desabilitada</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-12 mb-3">
                                        <div class="br-textarea large">
                                            <label for="textarea-justificativa">Justificativa:</label>
                                            <textarea id="textarea-justificativa" placeholder="Digite a justificativa" name="justificativa">{{ $slc_avaliacao ?  $slc_avaliacao->justificativa : '' }}</textarea>
                                        </div>
                                    </div>
                                </div>

                                @if(!is_null($slc_notas_tecnicas_array))
                                    @foreach ($slc_notas_tecnicas_array as $nota_tecnica)
                                        <div class="form-group row">
                                            <div class="col-sm-12 mb-1">
                                                <div class="scrimutilexemplo">
                                                    <button class="br-button circle small mb-1" type="button" id="{{ $nota_tecnica->id }}"><i class="fas fa-trash" aria-hidden="true" style="color: #E51010;"></i></button>
                                                    <a class="" href="{{ Storage::url('fomento/notas_tecnicas/'.$nota_tecnica->arquivo) }}" target="_blank">{{ $nota_tecnica->arquivo }}</a>
                                                </div>
                                                    
                                                <div class="br-scrim-util foco" id="modal-{{ $nota_tecnica->id }}" data-scrim="true" aria-hidden="true">
                                                    <div class="br-modal" >
                                                        <div class="br-modal-header"><strong>Excluir</strong></div>
                                                        <div class="br-modal-body">
                                                            <p>Deseja realmente excluir a nota <strong>{{ $nota_tecnica->arquivo }}</strong>?</p>
                                                            <div class="br-modal-footer justify-content-center">
                                                                <button class="br-button secondary" type="button" id="scrimfechar" data-dismiss="scrimexample">Cancelar</button>
                                                                <a href="{{ route('deletarNotaTecnica', $nota_tecnica->id) }}" 
                                                                    class="br-button primary mt-3 mt-sm-0 ml-sm-3">Sim
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                @endif

                                <div class="form-group row">
                                    <div class="col-sm-12 mb-3">
                                        <div class="br-upload">
                                        <label class="upload-label" for="multiple-files"><span>Anexar Nota Técnica</span></label>
                                        <input class="upload-input" id="multiple-files" name='nota_tecnica[]' type="file" multiple="multiple"/>
                                        <div class="upload-list"></div>
                                        </div>
                                        <p class="text-base mt-1">Clique ou arraste os arquivos para cima do componente Upload.</p>
                                    </div>
                                </div>

                            </div>
                            <div class="card-content mr-3">
                                <div class="d-flex">
                                    <div class="ml-auto">
                                        <button type="submit" class="br-button primary mr-3 mb-2">
                                            <i class="fas fa-save" style="padding-right: 20px;"></i>
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>

@endsection

@section('script')
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
