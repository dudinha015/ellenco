/* =====================================================
   ELLENCO - SCRIPT PRINCIPAL
===================================================== */


/* =====================================================
   MOSTRAR / ESCONDER SENHA
===================================================== */

function alternarSenha(campoId) {

    const campo = document.getElementById(campoId);

    if (!campo) {
        return;
    }

    if (campo.type === "password") {

        campo.type = "text";

    } else {

        campo.type = "password";

    }
}


/* =====================================================
   BOTÃO MOSTRAR SENHA - LOGIN
===================================================== */

const btnMostrarSenhaLogin =
    document.getElementById("btnMostrarSenhaLogin");

if (btnMostrarSenhaLogin) {

    btnMostrarSenhaLogin.addEventListener(
        "click",
        function() {

            alternarSenha("senha");

        }
    );

}


/* =====================================================
   BOTÃO MOSTRAR SENHA - CADASTRO
===================================================== */

const btnMostrarSenhaCadastro =
    document.getElementById(
        "btnMostrarSenhaCadastro"
    );

if (btnMostrarSenhaCadastro) {

    btnMostrarSenhaCadastro.addEventListener(
        "click",
        function() {

            alternarSenha("senhaCadastro");

        }
    );

}


/* =====================================================
   BOTÃO MOSTRAR CONFIRMAÇÃO DE SENHA
===================================================== */

const btnMostrarConfirmarSenha =
    document.getElementById(
        "btnMostrarConfirmarSenha"
    );

if (btnMostrarConfirmarSenha) {

    btnMostrarConfirmarSenha.addEventListener(
        "click",
        function() {

            alternarSenha("confirmarSenha");

        }
    );

}


/* =====================================================
   CADASTRO
===================================================== */

const formCadastro =
    document.getElementById("formCadastro");


if (formCadastro) {

    formCadastro.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const nome =
                document.getElementById("nome").value.trim();


            const email =
                document.getElementById(
                    "emailCadastro"
                ).value.trim();


            const login =
                document.getElementById(
                    "loginCadastro"
                ).value.trim();


            const senha =
                document.getElementById(
                    "senhaCadastro"
                ).value;


            const confirmarSenha =
                document.getElementById(
                    "confirmarSenha"
                ).value;


            const mensagem =
                document.getElementById(
                    "mensagemCadastro"
                );


            /* VERIFICAR SENHAS */

            if (senha !== confirmarSenha) {

                mensagem.textContent =
                    "As senhas não são iguais.";

                mensagem.className =
                    "text-center text-sm mt-4 text-red-600";

                return;
            }


            try {

                const resposta =
                    await fetch(
                        "http://localhost:8080/cadastros",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                nome: nome,

                                email: email,

                                login: login,

                                senha: senha

                            })
                        }
                    );


                if (resposta.ok) {

                    mensagem.textContent =
                        "Cadastro realizado com sucesso!";

                    mensagem.className =
                        "text-center text-sm mt-4 text-green-600";


                    formCadastro.reset();


                    setTimeout(
                        function() {

                            window.location.href =
                                "../login/index.html";

                        },
                        1500
                    );


                } else {

                    mensagem.textContent =
                        "Não foi possível realizar o cadastro.";

                    mensagem.className =
                        "text-center text-sm mt-4 text-red-600";

                }


            } catch (erro) {

                console.error(
                    "Erro no cadastro:",
                    erro
                );


                mensagem.textContent =
                    "Não foi possível conectar ao servidor.";

                mensagem.className =
                    "text-center text-sm mt-4 text-red-600";

            }

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

const formLogin =
    document.getElementById("formLogin");


if (formLogin) {

    formLogin.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const senha =
                document.getElementById(
                    "senha"
                ).value;


            const mensagem =
                document.getElementById(
                    "mensagemLogin"
                );


            try {

                const resposta =
                    await fetch(
                        "http://localhost:8080/cadastros/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                email: email,

                                senha: senha

                            })
                        }
                    );


                if (resposta.ok) {

                    mensagem.textContent =
                        "Login realizado com sucesso!";

                    mensagem.className =
                        "text-center text-sm mt-4 text-green-600";


                    setTimeout(
                        function() {

                            window.location.href =
                                "../home/index.html";

                        },
                        1000
                    );


                } else {

                    mensagem.textContent =
                        "Login ou senha incorretos.";

                    mensagem.className =
                        "text-center text-sm mt-4 text-red-600";

                }


            } catch (erro) {

                console.error(
                    "Erro no login:",
                    erro
                );


                mensagem.textContent =
                    "Não foi possível conectar ao servidor.";

                mensagem.className =
                    "text-center text-sm mt-4 text-red-600";

            }

        }
    );

}


/* =====================================================
   RECUPERAR SENHA
===================================================== */

const formRecuperar =
    document.getElementById(
        "formRecuperar"
    );


if (formRecuperar) {

    formRecuperar.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const mensagem =
                document.getElementById(
                    "mensagemRecuperar"
                );


            mensagem.textContent =
                "Se os dados estiverem cadastrados, as instruções serão enviadas.";

            mensagem.className =
                "text-center text-sm mt-4 text-green-600";

        }
    );

}