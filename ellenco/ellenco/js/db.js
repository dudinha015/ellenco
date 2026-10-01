const NOME_BANCO = "EllencoDB";
const VERSAO_BANCO = 1;

function abrirBanco() {

    return new Promise(function(resolve, reject) {

        const requisicao = indexedDB.open(
            NOME_BANCO,
            VERSAO_BANCO
        );


        requisicao.onupgradeneeded = function(event) {

            const banco = event.target.result;


            if (!banco.objectStoreNames.contains("usuarios")) {

                const usuarios =
                    banco.createObjectStore(
                        "usuarios",
                        {
                            keyPath: "id",
                            autoIncrement: true
                        }
                    );


                usuarios.createIndex(
                    "login",
                    "login",
                    {
                        unique: true
                    }
                );


                usuarios.createIndex(
                    "email",
                    "email",
                    {
                        unique: true
                    }
                );

            }

        };


        requisicao.onsuccess = function(event) {

            resolve(event.target.result);

        };


        requisicao.onerror = function(event) {

            reject(event.target.error);

        };

    });

}


/* =====================================================
   SALVAR USUÁRIO LOCALMENTE
===================================================== */

async function salvarUsuarioLocal(usuario) {

    const banco = await abrirBanco();


    return new Promise(function(resolve, reject) {

        const transacao =
            banco.transaction(
                ["usuarios"],
                "readwrite"
            );


        const tabela =
            transacao.objectStore("usuarios");


        const requisicao =
            tabela.add(usuario);


        requisicao.onsuccess = function() {

            resolve(true);

        };


        requisicao.onerror = function(event) {

            reject(event.target.error);

        };

    });

}


/* =====================================================
   BUSCAR USUÁRIO PELO LOGIN
===================================================== */

async function buscarUsuarioPorLogin(login) {

    const banco = await abrirBanco();


    return new Promise(function(resolve, reject) {

        const transacao =
            banco.transaction(
                ["usuarios"],
                "readonly"
            );


        const tabela =
            transacao.objectStore("usuarios");


        const indice =
            tabela.index("login");


        const requisicao =
            indice.get(login);


        requisicao.onsuccess = function(event) {

            resolve(event.target.result);

        };


        requisicao.onerror = function(event) {

            reject(event.target.error);

        };

    });

}