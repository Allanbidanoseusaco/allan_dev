// Variável global para armazenar o ID do ramal que está sendo editado
let ramalEditandoId = null;

// Função para abrir o modal
function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById("modal").style.display = "none";
    resetarFormulario(); // Limpar o formulário ao fechar
}

// Função para carregar ramais do banco de dados
function carregarRamais() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "buscar_ramais.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var ramais = JSON.parse(xhr.responseText);
            var tabela = document.getElementById("tabelaRamais").getElementsByTagName("tbody")[0];
            tabela.innerHTML = "";

            ramais.forEach(function(ramal) {
                var novaLinha = tabela.insertRow();
                novaLinha.insertCell(0).textContent = ramal.nome;
                novaLinha.insertCell(1).textContent = ramal.ramal;
                novaLinha.insertCell(2).textContent = ramal.setor;
                novaLinha.insertCell(3).textContent = ramal.email;

                // Criando o botão de editar
                var acaoCell = novaLinha.insertCell(4);
                var editarBotao = document.createElement("button");
                editarBotao.innerHTML = 'Editar';
                editarBotao.className = "editar_buttom";
                editarBotao.onclick = function() {
                    editarRamal(ramal, novaLinha);
                };
                acaoCell.appendChild(editarBotao);

                // Criando o botão de deletar
                var deletarBotao = document.createElement("button");
                deletarBotao.innerHTML = 'Deletar';
                deletarBotao.className = "deletar_buttom";
                deletarBotao.onclick = function() {
                    deletarRamal(ramal.id, novaLinha);
                };
                acaoCell.appendChild(deletarBotao);
            });
        } else {
            console.error("Erro ao carregar ramais: " + xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error("Erro na requisição AJAX.");
    };
    xhr.send();
}

// Função para adicionar um ramal
function adicionarRamal() {
    var nome = document.getElementById("nome").value.trim();
    var ramal = document.getElementById("ramal").value.trim();
    var setor = document.getElementById("setor").value.trim();
    var email = document.getElementById("email").value.trim();

    // Validação de campos vazios
    if (!nome || !ramal || !setor || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validação de email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "inserir_ramal.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status === 200) {
            var resposta = JSON.parse(xhr.responseText);
            if (resposta.sucesso) {
                location.reload(); // Atualiza a página
                fecharModal(); // Fecha a modal após a inserção
                ramalEditandoId = null; // Reseta o ID do ramal em edição
            } else {
                alert("Erro ao adicionar ramal: " + resposta.mensagem);
            }
        } else {
            alert("Erro na inserção: " + xhr.statusText);
        }
    };

    var dados = "nome=" + encodeURIComponent(nome) + "&ramal=" + encodeURIComponent(ramal) + "&setor=" + encodeURIComponent(setor) + "&email=" + encodeURIComponent(email);
    xhr.send(dados);
}

// Função para atualizar um ramal
function atualizarRamal() {
    var nome = document.getElementById("nome").value.trim();
    var ramal = document.getElementById("ramal").value.trim();
    var setor = document.getElementById("setor").value.trim();
    var email = document.getElementById("email").value.trim();

    // Validação de campos vazios
    if (!nome || !ramal || !setor || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validação de email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "editar_ramal.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status === 200) {
            var resposta = JSON.parse(xhr.responseText);
            if (resposta.sucesso) {
                location.reload(); // Atualiza a página
                fecharModal(); // Fecha a modal após a edição
                ramalEditandoId = null; // Reseta o ID do ramal em edição
            } else {
                alert("Erro ao atualizar ramal: " + resposta.mensagem);
            }
        } else {
            alert("Erro na atualização: " + xhr.statusText);
        }
    };

    var dados = "nome=" + encodeURIComponent(nome) + "&ramal=" + encodeURIComponent(ramal) + "&setor=" + encodeURIComponent(setor) + "&email=" + encodeURIComponent(email) + "&id=" + encodeURIComponent(ramalEditandoId);
    xhr.send(dados);
}
// Função para filtrar ramais por substring
function filtrarRamais() {
    const input = document.querySelector(".entrada");
    const filtro = input.value.toLowerCase();
    const tabela = document.getElementById("tabelaRamais");
    const linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const nome = linhas[i].getElementsByTagName("td")[0].textContent.toLowerCase();
        const ramal = linhas[i].getElementsByTagName("td")[1].textContent.toLowerCase();
        const setor = linhas[i].getElementsByTagName("td")[2].textContent.toLowerCase();
        const email = linhas[i].getElementsByTagName("td")[3].textContent.toLowerCase();

        if (nome.includes(filtro) || ramal.includes(filtro) || setor.includes(filtro) || email.includes(filtro)) {
            linhas[i].style.display = ""; // Mostra a linha se houver correspondência
        } else {
            linhas[i].style.display = "none"; // Oculta a linha se não houver correspondência
        }
    }
}


// Função para editar um ramal
function editarRamal(ramal, linha) {
    document.getElementById("nome").value = ramal.nome;
    document.getElementById("ramal").value = ramal.ramal;
    document.getElementById("setor").value = ramal.setor;
    document.getElementById("email").value = ramal.email;

    document.querySelector(".salvar_buttom").style.display = "none"; // Oculta o botão "Salvar"
    document.querySelector(".atualizar_buttom").style.display = "inline"; // Exibe o botão "Atualizar"
    ramalEditandoId = ramal.id; // Define o ID do ramal que está sendo editado
    abrirModal(); // Abre o modal para edição
}

// Função para deletar um ramal
function deletarRamal(id, linha) {
    if (confirm("Tem certeza que deseja deletar este ramal?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "deletar_ramal.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function() {
            if (xhr.status === 200) {
                alert("Ramal deletado com sucesso!");
                linha.remove(); // Remove a linha da tabela após deletar
            } else {
                alert("Erro ao deletar o ramal.");
            }
        };

        xhr.send("id=" + id);
    }
}

// Fecha a modal quando o usuário clica fora da modal
window.onclick = function(event) {
    var modal = document.getElementById("modal");
    if (event.target === modal) {
        fecharModal();
    }
}

// Limpa o formulário
function resetarFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("ramal").value = "";
    document.getElementById("setor").value = "";
    document.getElementById("email").value = "";
    document.querySelector(".salvar_buttom").style.display = "inline"; // Resetar para mostrar o botão "Salvar"
    document.querySelector(".atualizar_buttom").style.display = "none"; // Oculta o botão "Atualizar"
    ramalEditandoId = null; // Resetar o ID para adição
}

// Carregar os ramais quando a página for carregada
document.addEventListener("DOMContentLoaded", function() {
    carregarRamais();
});

