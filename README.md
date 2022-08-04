# Segundo trabalho da disciplina Sistemas Distribuidos
## Implementação de uma to do list

O objetivo deste trabalho é implementar um sistema de gerenciamento de tarefas  (to do list), conforme especificado a seguir. O sistema deve ter pelo menos dois componentes: uma cliente e um serviço web com uma API REST.

### Modelo de dados

Para este sistema de gerenciamento de tarefas, a entidade "tarefa" deve ter os seguintes atributos:

* Identificador: código que identifica de forma única a tarefa.
* Descrição: informação textual que descreve a tarefa.
* Prazo: data/hora que informa o limite para completar a tarefa.
* Completa: valor lógico que define se a tarefa já foi completada.

### Funcionalidades da API
  - Get /tarefas: retornar uma lista com todas as tarefas.
  - Get /tarefas/{identificador}: retornar a tarefa correspondente ao identificador.
  - Post /tarefas: incluir uma tarefa; os dados da tarefa devem ser passados no corpo da requisição HTTP.
  - Delete /tarefas/{identificador}: excluir a tarefa correspondente ao identificador.
  - Put /tarefas/{identificador}: alterar os dados da tarefa correspondente ao identificador; os novos dados devem ser passados no corpo da requisição HTTP.
