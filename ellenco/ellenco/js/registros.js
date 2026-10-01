// ==========================================
// REGISTRO DIÁRIO DA OBRA
// ==========================================


// Obras temporárias
// Depois essas informações virão do banco XAMPP.

const obras = {

1: {
nome: "Rua Jardim das Flores",
local: "São Paulo - SP"
},

2: {
nome: "Avenida Vista Alegre",
local: "Sorocaba - SP"
},

3: {
nome: "Rua Antônio Carlos",
local: "Campinas - SP"
}

};


// ==========================================
// CARREGAR OBRA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

const idObra = localStorage.getItem("obraSelecionada");

const obra = obras[idObra];

if (obra) {

document.getElementById("nomeObra").textContent =
obra.nome;

document.getElementById("localObra").textContent =
obra.local;

} else {

document.getElementById("nomeObra").textContent =
"Registro diário da obra";

document.getElementById("localObra").textContent =
"Nenhuma obra selecionada";

}


// Coloca a data atual automaticamente

const hoje = new Date();

const ano = hoje.getFullYear();

const mes = String(
hoje.getMonth() + 1
).padStart(2, "0");

const dia = String(
hoje.getDate()
).padStart(2, "0");

document.getElementById("data").value =
`${ano}-${mes}-${dia}`;

});


// ==========================================
// PRÉ-VISUALIZAÇÃO DAS FOTOS
// ==========================================

document
.getElementById("fotos")
.addEventListener("change", function (event) {

const preview =
document.getElementById("previewFotos");

preview.innerHTML = "";

const arquivos = event.target.files;


for (const arquivo of arquivos) {

const imagem =
document.createElement("img");

imagem.className =
"w-full h-32 object-cover rounded-lg border";

imagem.alt =
"Foto da obra";


const leitor =
new FileReader();


leitor.onload = function (e) {

imagem.src =
e.target.result;

};


leitor.readAsDataURL(arquivo);

preview.appendChild(imagem);

}

});


// ==========================================
// GEOLOCALIZAÇÃO
// ==========================================

function obterLocalizacao() {

const campo =
document.getElementById("localizacao");

const status =
document.getElementById("statusLocalizacao");


if (!navigator.geolocation) {

status.textContent =
"Este navegador não suporta geolocalização.";

return;

}


status.textContent =
"Obtendo localização...";


navigator.geolocation.getCurrentPosition(

function (posicao) {

const latitude =
posicao.coords.latitude;

const longitude =
posicao.coords.longitude;


campo.value =
`Latitude: ${latitude.toFixed(6)} | Longitude: ${longitude.toFixed(6)}`;


status.textContent =
"Localização obtida com sucesso.";

// Guardamos também para enviar ao backend
localStorage.setItem(
"latitude",
latitude
);

localStorage.setItem(
"longitude",
longitude
);

},

function (erro) {

console.error(erro);

status.textContent =
"Não foi possível obter a localização. Verifique a permissão do navegador.";

}

);

}


// ==========================================
// SALVAR REGISTRO
// ==========================================

function salvarRegistro() {

const idObra =
localStorage.getItem("obraSelecionada");

const registro = {

obraId: idObra,

data:
document.getElementById("data").value,

horario:
document.getElementById("horario").value,

turno:
document.getElementById("turno").value,

clima:
document.getElementById("clima").value,

descricao:
document.getElementById("descricao").value,

latitude:
localStorage.getItem("latitude"),

longitude:
localStorage.getItem("longitude")

};


// Verificação dos campos

if (!registro.data) {

alert("Informe a data.");

return;

}


if (!registro.horario) {

alert("Informe o horário.");

return;

}


if (!registro.turno) {

alert("Selecione o turno.");

return;

}


if (!registro.clima) {

alert("Selecione o clima.");

return;

}


if (!registro.descricao) {

alert("Digite o relato do dia.");

return;

}


// Por enquanto salvamos localmente.
// Depois vamos substituir por envio ao Spring Boot.

localStorage.setItem(
"ultimoRegistro",
JSON.stringify(registro)
);


alert(
"Registro salvo com sucesso!\n\n" +
"Na próxima etapa ele será enviado para o Spring Boot e armazenado no XAMPP."
);

}


// ==========================================
// VOLTAR
// ==========================================

function voltarObras() {

window.location.href =
"obras.html";

}


// ==========================================
// RELATÓRIO
// ==========================================

function elaborarRelatorio() {

window.location.href =
"relatorio.html";

}


// ==========================================
// MENU
// ==========================================

function sair() {

const confirmar =
confirm("Deseja realmente sair?");

if (confirmar) {

window.location.href =
"login.html";

}

}


function abrirUsuario() {

alert(
"Área do usuário será conectada ao cadastro."
);

}


function abrirConfiguracoes() {

alert(
"Área de configurações."
);

}