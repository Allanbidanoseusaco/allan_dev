<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

// Configurações de conexão com o banco de dados
$servername = "193.203.175.97"; 
$username = "u544574803_ramais_dank";
$password = "D@nk!2wsxSup$0612@@";
$dbname = "u544574803_ramais_dank"; 

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta para buscar ramais
$sql = "SELECT id, nome, ramal, setor, email FROM ramais"; // ajuste o nome da tabela
$result = $conn->query($sql);

$ramais = array();

if ($result->num_rows > 0) {
    // Saída dos dados de cada linha
    while($row = $result->fetch_assoc()) {
        $ramais[] = $row;
    }
}

$conn->close();

// Retorna os dados em formato JSON
echo json_encode($ramais);
?>
