package com._PIN3.project.repository;

import com._PIN3.project.model.Atividade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AtividadeRepository extends JpaRepository<Atividade, Integer> {
    List<Atividade> findByEstagio_IdEstagio(Integer idEstagio);
}