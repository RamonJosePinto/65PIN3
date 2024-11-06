package com._PIN3.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orientador")
public class Orientador extends Usuario {

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "fk_curso")
    private Curso curso;

    @OneToMany(mappedBy = "orientador")
    @JsonIgnore
    private List<Estagio> estagios;

    private String especializacao;

    public Orientador() {
    }

    public Orientador(Integer idUsuario, String nome, String email, String senha, Long telefone, Date dataNascimento, Curso curso, List<Estagio> estagios, String especializacao) {
        super(idUsuario, nome, email, senha, telefone, dataNascimento);
        this.curso = curso;
        this.estagios = estagios;
        this.especializacao = especializacao;
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

    public String getEspecializacao() {
        return especializacao;
    }

    public void setEspecializacao(String especializacao) {
        this.especializacao = especializacao;
    }
}
