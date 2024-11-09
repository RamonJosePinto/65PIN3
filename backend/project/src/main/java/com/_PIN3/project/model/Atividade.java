package com._PIN3.project.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "atividade")
public class Atividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAtividade;

    @ManyToOne
    @JoinColumn(name = "fk_estagio", nullable = false)
    private Estagio estagio;

    private Date data;
    private Integer horasTrabalhadas;
    private String descricao;

    public Atividade() {
    }

    public Atividade(Integer idAtividade, Estagio estagio, Date data, Integer horasTrabalhadas, String descricao) {
        this.idAtividade = idAtividade;
        this.estagio = estagio;
        this.data = data;
        this.horasTrabalhadas = horasTrabalhadas;
        this.descricao = descricao;
    }

    public Integer getIdAtividade() {
        return idAtividade;
    }

    public void setIdAtividade(Integer idAtividade) {
        this.idAtividade = idAtividade;
    }

    public Estagio getEstagio() {
        return estagio;
    }

    public void setEstagio(Estagio estagio) {
        this.estagio = estagio;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Integer getHorasTrabalhadas() {
        return horasTrabalhadas;
    }

    public void setHorasTrabalhadas(Integer horasTrabalhadas) {
        this.horasTrabalhadas = horasTrabalhadas;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
