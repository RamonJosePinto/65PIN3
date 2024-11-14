package com._PIN3.project.resources;

import com._PIN3.project.model.RelatorioFinal;
import com._PIN3.project.repository.RelatorioFinalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin
@Validated
public class RelatorioFinalResource {

    @Autowired
    private RelatorioFinalRepository relatorioFinalRepository;

    @GetMapping("/pendentes")
    public ResponseEntity<List<RelatorioFinal>> getRelatoriosPendentes() {
        List<RelatorioFinal> pendentes = relatorioFinalRepository.findByStatus("Pendente");
        return ResponseEntity.ok(pendentes);
    }

    @PostMapping("/submeter")
    public ResponseEntity<RelatorioFinal> submeterRelatorio(@RequestBody RelatorioFinal relatorio) {
        relatorio.setStatus("Pendente"); // Define o status como Pendente
        RelatorioFinal savedRelatorio = relatorioFinalRepository.save(relatorio);
        return ResponseEntity.status(201).body(savedRelatorio);
    }

    @PutMapping("/avaliar/{id}")
    public ResponseEntity<RelatorioFinal> avaliarRelatorio(
            @PathVariable Integer id,
            @RequestBody RelatorioFinal updatedRelatorio) {

        Optional<RelatorioFinal> existingRelatorioOpt = relatorioFinalRepository.findById(id);
        if (existingRelatorioOpt.isPresent()) {
            RelatorioFinal existingRelatorio = existingRelatorioOpt.get();
            existingRelatorio.setNota(updatedRelatorio.getNota());
            existingRelatorio.setComentarioOrientador(updatedRelatorio.getComentarioOrientador());
            existingRelatorio.setStatus(updatedRelatorio.getStatus()); // "Aprovado" ou "Reprovado"
            RelatorioFinal savedRelatorio = relatorioFinalRepository.save(existingRelatorio);
            return ResponseEntity.ok(savedRelatorio);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<RelatorioFinal> getRelatorioById(@PathVariable Integer id) {
        Optional<RelatorioFinal> relatorioOptional = relatorioFinalRepository.findById(id);
        if (relatorioOptional.isPresent()) {
            return ResponseEntity.ok(relatorioOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}