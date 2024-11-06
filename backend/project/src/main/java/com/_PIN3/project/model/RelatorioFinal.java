package com._PIN3.project.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "relatorio_final")
public class RelatorioFinal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRelatorioFinal;

    @ManyToOne
    @JoinColumn(name = "fk_estagio", nullable = false)
    private Estagio estagio;

    private Date dataSubmissao;
    private String comentarioOrientador;
    private String status;
    private Integer nota;

    public RelatorioFinal() {
    }

    public RelatorioFinal(Integer idRelatorioFinal, Estagio estagio, Date dataSubmissao, String comentarioOrientador, String status, Integer nota) {
        this.idRelatorioFinal = idRelatorioFinal;
        this.estagio = estagio;
        this.dataSubmissao = dataSubmissao;
        this.comentarioOrientador = comentarioOrientador;
        this.status = status;
        this.nota = nota;
    }

    public Integer getIdRelatorioFinal() {
        return idRelatorioFinal;
    }

    public void setIdRelatorioFinal(Integer idRelatorioFinal) {
        this.idRelatorioFinal = idRelatorioFinal;
    }

    public Estagio getEstagio() {
        return estagio;
    }

    public void setEstagio(Estagio estagio) {
        this.estagio = estagio;
    }

    public Date getDataSubmissao() {
        return dataSubmissao;
    }

    public void setDataSubmissao(Date dataSubmissao) {
        this.dataSubmissao = dataSubmissao;
    }

    public String getComentarioOrientador() {
        return comentarioOrientador;
    }

    public void setComentarioOrientador(String comentarioOrientador) {
        this.comentarioOrientador = comentarioOrientador;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }
}
