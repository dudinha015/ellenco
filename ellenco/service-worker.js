const CACHE_NAME = "ellenco-v1";

const ARQUIVOS = [
    "./",
    "./login/index.html",
    "./cadastro/index.html",
    "./recuperar-senha/index.html",
    "./home/index.html",

    "./js/script.js",
    "./js/db.js",

    "./imagens/logo-ellenco.png",
    "./imagens/fundo-obra.jpg"
];

self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function(cache) {

                return cache.addAll(ARQUIVOS);

            })

    );

    self.skipWaiting();
});


self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys()
            .then(function(nomesCaches) {

                return Promise.all(

                    nomesCaches.map(function(nomeCache) {

                        if (nomeCache !== CACHE_NAME) {

                            return caches.delete(nomeCache);

                        }

                    })

                );

            })

    );

    self.clients.claim();
});


self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request)
            .then(function(respostaCache) {

                if (respostaCache) {

                    return respostaCache;

                }

                return fetch(event.request);

            })
            .catch(function() {

                return caches.match("./login/index.html");

            })

    );

});
