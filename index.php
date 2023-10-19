<?php include 'connection.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
    <title>Formulario de votación</title>
    <!-- <script defer src="js/regiones.js"></script> -->
    <script defer src="js/scripts.js"></script>
    <link rel="stylesheet" type="text/css" href="css/estilos.css">

</head>
<body>
    <h1>FORMULARIO DE VOTACIÓN</h1>
    <div id="error"></div>
    <form id="votingForm">
        <div class="form-group">
            <label for="nombre">Nombre y Apellido:</label>
            <input type="text" id="nombre" name="nombre" >
        </div>
        <div class="form-group">
            <label for="alias">Alias:</label>
            <input type="text" id="alias" name="alias">
        </div>
        <div class="form-group">
            <label for="rut">RUT:</label>
            <input type="text" id="rut" name="rut">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
        </div>
        <div class="form-group">
            <label for="region">Region:</label>
            <select id="region" name="region">
                <?php
                $sql = "SELECT CONCAT(Numero, ' - ', Nombre) AS Numero_Nombre FROM region";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo '<option value="'.$row['Numero_Nombre'].'">'.$row['Numero_Nombre'].'</option>';
                    }
                } else {
                    echo "0 results";
                }
                ?>
            </select>
        </div>
        <div class="form-group">
            <label for="comuna">Comuna:</label>
            <select id="comuna" name="comuna">
                
            </select>
        </div>
        <div class="form-group">
            <label for="candidato">Candidato:</label>
            <select id="candidato" name="candidato">
            </select>
        </div>
        <div class="checkbox-group">
            <label>Como se entero de Nosotros:</label>
            <label for="web">
                <input type="checkbox" id="web" name="web"> Web
            </label>
            <label for="tv">
                <input type="checkbox" id="tv" name="tv"> TV
            </label>
            <label for="redes">
                <input type="checkbox" id="redes" name="redes"> Redes Sociales
            </label>
            <label for="amigo">
                <input type="checkbox" id="amigo" name="amigo"> Amigo
            </label>
        </div>
        <input type="submit" value="Votar">
    </form>
    
    <!-- SCRIPTS -->
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script>
    function populateComunas() {
    var regionDropdown = document.getElementById("region");
    var selectedRegion = regionDropdown.value;
    var comunaDropdown = document.getElementById("comuna");
    
    // Clear the current options in the comuna dropdown
    comunaDropdown.innerHTML = "";
    
    // Create an AJAX request to fetch the comunas for the selected region
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_comunas.php?region=" + encodeURIComponent(selectedRegion), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the response JSON
        var comunas = JSON.parse(xhr.responseText);
        
        // Add the options to the comuna dropdown
        for (var i = 0; i < comunas.length; i++) {
            var option = document.createElement("option");
            option.value = comunas[i];
            option.textContent = comunas[i];
            comunaDropdown.appendChild(option);
        }
        }
    };
    xhr.send();
    }
    </script>
    
</body>
</html>