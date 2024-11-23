package com._PIN3.project.repository;

import com._PIN3.project.model.RelatorioFinal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RelatorioFinalRepository extends JpaRepository<RelatorioFinal, Integer> {
    List<RelatorioFinal> findByStatus(String status); // Busca relatórios pelo status

    @Query("SELECT r FROM RelatorioFinal r WHERE r.estagio.estagiario.idUsuario = :idEstagiario")
    List<RelatorioFinal> findByEstagiarioId(@Param("idEstagiario") Integer idEstagiario);

    @Query("SELECT r FROM RelatorioFinal r WHERE r.estagio.orientador.idUsuario = :idOrientador")
    List<RelatorioFinal> findByEstagioOrientadorId(@Param("idOrientador") Integer idOrientador);

    @Query("SELECT r FROM RelatorioFinal r WHERE r.status = 'Pendente' AND r.estagio.orientador.idUsuario = :idOrientador")
    List<RelatorioFinal> findPendentesByOrientadorId(@Param("idOrientador") Integer idOrientador);

    @Query("SELECT r FROM RelatorioFinal r WHERE r.estagio.idEstagio = :idEstagio")
    Optional<RelatorioFinal> findByEstagioId(@Param("idEstagio") Integer idEstagio);
}
