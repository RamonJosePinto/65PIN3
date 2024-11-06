package com._PIN3.project.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Empresa {

    @Id
    @GeneratedValue
    private Integer id;

    private String cnpj;

    private String nome;

    private int telefone;

    private String email;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
    private List<Supervisor> supervisores;

    public Empresa() {
    }

    public Empresa(Integer id, String cnpj, String nome, int telefone, String email, List<Supervisor> supervisores) {
        this.id = id;
        this.cnpj = cnpj;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.supervisores = supervisores;
    }

    @Override
    public String toString() {
        return "Empresa{" +
                "id=" + id +
                ", cnpj='" + cnpj + '\'' +
                ", nome='" + nome + '\'' +
                ", telefone=" + telefone +
                ", email='" + email + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getTelefone() {
        return telefone;
    }

    public void setTelefone(int telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Supervisor> getSupervisores() {
        return supervisores;
    }

    public void setSupervisores(List<Supervisor> supervisores) {
        this.supervisores = supervisores;
    }
}
