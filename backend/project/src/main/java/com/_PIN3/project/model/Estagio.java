package com._PIN3.project.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "estagio")
public class Estagio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEstagio;

    @ManyToOne
    @JoinColumn(name = "fk_estagiario")
    @Nullable
    private Estagiario estagiario;

    @ManyToOne
    @JoinColumn(name = "fk_orientador", nullable = false)
    private Orientador orientador;

    @ManyToOne
    @JoinColumn(name = "fk_empresa")
    @Nullable
    private Empresa empresa;

    private Date duracaoInicio;
    private Date duracaoFim;
    private String tipo;
    private String descricao;
    private String requisitos;


    public Estagio() {
    }

    public Estagio(Integer idEstagio, Estagiario estagiario, Orientador orientador, Empresa empresa, Date duracaoInicio, Date duracaoFim, String tipo, String descricao, String requisitos) {
        this.idEstagio = idEstagio;
        this.estagiario = estagiario;
        this.orientador = orientador;
        this.empresa = empresa;
        this.duracaoInicio = duracaoInicio;
        this.duracaoFim = duracaoFim;
        this.tipo = tipo;
        this.descricao = descricao;
        this.requisitos = requisitos;
    }

    public Integer getIdEstagio() {
        return idEstagio;
    }

    public void setIdEstagio(Integer idEstagio) {
        this.idEstagio = idEstagio;
    }

    public Estagiario getEstagiario() {
        return estagiario;
    }

    public void setEstagiario(Estagiario estagiario) {
        this.estagiario = estagiario;
    }

    public Orientador getOrientador() {
        return orientador;
    }

    public void setOrientador(Orientador orientador) {
        this.orientador = orientador;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public Date getDuracaoInicio() {
        return duracaoInicio;
    }

    public void setDuracaoInicio(Date duracaoInicio) {
        this.duracaoInicio = duracaoInicio;
    }

    public Date getDuracaoFim() {
        return duracaoFim;
    }

    public void setDuracaoFim(Date duracaoFim) {
        this.duracaoFim = duracaoFim;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getRequisitos() {
        return requisitos;
    }

    public void setRequisitos(String requisitos) {
        this.requisitos = requisitos;
    }
}

