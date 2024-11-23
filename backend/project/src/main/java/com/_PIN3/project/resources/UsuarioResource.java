package com._PIN3.project.resources;

import com._PIN3.project.model.Usuario;
import com._PIN3.project.repository.CoordenadorRepository;
import com._PIN3.project.repository.EstagiarioRepository;
import com._PIN3.project.repository.OrientadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UsuarioResource {

    @Autowired
    private EstagiarioRepository estagiarioRepository;

    @Autowired
    private OrientadorRepository orientadorRepository;

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @GetMapping("/login")
    public ResponseEntity<Map<String, Object>> authenticate(
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam String role) {

        Usuario usuario = null;

        switch (role.toLowerCase()) {
            case "estagiario":
                usuario = estagiarioRepository.findByEmailAndSenha(email, senha).orElse(null);
                break;
            case "orientador":
                usuario = orientadorRepository.findByEmailAndSenha(email, senha).orElse(null);
                break;
            case "coordenador":
                usuario = coordenadorRepository.findByEmailAndSenha(email, senha).orElse(null);
                break;
            default:
                return ResponseEntity.status(400).body(Map.of("error", "Tipo de usuário inválido"));
        }

        if (usuario != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("idUsuario", usuario.getIdUsuario());
            response.put("nome", usuario.getNome());
            response.put("role", role);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciais inválidas"));
        }
    }
}
