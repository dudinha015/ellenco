package com.ellenco.ellenco.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ellenco.ellenco.model.Usuario;
import com.ellenco.ellenco.repository.UsuarioRepository;

@Service
public class UsuarioService {

private final UsuarioRepository usuarioRepository;
private final PasswordEncoder passwordEncoder;

public UsuarioService(
UsuarioRepository usuarioRepository,
PasswordEncoder passwordEncoder) {

this.usuarioRepository = usuarioRepository;
this.passwordEncoder = passwordEncoder;
}

public Usuario cadastrar(Usuario usuario) {

if (usuarioRepository.existsByEmail(usuario.getEmail())) {
throw new RuntimeException("E-mail já cadastrado.");
}

if (usuarioRepository.existsByLogin(usuario.getLogin())) {
throw new RuntimeException("Login já cadastrado.");
}

usuario.setSenha(
passwordEncoder.encode(usuario.getSenha())
);

return usuarioRepository.save(usuario);
}

public Usuario fazerLogin(String login, String senha) {


Optional<Usuario> usuario =
    usuarioRepository.findByLogin(login);

if (usuario.isEmpty()) {
    return null;
}

boolean senhaCorreta =
    passwordEncoder.matches(
        senha,
        usuario.get().getSenha()
    );

if (!senhaCorreta) {
    return null;
}

return usuario.get();

}


public Optional<Usuario> buscarPorEmail(String email) {
return usuarioRepository.findByEmail(email);
}

public Optional<Usuario> buscarPorToken(String token) {
return usuarioRepository.findByTokenRecuperacao(token);
}

public Usuario salvar(Usuario usuario) {
return usuarioRepository.save(usuario);
}
}
