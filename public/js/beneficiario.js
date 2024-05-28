$(document).ready(function ($) {
    $('#id_cpf').mask('000.000.000-00', {reverse: true});
    $('#id_cpf_informante').mask('000.000.000-00', {reverse: true});
    var checkBox = document.getElementById("id_faz_tratamento");
    var campo1 = document.getElementById("campo1");
    var campo2 = document.getElementById("campo2");
    var forma = document.getElementById("id_qual_forma_tratamento");
    var frequencia = document.getElementById("id_qual_frequencia_tratamento");

    if (checkBox.checked === true) {
        campo1.style.display = "block"
        campo2.style.display = "block"
    } else {
        campo1.style.display = "none"
        campo2.style.display = "none"
        forma.value = ""
        frequencia.value = ""
    }


});

$("input[type=text]").keyup(function () {
    $(this).val($(this).val().toUpperCase());
});

function isChecked() {
    var checkBox = document.getElementById("id_faz_tratamento");
    var campo1 = document.getElementById("campo1");
    var campo2 = document.getElementById("campo2");
    var forma = document.getElementById("id_qual_forma_tratamento");
    var frequencia = document.getElementById("id_qual_frequencia_tratamento");

    if (checkBox.checked === true) {
        campo1.style.display = "block"
        campo2.style.display = "block"
    } else {
        campo1.style.display = "none"
        campo2.style.display = "none"
        forma.value = ""
        frequencia.value = ""
    }
}

