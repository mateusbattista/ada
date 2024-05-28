$(document).ready(function () {
    $('#id_cep').mask('00000-000');
    $('#id_cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('#id_cpf').mask('000.000.000-00', {reverse: true});
    $('#id_cpf_informante').mask('000.000.000-00', {reverse: true});
    $('#id_telefone_instituicao').mask('(00) 00000-0000')
    $('#id_fax').mask('(00) 00000-0000')
    $('#id_telefone_responsavel').mask('(00) 00000-0000')
});

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('id_endereco').value = ("");
    document.getElementById('id_estado').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('id_endereco').value = conteudo.logradouro;

        var selectElement = document.getElementById('id_estado');
        var ufValue = conteudo.uf;

        // Percorra as opções do select e defina a opção selecionada com base no valor de ufValue
        for (var i = 0; i < selectElement.options.length; i++) {
            var option = selectElement.options[i];

            if (option.value === ufValue) {
                option.selected = true;
                break;
            }
        }
        $.ajax({
            url: '/chaining/filter/comum/Municipio/estado/parceiros/Parceiros/municipio/' + ufValue + '/',
            type: 'GET',
            success: function (data) {
                var selectElement = $('#id_municipio');

                // Limpa o conteúdo atual do elemento select
                selectElement.empty();
                $.each(data, function (index, item) {
                    var option = $('<option>', {value: item.value, text: item.display});
                    selectElement.append(option);
                });

                var valorSelecionado = conteudo.ibge; // Substitua pelo valor que deseja selecionar
                selectElement.val(valorSelecionado);
                // Processar os dados retornados na resposta
            },
            error: function (error) {
                // Tratar erros
                console.error(error);
            }
        });

    } else {
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
            document.getElementById('id_estado').value = "...";

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