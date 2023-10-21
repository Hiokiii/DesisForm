<?php
    // Get the regionId parameter from the AJAX request
    $regionId = $_GET['regionId'];

    // Connect to the database
    $conn = new mysqli('localhost', 'root', '', 'desis');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT id_Comuna, Nombre FROM comuna WHERE ID_Region = ?");
    $stmt->bind_param("i", $regionId);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch all rows and convert them to an associative array
    $comunas = $result->fetch_all(MYSQLI_ASSOC);

    // Send the comunas as a JSON response
    echo json_encode($comunas);
?>
