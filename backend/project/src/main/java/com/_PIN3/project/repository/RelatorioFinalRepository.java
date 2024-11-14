package com._PIN3.project.repository;

import com._PIN3.project.model.RelatorioFinal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RelatorioFinalRepository extends JpaRepository<RelatorioFinal, Integer> {
    List<RelatorioFinal> findByStatus(String status); // Busca relatórios pelo status
}
