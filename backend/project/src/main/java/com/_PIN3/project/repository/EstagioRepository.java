package com._PIN3.project.repository;

import com._PIN3.project.model.Estagio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstagioRepository extends JpaRepository<Estagio, Integer> {
    List<Estagio> findByEstagiarioIdUsuario(Integer idUsuario);
    List<Estagio> findByOrientadorIdUsuario(Integer idUsuario);
}
