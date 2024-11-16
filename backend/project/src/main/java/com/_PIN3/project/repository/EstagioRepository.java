package com._PIN3.project.repository;

import com._PIN3.project.model.Estagio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EstagioRepository extends JpaRepository<Estagio, Integer> {
    List<Estagio> findByEstagiarioIdUsuario(Integer idUsuario);
    List<Estagio> findByOrientadorIdUsuario(Integer idUsuario);

    @Query("SELECT e FROM Estagio e WHERE e.orientador.idUsuario = :idOrientador")
    List<Estagio> findByOrientadorId(@Param("idOrientador") Integer idOrientador);
}
