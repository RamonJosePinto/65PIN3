package com._PIN3.project.repository;

import com._PIN3.project.model.Orientador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrientadorRepository extends JpaRepository<Orientador, Integer> {
    Optional<Orientador> findByEmail(String email);
}
