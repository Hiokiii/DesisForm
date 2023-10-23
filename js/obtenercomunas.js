document.getElementById("region").addEventListener("change", function() {
    var selectedRegionId = this.value;
    if (selectedRegionId === "Seleccionar") {
        document.getElementById('comuna').innerHTML = '';
        document.getElementById('candidato').innerHTML = '';
    } else {
        document.getElementById('candidato').innerHTML = '';
        fetchComunas(selectedRegionId);
    }
});

function fetchComunas(regionId) {
    // AJAX request
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('GET', 'fetch_comunas.php?regionId=' + regionId, true);

    // Set up a handler for when the request finishes
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Parse the JSON response
            var comunas = JSON.parse(xhr.responseText);

            // Obtener seleccion
            var comunaSelect = document.getElementById('comuna');

            // Limpiar
            comunaSelect.innerHTML = '';

            // Seleccionar Option 
            var defaultOption = document.createElement('option');
            defaultOption.value = "Seleccionar";
            defaultOption.text = "Seleccionar";
            comunaSelect.appendChild(defaultOption);

            // Opciones comuna
            for (var i = 0; i < comunas.length; i++) {
                var option = document.createElement('option');
                option.value = comunas[i].id_Comuna;
                option.text = comunas[i].Nombre;
                comunaSelect.appendChild(option);
            }
        } else {
            alert('An error occurred!');
        }
    };
    // Send the request
    xhr.send();
}