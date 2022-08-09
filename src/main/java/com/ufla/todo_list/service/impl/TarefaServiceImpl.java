package com.ufla.todo_list.service.impl;

import com.ufla.todo_list.entity.Tarefa;
import com.ufla.todo_list.repository.TarefaRepository;
import com.ufla.todo_list.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TarefaServiceImpl implements TarefaService {

    @Autowired
    private TarefaRepository repository;

    @Override
    public Page<Tarefa> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Optional<Tarefa> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Tarefa save(Tarefa tarefa) {
        return repository.save(tarefa);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Tarefa update(Tarefa tarefa) {
        return repository.save(tarefa);
    }
}
