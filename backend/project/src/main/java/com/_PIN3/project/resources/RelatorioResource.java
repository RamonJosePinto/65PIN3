package com._PIN3.project.resources;

import com._PIN3.project.model.Atividade;
import com._PIN3.project.model.Estagio;
import com._PIN3.project.model.RelatorioFinal;
import com._PIN3.project.repository.AtividadeRepository;
import com._PIN3.project.repository.EstagioRepository;
import com._PIN3.project.repository.RelatorioFinalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioResource {

    @Autowired
    private EstagioRepository estagioRepository;

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private RelatorioFinalRepository relatorioFinalRepository;

    // Relatório geral de estágios (Coordenador)
    @GetMapping("/estagios")
    public ResponseEntity<List<?>> relatorioGeralEstagios() {
        return ResponseEntity.ok(estagioRepository.findAll());
    }

    // Relatório geral de atividades (Coordenador)
    @GetMapping("/atividades")
    public ResponseEntity<List<?>> relatorioGeralAtividades() {
        return ResponseEntity.ok(atividadeRepository.findAll());
    }

    // Relatório geral de avaliações de relatórios finais (Coordenador)
    @GetMapping("/avaliacoes")
    public ResponseEntity<List<?>> relatorioGeralAvaliacoes() {
        return ResponseEntity.ok(relatorioFinalRepository.findAll());
    }
    // Exemplo de endpoint filtrado por tipo de usuário no RelatorioResource.java

    @GetMapping("/estagios/estagiario/{idEstagiario}")
    public ResponseEntity<List<Estagio>> relatorioEstagiosPorEstagiario(@PathVariable Integer idEstagiario) {
        List<Estagio> estagios = estagioRepository.findByEstagiarioIdUsuario(idEstagiario);
        return ResponseEntity.ok(estagios);
    }

    @GetMapping("/atividades/orientador/{idOrientador}")
    public ResponseEntity<List<Atividade>> relatorioAtividadesPorOrientador(@PathVariable Integer idOrientador) {
        List<Atividade> atividades = atividadeRepository.findByEstagioOrientadorId(idOrientador);
        return ResponseEntity.ok(atividades);
    }

    @GetMapping("/avaliacoes/orientador/{idOrientador}")
    public ResponseEntity<List<RelatorioFinal>> relatorioAvaliacoesPorOrientador(@PathVariable Integer idOrientador) {
        List<RelatorioFinal> avaliacoes = relatorioFinalRepository.findByEstagioOrientadorId(idOrientador);
        return ResponseEntity.ok(avaliacoes);
    }

    @GetMapping("/atividades/estagiario/{idEstagiario}")
    public ResponseEntity<List<Atividade>> relatorioAtividadesPorEstagiario(@PathVariable Integer idEstagiario) {
        List<Atividade> atividades = atividadeRepository.findByEstagiarioId(idEstagiario);
        return ResponseEntity.ok(atividades);
    }

    // Relatório de estágios pelo ID do orientador
    @GetMapping("/estagios/orientador/{idOrientador}")
    public ResponseEntity<List<Estagio>> relatorioEstagiosPorOrientador(@PathVariable Integer idOrientador) {
        List<Estagio> estagios = estagioRepository.findByOrientadorId(idOrientador);
        return ResponseEntity.ok(estagios);
    }

}
