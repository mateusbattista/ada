$(document).ready(function ($) {
    $('#id_cpf_pedreiro').mask('000.000.000-00', {reverse: true});

});

$("input[type=text]").keyup(function () {
    $(this).val($(this).val().toUpperCase());
});


document.addEventListener("DOMContentLoaded", function () {
    const closeMapModalBtn = document.getElementById("closeMapModal");
    const modal = document.getElementById("mapModal");

    // Evento para fechar o modal ao clicar no botão "X"
    closeMapModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    document.getElementById("buscar-cidade-button").addEventListener("click", function () {
        const latitude = parseFloat(document.getElementById("id_latitude").value);
        const longitude = parseFloat(document.getElementById("id_longitude").value);

        buscarCidadePorLatLong(latitude, longitude);
    });

    // Função para abrir o modal
    function openModal(cidadeSiglaEstado, latitude, longitude) {
        modal.style.display = "block";

        // Crie um mapa usando a API OpenStreetMap
        const map = L.map("mapContainer").setView([latitude, longitude], 20);

        // Adicione um tile layer do OpenStreetMap ao mapa
        const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Crie um marcador com um pop-up contendo a cidade/sigla do estado
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(cidadeSiglaEstado).openPopup();
    }

    // Função para buscar cidade/sigla do estado com base nas coordenadas
    function buscarCidadePorLatLong(latitude, longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const cidade = data.address.city || data.address.town || data.address.village || data.address.hamlet || 'Cidade não encontrada';
                const estado = data.address.state || 'Estado não encontrado';

                const cidadeSiglaEstado = `${cidade}/${estado}`;

                openModal(cidadeSiglaEstado, latitude, longitude); // Chama a função para abrir o modal com cidade/sigla do estado
            })
            .catch(              
                alert('Nenhuma localidade encontrada para os parâmetros informados')
            );
    }
});
