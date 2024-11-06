package com._PIN3.project.resources;

import com._PIN3.project.model.Estagiario;
import com._PIN3.project.repository.EstagiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estagiarios")
@CrossOrigin
public class EstagiarioResource {

    @Autowired
    private EstagiarioRepository estagiarioRepository;

    @GetMapping
    public ResponseEntity<List<Estagiario>> getAllEstagiarios() {
        List<Estagiario> estagiarios = estagiarioRepository.findAll();
        return ResponseEntity.ok(estagiarios);
    }

    @GetMapping("/email")
    public ResponseEntity<Estagiario> getEstagiarioByEmail(@RequestParam String email) {
        Optional<Estagiario> estagiario = estagiarioRepository.findByEmail(email);
        return estagiario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Estagiario> createEstagiario(@RequestBody Estagiario estagiario) {
        Estagiario savedEstagiario = estagiarioRepository.save(estagiario);
        return ResponseEntity.status(201).body(savedEstagiario);
    }
}