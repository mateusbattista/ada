$(document).ready(function ($) {
    $("input[type=text]").keyup(function () {
        $(this).val($(this).val().toUpperCase());
    });

    $('#id_cep').mask('00000-000');
    $('#id_cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('#id_cpf').mask('000.000.000-00', {reverse: true});
    $('#id_cpf_informante').mask('000.000.000-00', {reverse: true});
    $('#id_telefone_instituicao').mask('(00) 00000-0000')
    $('#id_fax').mask('(00) 00000-0000')
    $('#id_telefone_responsavel').mask('(00) 00000-0000')

    $("#id_entidade_form input").on('change', function () {
        var allFieldsFilled = true;

        $('#id_entidade_form input[required]').each(function () {
            if ($(this).val() === '') {
                allFieldsFilled = false;
                return false;
            }
        });

        if (allFieldsFilled) {
            $('#form_submit').removeAttr('disabled');
            $('#step2').removeAttr('disabled');
        } else {
            $('#form_submit').attr('disabled', 'disabled');
            $('#step2').attr('disabled', 'disabled');
        }

    });

    $("div[class='upload-list']").on('DOMSubtreeModified', function () {
        var allFilesFilled = true;
        $("div[class='upload-list']").each(function () {
            if ($(this)[0].childElementCount === 0) {
                allFilesFilled = false;
                return false;
            }
        });

        if (allFilesFilled) {
            $('#step3').removeAttr('disabled');
            $('#form_submit2').removeAttr('disabled');
        } else {
            $('#form_submit2').attr('disabled', 'disabled');
            $('#step3').attr('disabled', 'disabled');
        }
    });
});

function validaDadosPessoais() {
    const cnpj = $("#id_cnpj").val();
    const razao_social = $("#id_razao_social").val();
    const data_constituicao = $("#id_data_constituicao").val();
    const cep = $("#id_cep").val();
    const uf = $("#id_uf").val();
    const endereco = $("#id_endereco").val();
    const telefone_instituicao = $("#id_telefone_instituicao").val();
    const email_instituicao = $("#id_email_instituicao").val();
    const cargo_responsavel = $("#id_cargo").val();
    const nome_responsavel = $("#id_nome_responsavel").val();
    const email_responsavel = $("#id_email_responsavel").val();
    const telefone_responsavel = $("#id_telefone_responsavel").val();

    if (cnpj == '') {
        const cnpj_input = document.getElementById('id_cnpj');
        cnpj_input.style.borderColor = 'red';
        cnpj_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-cnpj" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo CNPJ.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-cnpj');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const cnpj_input = document.getElementById('id_cnpj');
        cnpj_input.style.borderColor = '#888';
        cnpj_input.style.borderWidth = '1px';
    }

    if (razao_social == '') {
        const razao_social_input = document.getElementById('id_razao_social');
        razao_social_input.style.borderColor = 'red';
        razao_social_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-razao_social" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Razão Social.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-razao_social');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const razao_social_input = document.getElementById('id_razao_social');
        razao_social_input.style.borderColor = '#888';
        razao_social_input.style.borderWidth = '1px';
    }

    if (data_constituicao == '') {
        const data_constituicao_input = document.getElementById('id_data_constituicao');
        data_constituicao_input.style.borderColor = 'red';
        data_constituicao_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-data_constituicao" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Data da Constituição.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-data_constituicao');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const data_constituicao_input = document.getElementById('id_data_constituicao');
        data_constituicao_input.style.borderColor = '#888';
        data_constituicao_input.style.borderWidth = '1px';
    }

    if (cep == '') {
        const cep_input = document.getElementById('id_cep');
        cep_input.style.borderColor = 'red';
        cep_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-cep" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo CEP.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-cep');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const cep_input = document.getElementById('id_cep');
        cep_input.style.borderColor = '#888';
        cep_input.style.borderWidth = '1px';
    }

    if (uf == '') {
        const uf_input = document.getElementById('id_uf');
        uf_input.style.borderColor = 'red';
        uf_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-uf" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo UF.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-uf');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const uf_input = document.getElementById('id_uf');
        uf_input.style.borderColor = '#888';
        uf_input.style.borderWidth = '1px';
    }

    if (endereco == '') {
        const endereco_input = document.getElementById('id_endereco');
        endereco_input.style.borderColor = 'red';
        endereco_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-endereco" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Endereço.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-endereco');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const endereco_input = document.getElementById('id_endereco');
        endereco_input.style.borderColor = '#888';
        endereco_input.style.borderWidth = '1px';
    }

    if (email_instituicao == '') {
        const email_input = document.getElementById('id_email_instituicao');
        email_input.style.borderColor = 'red';
        email_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-email" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Email.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-email');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const email_input = document.getElementById('id_email_instituicao');
        email_input.style.borderColor = '#888';
        email_input.style.borderWidth = '1px';
    }

    if (telefone_instituicao == '') {
        const telefone_input = document.getElementById('id_telefone_instituicao');
        telefone_input.style.borderColor = 'red';
        telefone_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-telefone" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Telefone.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-telefone');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const telefone_input = document.getElementById('id_telefone_instituicao');
        telefone_input.style.borderColor = '#888';
        telefone_input.style.borderWidth = '1px';
    }

    if (cargo_responsavel == '') {
        const cargo_input = document.getElementById('id_cargo');
        cargo_input.style.borderColor = 'red';
        cargo_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-cargo" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Cargo do Responsável.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-cargo');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const cargo_input = document.getElementById('id_cargo');
        cargo_input.style.borderColor = '#888';
        cargo_input.style.borderWidth = '1px';
    }

    if (nome_responsavel == '') {
        const nome_responsavel_input = document.getElementById('id_nome_responsavel');
        nome_responsavel_input.style.borderColor = 'red';
        nome_responsavel_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-nome_responsavel" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Nome do Responsável.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-nome_responsavel');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const nome_responsavel_input = document.getElementById('id_nome_responsavel');
        nome_responsavel_input.style.borderColor = '#888';
        nome_responsavel_input.style.borderWidth = '1px';
    }

    if (email_responsavel == '') {
        const email_responsavel_input = document.getElementById('id_email_responsavel');
        email_responsavel_input.style.borderColor = 'red';
        email_responsavel_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-email_responsavel" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Email do Responsável.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-email_responsavel');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const email_responsavel_input = document.getElementById('id_email_responsavel');
        email_responsavel_input.style.borderColor = '#888';
        email_responsavel_input.style.borderWidth = '1px';
    }

    if (telefone_responsavel == '') {
        const telefone_responsavel_input = document.getElementById('id_telefone_responsavel');
        telefone_responsavel_input.style.borderColor = 'red';
        telefone_responsavel_input.style.borderWidth = '3px';
        const elemento = `
                                    <div class="br-message danger" id="box-telefone_responsavel" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro no campo Telefone do Responsável.</span><span
                                                class="message-body"> Este campo é obrigatório</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-telefone_responsavel');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 2000);
    } else {
        const telefone_responsavel_input = document.getElementById('id_telefone_responsavel');
        telefone_responsavel_input.style.borderColor = '#888';
        telefone_responsavel_input.style.borderWidth = '1px';
    }
}


function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('id_endereco').value = ("");
    document.getElementById('id_uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('id_endereco').value = (conteudo.logradouro);
        document.getElementById('id_uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('id_endereco').value = "...";
            document.getElementById('id_uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function appendExperiencia() {
    const programa = $("#id_programa").val();
    const descricao_acao = $("#id_descricao_acao").val();
    const valor = $("#id_valor").val();
    const familias_atendidas = $("#id_familias_atendidas").val();
    const vigencia = $("#id_vigencia").val();
    const execucao = $("#id_execucao").val();
    let execucao_value;

    if (execucao == 'Em Andamento') {
        execucao_value = "EA";
    } else if (execucao == 'Aguardando') {
        execucao_value = "AG";
    } else if (execucao == 'Concluído') {
        execucao_value = "CC";
    }

    if (programa == '' || descricao_acao == '' || valor == '' || familias_atendidas == '' || vigencia == '' || execucao == '') {
        const elemento = `
                                    <div class="br-message danger" id="box-experiencias" role="alert">
                                        <div class="icon"><i class="fas fa-times-circle fa-lg"
                                                             aria-hidden="true"></i>
                                        </div>
                                        <div class="content"><span
                                                class="message-title">Erro ao inserir experiência.</span><span
                                                class="message-body"> TODOS OS CAMPOS SÃO OBRIGATÓRIOS</span>
                                        </div>
                                        <div class="close">
                                            <button class="br-button circle small" type="button"
                                                    aria-label="content"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
`
        $("#box-error").append(elemento);

        setTimeout(() => {
            const box = document.getElementById('box-experiencias');

            // 👇️ removes element from DOM
            box.remove();

            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
        }, 3000);
    } else {
        const elemento = `
       <tr>
           <td data-th="Programa">${programa}</td>
           <input type="hidden" name="programa" value="${programa}">
           <td data-th="Descrição">${descricao_acao}</td>
           <input type="hidden" name="descricao_acao" value="${descricao_acao}">
           <td data-th="Valor">${valor}</td>
           <input type="hidden" name="valor" value="${valor}">
           <td data-th="Nº de Famílias">${familias_atendidas}</td>
           <input type="hidden" name="familias_atendidas" value="${familias_atendidas}">
           <td data-th="Vigência">${vigencia}</td>
           <input type="hidden" name="vigencia" value="${vigencia}">
           <td data-th="Execução">${execucao}</td>
           <input type="hidden" name="execucao" value="${execucao_value}">
           <td data-th="Ação"> <button class="br-button danger active mr-3 btnDelete" type="button">Remover</button></td>
       </tr>
`
        $("#tabelaExecucao").append(elemento);

        $("#tabelaExecucao").on('click', '.btnDelete', function () {
            $(this).closest('tr').remove();
        })
    }
}