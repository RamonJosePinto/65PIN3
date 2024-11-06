package com._PIN3.project.resources;

import com._PIN3.project.model.Empresa;
import com._PIN3.project.model.Supervisor;
import com._PIN3.project.repository.SupervisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supervisor")
@CrossOrigin
@Validated
public class SupervisorResource {

    @Autowired
    private SupervisorRepository supervisorRepository;

    @GetMapping
    public ResponseEntity<List<Supervisor>> getAllSupervisores(){
        List<Supervisor> supervisores = supervisorRepository.findAll();
        return ResponseEntity.ok().body(supervisores);
    }

    @PostMapping
    public ResponseEntity createSupervisor(@RequestBody Supervisor supervisor) {
        Supervisor savedSupervisor = supervisorRepository.save(supervisor);
        System.out.println(supervisor.toString());
        return ResponseEntity.status(200).body(savedSupervisor);
    }
}
