$(document).ready(function() {
    var municipioDropdown = $('.select-municipio');

    // Use event delegation for click events on dynamically created elements
    $('#municipio-list').on('click', 'input[name="municipio"]', function() {
        // Your click event handling code here
        var selectedMunicipio = $(this).val();
        $(this).attr('checked', 'checked');

        $('#select-municipio').val(selectedMunicipio);
        $('#select-municipio').attr('placeholder', selectedMunicipio);
    });

    $('input[name="estado3"]').change(function() {
        $('#municipio-list').html('');

        var selectedValues = $('input[name="estado3"]:checked').map(function() {
            return $(this).val();
        }).get();

        


        $.each(selectedValues, function(index, value) {
            var url = $('#municipio-list').data('url');
            $.ajax({
                url: url + '/' + value,
                type: 'GET',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function(response) {
                    $.each(response, function(index, municipio) {
                        $('<div class="br-item" tabindex="-1"><div class="br-radio"><input type="radio" name="municipio" id="rb' +
                            municipio.ibge + '" value="' + municipio
                            .ibge +
                            '"/><label for="rb' + municipio.ibge +
                            '">' +
                            municipio.nome + '/' + municipio
                            .estado_id + ' - ' + municipio
                            .ibge +
                            '</label></div></div>').appendTo(
                            '#municipio-list');
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error:", textStatus, errorThrown);
                    alert(
                        'Failed to fetch municipios. Check the console for details.'
                    );
                }
            });
        });
    });
});
