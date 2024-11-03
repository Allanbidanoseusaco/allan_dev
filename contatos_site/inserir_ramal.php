<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');
// Configurações do banco de dados
$servername = "193.203.175.97"; 
$username = "u544574803_ramais_dank";
$password = "D@nk!2wsxSup$0612@@";
$dbname = "u544574803_ramais_dank"; 

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die(json_encode(["sucesso" => false, "mensagem" => "Conexão falhou: " . $conn->connect_error]));
}

// Capturar os dados enviados via POST com segurança
$nome = $conn->real_escape_string($_POST['nome']);
$ramal = $conn->real_escape_string($_POST['ramal']);
$setor = $conn->real_escape_string($_POST['setor']);
$email = $conn->real_escape_string($_POST['email']);

// Usar prepared statement para evitar SQL injection
$stmt = $conn->prepare("INSERT INTO ramais (nome, ramal, setor, email) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nome, $ramal, $setor, $email);

// Preparar a resposta JSON
if ($stmt->execute()) {
    echo json_encode(["sucesso" => true, "mensagem" => "Novo registro inserido com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro: " . $stmt->error]);
}

// Fechar conexões
$stmt->close();
$conn->close();
?>
