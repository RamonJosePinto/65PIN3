package com._PIN3.project.resources;

import com._PIN3.project.model.Atividade;
import com._PIN3.project.repository.AtividadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atividades")
@CrossOrigin
@Validated
public class AtividadeResource {

    @Autowired
    private AtividadeRepository atividadeRepository;

    @GetMapping
    public ResponseEntity<List<Atividade>> getAllAtividades() {
        List<Atividade> atividades = atividadeRepository.findAll();
        return ResponseEntity.ok().body(atividades);
    }

    @PostMapping
    public ResponseEntity<Atividade> createAtividade(@RequestBody Atividade atividade) {
        Atividade savedAtividade = atividadeRepository.save(atividade);
        return ResponseEntity.status(201).body(savedAtividade);
    }

    @GetMapping("/estagio/{idEstagio}")
    public ResponseEntity<List<Atividade>> getAtividadesByEstagioId(@PathVariable Integer idEstagio) {
        List<Atividade> atividades = atividadeRepository.findByEstagio_IdEstagio(idEstagio);
        return atividades.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(atividades);
    }


}