package com._PIN3.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Supervisor {
    @Id
    @GeneratedValue
    private Integer id;

    private String nome;

    private Long telefone;

    private String cargo;

    @ManyToOne(targetEntity = Empresa.class)
    @JsonIgnore
    private Empresa empresa;

    public Supervisor(Integer id, String nome, Long telefone, String cargo, Empresa empresa) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.cargo = cargo;
        this.empresa = empresa;
    }

    public Supervisor() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getTelefone() {
        return telefone;
    }

    public void setTelefone(Long telefone) {
        this.telefone = telefone;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
}
