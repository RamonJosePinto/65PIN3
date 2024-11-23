package com._PIN3.project.repository;

import com._PIN3.project.model.Coordenador;
import com._PIN3.project.model.Estagiario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoordenadorRepository extends JpaRepository<Coordenador, Integer> {
    Optional<Coordenador> findByEmail(String email);
    Optional<Coordenador> findByEmailAndSenha(String email, String senha);
}