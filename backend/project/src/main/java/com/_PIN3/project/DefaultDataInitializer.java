package com._PIN3.project;

import com._PIN3.project.model.Coordenador;
import com._PIN3.project.repository.CoordenadorRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DefaultDataInitializer {

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @PostConstruct
    public void initializeDefaultData() {
        String defaultEmail = "coordenador@email.com";
        if (coordenadorRepository.findByEmail(defaultEmail).isEmpty()) {
            Coordenador defaultCoordenador = new Coordenador();
            defaultCoordenador.setNome("Coordenador Padrão");
            defaultCoordenador.setEmail(defaultEmail);
            defaultCoordenador.setSenha("123456"); // Defina uma senha padrão segura
            defaultCoordenador.setTelefone(123456789L);
            defaultCoordenador.setDataNascimento(new Date(0)); // Data fictícia
            coordenadorRepository.save(defaultCoordenador);
            System.out.println("Coordenador padrão criado com sucesso.");
        } else {
            System.out.println("Coordenador padrão já existe.");
        }
    }
}
