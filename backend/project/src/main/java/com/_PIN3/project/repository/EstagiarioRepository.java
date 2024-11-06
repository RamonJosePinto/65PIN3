package com._PIN3.project.repository;

import com._PIN3.project.model.Estagiario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstagiarioRepository extends JpaRepository<Estagiario, Integer> {
    Optional<Estagiario> findByEmail(String email);
}
