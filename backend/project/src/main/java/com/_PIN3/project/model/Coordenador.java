package com._PIN3.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "coordenador")
public class Coordenador extends Usuario {

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "fk_curso")
    private Curso curso;

    public Coordenador() {
    }

    public Coordenador(Integer idUsuario, String nome, String email, String senha, Long telefone, Date dataNascimento) {
        super(idUsuario, nome, email, senha, telefone, dataNascimento);
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }
}