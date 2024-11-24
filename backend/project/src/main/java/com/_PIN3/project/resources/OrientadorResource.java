package com._PIN3.project.resources;

import com._PIN3.project.model.Curso;
import com._PIN3.project.model.Orientador;
import com._PIN3.project.repository.CursoRepository;
import com._PIN3.project.repository.OrientadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orientadores")
@CrossOrigin
public class OrientadorResource {

    @Autowired
    private OrientadorRepository orientadorRepository;

    @Autowired
    private CursoRepository cursoRepository;

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
        if (orientador.getCurso() != null && orientador.getCurso().getIdCurso() != null) {
            // Busca o curso no banco de dados
            Optional<Curso> cursoOptional = cursoRepository.findById(orientador.getCurso().getIdCurso());
            if (cursoOptional.isPresent()) {
                // Vincula o curso encontrado ao orientador
                orientador.setCurso(cursoOptional.get());
            } else {
                // Retorna erro caso o curso não exista
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            // Retorna erro caso o curso não seja fornecido no payload
            return ResponseEntity.badRequest().body(null);
        }

        // Salva o orientador com o curso vinculado
        Orientador savedOrientador = orientadorRepository.save(orientador);
        return ResponseEntity.status(201).body(savedOrientador);
    }
}