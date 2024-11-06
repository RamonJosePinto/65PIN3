package com._PIN3.project.resources;

import com._PIN3.project.model.RelatorioFinal;
import com._PIN3.project.repository.RelatorioFinalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin
@Validated
public class RelatorioFinalResource {

    @Autowired
    private RelatorioFinalRepository relatorioFinalRepository;

    @GetMapping
    public ResponseEntity<List<RelatorioFinal>> getAllRelatorios() {
        List<RelatorioFinal> relatorios = relatorioFinalRepository.findAll();
        return ResponseEntity.ok().body(relatorios);
    }

    @PostMapping
    public ResponseEntity<RelatorioFinal> createRelatorio(@RequestBody RelatorioFinal relatorioFinal) {
        RelatorioFinal savedRelatorio = relatorioFinalRepository.save(relatorioFinal);
        return ResponseEntity.status(201).body(savedRelatorio);
    }
}