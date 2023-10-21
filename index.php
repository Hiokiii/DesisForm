<?php include 'connection.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de votación</title>
    <!-- <script defer src="js/regiones.js"></script> -->
    <script defer src="js/validaciones.js"></script>
    <script defer src="js/obtenercomunas.js"></script>
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
                $sql = "SELECT id_Region, CONCAT(Numero, ' - ', Nombre) AS Numero_Nombre FROM region";
                $result = $conn->query($sql);

                echo '<option value="Seleccionar" selected>Seleccionar</option>';
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo '<option value="'.$row['id_Region'].'">'.$row['Numero_Nombre'].'</option>';
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
    
</body>
</html>
