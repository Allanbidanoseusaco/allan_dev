<?php
$servername = "193.203.175.97"; 
$username = "u544574803_ramais_dank";
$password = "D@nk!2wsxSup$0612@@";
$dbname = "u544574803_ramais_dank";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die(json_encode(['sucesso' => false, 'mensagem' => "Conexão falhou: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id']; // Certifique-se de que o ID está sendo enviado para identificar o dado a ser editado
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $ramal = $_POST['ramal'];
    $setor = $_POST['setor'];

    // Atualiza o dado existente ao invés de criar um novo
    $query = "UPDATE ramais SET nome = ?, email = ?, ramal = ?, setor = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssi', $nome, $email, $ramal, $setor, $id);

    if ($stmt->execute()) {
        echo json_encode(['sucesso' => true, 'mensagem' => "Dado atualizado com sucesso!"]);
    } else {
        echo json_encode(['sucesso' => false, 'mensagem' => "Erro ao atualizar o dado!"]);
    }
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => "Método HTTP não suportado."]);
}

$conn->close();
?>
