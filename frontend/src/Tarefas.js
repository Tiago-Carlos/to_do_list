import React from 'react'

const Tarefas = ({ tarefas }) => {
  return (
    <div>
      <center><h1>Contact List</h1></center>
      {tarefas.map((tarefa) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{tarefa.descricao}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{tarefa.prazo}</h6>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Tarefas