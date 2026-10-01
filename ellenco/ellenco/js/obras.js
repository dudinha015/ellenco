// ==========================================
// PÁGINA DE OBRAS
// ==========================================


// Abrir uma obra
function abrirObra(id) {

// Guardamos qual obra foi escolhida
localStorage.setItem("obraSelecionada", id);

// Abrimos a página de registro
window.location.href = "registro.html";
}


// Botão sair
function sair() {

const confirmar = confirm(
"Deseja realmente sair do sistema?"
);

if (confirmar) {
window.location.href = "login.html";
}
}


// Usuário
function abrirUsuario() {

alert(
"Área do usuário.\n\n" +
"Essa parte será ligada ao cadastro posteriormente."
);
}


// Configurações
function abrirConfiguracoes() {

alert(
"Configurações.\n\n" +
"Essa parte será implementada posteriormente."
);
}