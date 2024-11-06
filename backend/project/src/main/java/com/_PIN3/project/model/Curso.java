package com._PIN3.project.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCurso;

    private String nome;
    private String campus;

    @OneToMany(mappedBy = "curso")
    private List<Estagiario> estagiarios;

    @OneToMany(mappedBy = "curso")
    private List<Orientador> orientadores;

    @OneToMany(mappedBy = "curso")
    private List<Coordenador> coordenadores;

    public Curso() {
    }

    public Curso(Integer idCurso, String nome, String campus, List<Estagiario> estagiarios, List<Orientador> orientadores, List<Coordenador> coordenadores) {
        this.idCurso = idCurso;
        this.nome = nome;
        this.campus = campus;
        this.estagiarios = estagiarios;
        this.orientadores = orientadores;
        this.coordenadores = coordenadores;
    }

    public Integer getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public List<Estagiario> getEstagiarios() {
        return estagiarios;
    }

    public void setEstagiarios(List<Estagiario> estagiarios) {
        this.estagiarios = estagiarios;
    }

    public List<Orientador> getOrientadores() {
        return orientadores;
    }

    public void setOrientadores(List<Orientador> orientadores) {
        this.orientadores = orientadores;
    }

    public List<Coordenador> getCoordenadores() {
        return coordenadores;
    }

    public void setCoordenadores(List<Coordenador> coordenadores) {
        this.coordenadores = coordenadores;
    }
}
