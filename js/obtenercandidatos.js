document.getElementById("comuna").addEventListener("change", function() {
    var selectedCandidatoId = this.value;
    fetchCandidatos(selectedCandidatoId);
});

function fetchCandidatos(candidatoId) {
    // AJAX request
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('GET', 'fetch_candidatos.php?candidatoId=' + candidatoId, true);

    // Set up a handler for when the request finishes
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Parse the JSON response
            var candidatos = JSON.parse(xhr.responseText);

            // Obtener seleccion
            var candidatoSelect = document.getElementById('candidato');

            // Limpiar columna
            candidatoSelect.innerHTML = '';

            // Añadir las nuevas opciones
            for (var i = 0; i < candidatos.length; i++) {
                var option = document.createElement('option');
                option.value = candidatos[i].id_Candidato;
                option.text = candidatos[i].Nombre;
                candidatoSelect.appendChild(option);
            }
        } else {
            alert('An error occurred!');
        }
    };
    // Send the request
    xhr.send();
}
