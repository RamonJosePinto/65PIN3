package com._PIN3.project.repository;

import com._PIN3.project.model.Atividade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AtividadeRepository extends JpaRepository<Atividade, Integer> {
    List<Atividade> findByEstagio_IdEstagio(Integer idEstagio);

    @Query("SELECT a FROM Atividade a WHERE a.estagio.orientador.idUsuario = :idOrientador")
    List<Atividade> findByEstagioOrientadorId(@Param("idOrientador") Integer idOrientador);

    @Query("SELECT a FROM Atividade a WHERE a.estagio.estagiario.idUsuario = :idEstagiario")
    List<Atividade> findByEstagiarioId(@Param("idEstagiario") Integer idEstagiario);
}