package com._PIN3.project.repository;

import com._PIN3.project.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
    Optional<Empresa> findById(Integer id);
}
