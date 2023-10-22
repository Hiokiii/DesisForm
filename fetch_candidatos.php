<?php
    // Get the candidatoId parameter from the AJAX request
    $candidatoId = $_GET['candidatoId'];

    // Connect to the database
    $conn = new mysqli('localhost', 'root', '', 'desis');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT id_Candidato, Nombre FROM candidato WHERE ID_Comuna = ?");
    $stmt->bind_param("i", $candidatoId);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch all rows and convert them to an associative array
    $candidatos = $result->fetch_all(MYSQLI_ASSOC);

    // Send the comunas as a JSON response
    echo json_encode($candidatos);
?>
