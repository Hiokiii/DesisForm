<?php
include 'connection.php';

$nombre = $_POST["nombre"];
$alias = $_POST["alias"];
$rut = $_POST["rut"];
$email = $_POST["email"];
$region = $_POST["region"];
$comuna = $_POST["comuna"];
$candidato = $_POST["candidato"];
// Obtener el nombre de la región
$sql_region = "SELECT Nombre FROM region WHERE id_Region = '$region'";
$result_region = $conn->query($sql_region);
$row_region = $result_region->fetch_assoc();
$nombre_region = $row_region['Nombre'];
// Obtener el nombre de la comuna
$sql_comuna = "SELECT Nombre FROM comuna WHERE id_Comuna = '$comuna'";
$result_comuna = $conn->query($sql_comuna);
$row_comuna = $result_comuna->fetch_assoc();
$nombre_comuna = $row_comuna['Nombre'];
// Obtener el nombre del candidato
$sql_candidato = "SELECT Nombre FROM candidato WHERE id_Candidato = '$candidato'";
$result_candidato = $conn->query($sql_candidato);
$row_candidato = $result_candidato->fetch_assoc();
$nombre_candidato = $row_candidato['Nombre'];


$web = isset($_POST["web"]) ? 1 : 0;
$tv = isset($_POST["tv"]) ? 1 : 0;
$redes_sociales = isset($_POST["redes"]) ? 1 : 0;
$amigo = isset($_POST["amigo"]) ? 1 : 0;

// Verificar si el RUT ya existe en la tabla de votos
$sql = "SELECT * FROM voto WHERE RUT = '$rut'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El RUT ya existe
    echo "El RUT ingresado ya ha sido registrado";
} else {
    // El RUT no existe
    $sql = "INSERT INTO voto (Nombre, Alias, RUT, Email, Región, Comuna, Candidato, entero_web, entero_tv, entero_redes_sociales, entero_amigo) VALUES ('$nombre', '$alias', '$rut', '$email', '$nombre_region', '$nombre_comuna', '$nombre_candidato', '$web', '$tv', '$redes_sociales', '$amigo')";

    // Si se insertan, mandar alertas
    if ($conn->query($sql) === TRUE) {
        echo "Los datos se han agregado correctamente a la base de datos";      
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>