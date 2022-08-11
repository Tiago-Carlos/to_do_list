package com.ufla.backend.controller;

import com.ufla.backend.entity.Tarefa;
import com.ufla.backend.service.impl.TarefaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaServiceImpl service;

    @GetMapping
    public ResponseEntity<Page<Tarefa>> getAll(Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<Tarefa> getById (@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id).get());
    }

    @PostMapping
    public ResponseEntity<Tarefa> save (@Valid @RequestBody Tarefa tarefa) {
        return ResponseEntity.ok(service.save(tarefa));
    }

    @DeleteMapping("{id}")
    public void deletar (@PathVariable Long id) {
        service.deleteById(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<Tarefa> update (@PathVariable Long id, @Valid @RequestBody Tarefa tarefa) {
        tarefa.setId(id);
        return ResponseEntity.ok(service.save(tarefa));
    }
}
