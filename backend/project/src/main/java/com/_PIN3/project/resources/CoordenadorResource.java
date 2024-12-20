package com._PIN3.project.resources;

import com._PIN3.project.model.Coordenador;
import com._PIN3.project.repository.CoordenadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coordenadores")
@CrossOrigin
public class CoordenadorResource {

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @GetMapping
    public ResponseEntity<List<Coordenador>> getAllCoordenadors() {
        List<Coordenador> coordenadores = coordenadorRepository.findAll();
        return ResponseEntity.ok(coordenadores);
    }

    @PostMapping
    public ResponseEntity<Coordenador> createCoordenador(@RequestBody Coordenador coordenador) {
        Coordenador savedCoordenador = coordenadorRepository.save(coordenador);
        return ResponseEntity.status(201).body(savedCoordenador);
    }
    @GetMapping("/email")
    public ResponseEntity<Coordenador> getCoordenadorByEmail(@RequestParam String email) {
        Optional<Coordenador> coordenador = coordenadorRepository.findByEmail(email);
        return coordenador.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}