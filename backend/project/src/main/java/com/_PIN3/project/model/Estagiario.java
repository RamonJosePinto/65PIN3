package com._PIN3.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "estagiario")
public class Estagiario extends Usuario {

    @ManyToOne
    @JoinColumn(name = "fk_curso")
    private Curso curso;

    @OneToMany(mappedBy = "estagiario")
    @JsonIgnore
    private List<Estagio> estagios;

    private Integer numeroMatricula;

    public Estagiario() {
    }

    public Estagiario(Integer idUsuario, String nome, String email, String senha, Long telefone, Date dataNascimento, Curso curso, List<Estagio> estagios, Integer numeroMatricula) {
        super(idUsuario, nome, email, senha, telefone, dataNascimento);
        this.curso = curso;
        this.estagios = estagios;
        this.numeroMatricula = numeroMatricula;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public List<Estagio> getEstagios() {
        return estagios;
    }

    public void setEstagios(List<Estagio> estagios) {
        this.estagios = estagios;
    }

    public Integer getNumeroMatricula() {
        return numeroMatricula;
    }

    public void setNumeroMatricula(Integer numeroMatricula) {
        this.numeroMatricula = numeroMatricula;
    }
}