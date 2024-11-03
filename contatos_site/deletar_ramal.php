<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
$servername = "193.203.175.97"; 
$username = "u544574803_ramais_dank";
$password = "D@nk!2wsxSup$0612@@";
$dbname = "u544574803_ramais_dank";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obter o ID do ramal a ser deletado
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])) {
    $id = intval($_POST['id']);
    
    // Preparar e executar a consulta para deletar
    $sql = "DELETE FROM ramais WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["sucesso" => true]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro ao deletar ramal."]);
    }
    $stmt->close();
}

$conn->close();
?>
