package com._PIN3.project.resources;

import com._PIN3.project.model.Empresa;
import com._PIN3.project.repository.EmpresaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enterprise")
@CrossOrigin
@Validated
public class EmpresaResource {

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping
    public ResponseEntity<List<Empresa>> getAllEmpresas(){
        List<Empresa> empresas = empresaRepository.findAll();
        return ResponseEntity.ok().body(empresas);
    }

    @PostMapping
    public ResponseEntity createEmpresa(@RequestBody Empresa empresa) {
        Empresa savedEmpresa = empresaRepository.save(empresa);
        System.out.println(empresa.toString());
        return ResponseEntity.status(200).body(savedEmpresa);
    }
}
