package com._PIN3.project.model;

public class VincularEstagioRequest {
    private Integer estagioId;
    private Integer estagiarioId;
    private Integer companyId;
    private Integer courseId;

    public Integer getEstagioId() {
        return estagioId;
    }

    public void setEstagioId(Integer estagioId) {
        this.estagioId = estagioId;
    }

    public Integer getEstagiarioId() {
        return estagiarioId;
    }

    public void setEstagiarioId(Integer estagiarioId) {
        this.estagiarioId = estagiarioId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
}
