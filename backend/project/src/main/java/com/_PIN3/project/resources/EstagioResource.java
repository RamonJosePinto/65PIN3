package com._PIN3.project.resources;

import com._PIN3.project.model.*;
import com._PIN3.project.model.Estagio;
import com._PIN3.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/estagios")
@Validated
public class EstagioResource {

    @Autowired
    EstagioRepository estagioRepository;

    @Autowired
    EstagiarioRepository estagiarioRepository;

    @Autowired
    OrientadorRepository orientadorRepository;

    @Autowired
    EmpresaRepository empresaRepository;

    @Autowired
    CursoRepository cursoRepository;

    @GetMapping
    public ResponseEntity<List<Estagio>> getAllEstagios(){
        List<Estagio> estagios = estagioRepository.findAll();
        return ResponseEntity.ok().body(estagios);
    }

    @PostMapping
    public ResponseEntity<Estagio> createEstagio(@RequestBody Estagio estagio) {
        if (estagio.getEstagiario() != null) {
            estagiarioRepository.findById(estagio.getEstagiario().getIdUsuario())
                    .ifPresent(estagio::setEstagiario);
        }

        if (estagio.getEmpresa() != null) {
            empresaRepository.findById(estagio.getEmpresa().getId())
                    .ifPresent(estagio::setEmpresa);
        }

        orientadorRepository.findById(estagio.getOrientador().getIdUsuario())
                .ifPresent(estagio::setOrientador);

        Estagio savedEstagio = estagioRepository.save(estagio);
        return ResponseEntity.status(201).body(savedEstagio);
    }

    @GetMapping("/estagiario/{idEstagiario}")
    public ResponseEntity<List<Estagio>> getEstagiosByEstagiario(@PathVariable Integer idEstagiario) {
        List<Estagio> estagios = estagioRepository.findByEstagiarioIdUsuario(idEstagiario);
        return estagios.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(estagios);
    }

    @GetMapping("/orientador/{idOrientador}")
    public ResponseEntity<List<Estagio>> getEstagiosByOrientador(@PathVariable Integer idOrientador) {
        List<Estagio> estagios = estagioRepository.findByOrientadorIdUsuario(idOrientador);
        return estagios.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(estagios);
    }

    @GetMapping("/{idEstagio}")
    public ResponseEntity<Estagio> getEstagioById(@PathVariable Integer idEstagio) {
        return estagioRepository.findById(idEstagio)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/vincular")
    public ResponseEntity<?> vincularEstagio(@RequestBody VincularEstagioRequest request) {
        Estagio estagio = estagioRepository.findById(request.getEstagioId()).orElseThrow();
        Estagiario estagiario = estagiarioRepository.findById(request.getEstagiarioId()).orElseThrow();
        Empresa empresa = empresaRepository.findById(request.getCompanyId()).orElseThrow();
        Curso curso = cursoRepository.findById(request.getCourseId()).orElseThrow();

        estagio.setEstagiario(estagiario);
        estagio.setEmpresa(empresa);
        estagiario.setCurso(curso);

        estagioRepository.save(estagio);
        estagiarioRepository.save(estagiario);

        return ResponseEntity.ok("Vinculação concluída");
    }


}
