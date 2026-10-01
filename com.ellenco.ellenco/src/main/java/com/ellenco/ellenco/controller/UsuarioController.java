package com.ellenco.ellenco.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ellenco.ellenco.model.Usuario;
import com.ellenco.ellenco.service.EmailService;
import com.ellenco.ellenco.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(
        UsuarioService usuarioService,
        EmailService emailService,
        PasswordEncoder passwordEncoder) {

        this.usuarioService = usuarioService;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {

        try {

            Usuario novoUsuario = usuarioService.cadastrar(usuario);

            // Não devolve a senha para o navegador
            novoUsuario.setSenha(null);
            novoUsuario.setTokenRecuperacao(null);
            novoUsuario.setTokenExpiracao(null);

            return ResponseEntity.ok(novoUsuario);

        } catch (RuntimeException e) {

            return ResponseEntity
                .badRequest()
                .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dados) {

        Usuario usuario = usuarioService.fazerLogin(
            dados.login(),
            dados.senha()
        );

        if (usuario == null) {

            return ResponseEntity
                .status(401)
                .body("Login ou senha incorretos.");
        }

        // Não envia a senha para o navegador
        usuario.setSenha(null);
        usuario.setTokenRecuperacao(null);
        usuario.setTokenExpiracao(null);

        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/esqueci-senha")
    public ResponseEntity<?> esqueciSenha(
        @RequestBody RecuperacaoRequest dados) {

        Optional<Usuario> usuario =
            usuarioService.buscarPorEmail(dados.email());

        if (usuario.isPresent()) {

            Usuario usuarioEncontrado = usuario.get();

            String token = UUID.randomUUID().toString();

            long expiracao =
                System.currentTimeMillis()
                + (30L * 60L * 1000L);

            usuarioEncontrado.setTokenRecuperacao(token);
            usuarioEncontrado.setTokenExpiracao(expiracao);

            usuarioService.salvar(usuarioEncontrado);

            String link =
                "http://localhost:5500/redefinir-senha.html?token="
                + token;

            emailService.enviarEmailRecuperacao(
                usuarioEncontrado.getEmail(),
                link
            );
        }

        return ResponseEntity.ok(
            "Se o e-mail estiver cadastrado, " +
            "as instruções de recuperação foram enviadas."
        );
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<?> redefinirSenha(
        @RequestBody RedefinirSenhaRequest dados) {

        Optional<Usuario> usuario =
            usuarioService.buscarPorToken(dados.token());

        if (usuario.isEmpty()) {

            return ResponseEntity
                .badRequest()
                .body("Token inválido.");
        }

        Usuario usuarioEncontrado = usuario.get();

        if (usuarioEncontrado.getTokenExpiracao() == null
            || System.currentTimeMillis()
                > usuarioEncontrado.getTokenExpiracao()) {

            return ResponseEntity
                .badRequest()
                .body("Token expirado.");
        }

        usuarioEncontrado.setSenha(
            passwordEncoder.encode(dados.novaSenha())
        );

        usuarioEncontrado.setTokenRecuperacao(null);
        usuarioEncontrado.setTokenExpiracao(null);

        usuarioService.salvar(usuarioEncontrado);

        return ResponseEntity.ok(
            "Senha alterada com sucesso."
        );
    }

    public record LoginRequest(
        String login,
        String senha
    ) {}

    public record RecuperacaoRequest(
        String email
    ) {}

    public record RedefinirSenhaRequest(
        String token,
        String novaSenha
    ) {}
}