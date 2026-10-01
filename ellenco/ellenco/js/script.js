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

```
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

                /*
                 * Guarda temporariamente o nome
                 * para mostrar na tela de login.
                 */

                localStorage.setItem(
                    "nomeCadastrado",
                    nome
                );


                mensagem.textContent =
                    "Seja bem-vinda, " + nome + "!";


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
```

}



/* =====================================================
LOGIN
===================================================== */

const formLogin =
document.getElementById("formLogin");

if (formLogin) {

```
formLogin.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const login =
            document.getElementById(
                "login"
            ).value.trim();


        const senha =
            document.getElementById(
                "senha"
            ).value;


        const mensagem =
            document.getElementById(
                "mensagemLogin"
            );


        if (!login || !senha) {

            mensagem.textContent =
                "Preencha todos os campos.";

            mensagem.className =
                "text-center text-sm mt-4 text-red-600";

            return;

        }


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

                            login: login,

                            senha: senha

                        })
                    }
                );


            if (resposta.ok) {

                /*
                 * Tenta pegar os dados
                 * retornados pelo backend.
                 */

                let usuario = null;

                try {

                    usuario =
                        await resposta.json();

                } catch (erro) {

                    console.log(
                        "O backend não retornou JSON."
                    );

                }


                /*
                 * Primeiro tenta pegar o nome
                 * retornado pelo backend.
                 */

                let nome = "";

                if (usuario && usuario.nome) {

                    nome = usuario.nome;

                }


                /*
                 * Se o backend não retornou o nome,
                 * usa o nome salvo no cadastro.
                 */

                if (!nome) {

                    nome =
                        localStorage.getItem(
                            "nomeCadastrado"
                        );

                }


                /*
                 * Se ainda não tiver nome,
                 * usa o próprio login.
                 */

                if (!nome) {

                    nome = login;

                }


                /*
                 * Guarda o usuário logado.
                 */

                localStorage.setItem(
                    "usuarioLogado",
                    nome
                );


                /*
                 * MENSAGEM DE BOAS-VINDAS
                 */

                mensagem.textContent =
                    "Bem-vinda de volta, " +
                    nome +
                    "!";


                mensagem.className =
                    "text-center text-sm mt-4 text-green-600";


                /*
                 * Vai para registros.html
                 */

                setTimeout(
                    function() {

                        window.location.href =
                            "registros.html";

                    },
                    1200
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
```

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