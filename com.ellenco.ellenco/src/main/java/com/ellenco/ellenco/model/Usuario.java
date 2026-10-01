package com.ellenco.ellenco.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false)
private String nome;

@Column(nullable = false, unique = true)
private String email;

@Column(nullable = false, unique = true)
private String login;

@Column(nullable = false)
private String senha;

@Column(name = "token_recuperacao")
private String tokenRecuperacao;

@Column(name = "token_expiracao")
private Long tokenExpiracao;

public Usuario() {
}

public Usuario(String nome, String email, String login, String senha) {
this.nome = nome;
this.email = email;
this.login = login;
this.senha = senha;
}

public Long getId() {
return id;
}

public String getNome() {
return nome;
}

public void setNome(String nome) {
this.nome = nome;
}

public String getEmail() {
return email;
}

public void setEmail(String email) {
this.email = email;
}

public String getLogin() {
return login;
}

public void setLogin(String login) {
this.login = login;
}

public String getSenha() {
return senha;
}

public void setSenha(String senha) {
this.senha = senha;
}

public String getTokenRecuperacao() {
return tokenRecuperacao;
}

public void setTokenRecuperacao(String tokenRecuperacao) {
this.tokenRecuperacao = tokenRecuperacao;
}

public Long getTokenExpiracao() {
return tokenExpiracao;
}

public void setTokenExpiracao(Long tokenExpiracao) {
this.tokenExpiracao = tokenExpiracao;
}
}