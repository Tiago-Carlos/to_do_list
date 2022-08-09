package com.ufla.todo_list.service;

import com.ufla.todo_list.entity.Tarefa;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface TarefaService {

    public Page<Tarefa> findAll(Pageable pageable);

    public Optional<Tarefa> getById(Long id);

    public Tarefa save(Tarefa tarefa);

    void deleteById(Long id);

    Tarefa update(Tarefa tarefa);
}
