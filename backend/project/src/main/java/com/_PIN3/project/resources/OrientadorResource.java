package com._PIN3.project.resources;

import com._PIN3.project.model.Orientador;
import com._PIN3.project.repository.OrientadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orientadores")
@CrossOrigin
public class OrientadorResource {

    @Autowired
    private OrientadorRepository orientadorRepository;

    @GetMapping
    public ResponseEntity<List<Orientador>> getAllOrientadors() {
        List<Orientador> orientadores = orientadorRepository.findAll();
        return ResponseEntity.ok(orientadores);
    }

    @GetMapping("/email")
    public ResponseEntity<Orientador> getOrientadorByEmail(@RequestParam String email) {
        return orientadorRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Orientador> createOrientador(@RequestBody Orientador orientador) {
        Orientador savedOrientador = orientadorRepository.save(orientador);
        return ResponseEntity.status(201).body(savedOrientador);
    }
}