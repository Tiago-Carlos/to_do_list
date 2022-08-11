import 'bootswatch/dist/lux/bootstrap.css';
import React, { Component, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

function App() {

  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [tarefaSalvar, setTarefaSalvar] = useState({id: '', descricao: '', prazo: '', completa: false})
  const [tarefaEditar, setTarefaEditar] = useState({id: '', descricao: '', prazo: ''})
  const [inputInvalido, setInputInvalido] = useState({saveInvalido: "", saveMsg: "", editInvalido: "", editMsg: ""})
  let page_size = 9;

  useEffect(() => {
    axios.get(`http://localhost:8080/tarefas?page=0&size=${page_size}&sort=id`)
      .then(res => {
        const data = res.data;
        setItems(data.content);
        setPageCount(data.totalPages)
      });
  }, []);

  // Função responsável por atualizar a página, e mante-lá em uma variável global
  // Quando o valor de currentPage é alterado, essa função roda
  useEffect(() => {
    console.log(currentPage)
    fetchTarefas();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1)
    }
  }, [pageCount]);

  useEffect(() => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1)
    }
  }, [tarefaSalvar]);

  const completeTarefa = async (tarefa) => {
    tarefa.completa = !tarefa.completa;
    console.log(tarefa)
    axios.put(`http://localhost:8080/tarefas/${tarefa.id}`, tarefa)
      .then(res => {
        return fetchTarefas();
      });
  }

  const deleteTarefa = async (tarefa) => {
    axios.delete(`http://localhost:8080/tarefas/${tarefa.id}`)
      .then(res => {
        return fetchTarefas();
      });
  }

  const fetchTarefas = async () => {
    console.log(currentPage)
    const res = await fetch(
      `http://localhost:8080/tarefas?page=${currentPage}&size=${page_size}&sort=id`
    );
    const data = await res.json();
    if (pageCount != data.totalPages) { console.log(pageCount + " - " + data.totalPages); setPageCount(data.totalPages) }
    console.log(data.content.sort((a, b) => a.id - b.id));
    setItems(data.content)
  }

  const saveTarefa = event => {
    event.preventDefault();
    if (tarefaSalvar.descricao === "" || tarefaSalvar.prazo === "") {
      setInputInvalido({saveInvalido: "is-invalid", saveMsg: "Somente o campo ID deve ficar vazio"})
      console.log(inputInvalido)
    }
    else {
      axios.post(`http://localhost:8080/tarefas`, tarefaSalvar)
        .then( res => {
          setInputInvalido({saveInvalido: "", saveMsg: ""})
          return fetchTarefas();
        })
        .catch (err => {
          setInputInvalido({saveInvalido: "is-invalid", saveMsg: err.message})
        });
    }
  }

  const editTarefa = event => {
    event.preventDefault();
    if (tarefaEditar.descricao === "" || tarefaEditar.prazo === "") {
      setInputInvalido({editInvalido: "is-invalid", editMsg: "Somente o campo ID deve ficar vazio"})
    }
    else {
      axios.put(`http://localhost:8080/tarefas/${tarefaEditar.id}`, tarefaEditar)
        .then( res => {
          setTarefaEditar({id: '', descricao: '', prazo: ''});
          setInputInvalido({editInvalido: "", editMsg: ""})
          return fetchTarefas();
        })
        .catch (err => {
          setInputInvalido({editInvalido: "is-invalid", editMsg: err.message})
        });
    }
  }

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected)
  }

  return (
    <div className='container'>
      <div className='row m-2'>
        <div className="col-sm">
          <div className='card text-white bg-dark text-center'>
            <div className='card-header'>
              Adicionar nova tarefa
            </div>
            <div className='card-body'>
              <form onSubmit={saveTarefa}>
                <div className="form-group">
                  <fieldset>
                    <input className="form-control text-center" id="readOnlyInput" type="text" placeholder="ID (Será fornecido automaticamente)" readOnly={true} />
                  </fieldset>
                </div>

                <div className="form-group">
                  <fieldset>
                    <label className="form-label" htmlFor="disabledInput">Descricao</label>
                    <input type="text" className={`form-control text-center ${inputInvalido.saveInvalido}`} placeholder="descricao" id="inputDefault"
                        onChange={event => setTarefaSalvar({id:tarefaSalvar.id, descricao:event.target.value, prazo:tarefaSalvar.prazo})}/>
                    <div className="invalid-feedback">{inputInvalido.saveMsg}</div>
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset>
                    <label className="form-label" htmlFor="disabledInput">Prazo</label>
                    <input type="text" className={`form-control text-center ${inputInvalido.saveInvalido}`} placeholder="yyyy-MM-dd HH:mm" id="inputDefault" 
                        onChange={event => setTarefaSalvar({id:tarefaSalvar.id, descricao:tarefaSalvar.descricao, prazo:event.target.value})}/>
                    <small id="emailHelp" className="form-text text-muted">Não esqueça do espaço entre a data e a hora.</small>
                  </fieldset>
                </div>
                <button type="submit" className="btn btn-success" >Adicionar Tarefa</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className='card text-white bg-dark text-center'>
            <div className='card-header'>
              Editar Tarefa
            </div>
            <div className='card-body'>
              <form onSubmit={editTarefa}>
                <div className="form-group">
                  <fieldset>
                    <input className="form-control text-center" id="readOnlyInput" type="text" placeholder="ID" readOnly={true} value={tarefaEditar["id"]} />
                  </fieldset>
                </div>

                <div className="form-group">
                  <fieldset>
                    <label className="form-label" htmlFor="disabledInput">Descricao</label>
                    <input type="text" className={`form-control text-center ${inputInvalido.editInvalido}`} placeholder="descricao" id="inputDefault" value={tarefaEditar["descricao"]}
                        onChange={event => setTarefaEditar({id:tarefaEditar.id, descricao:event.target.value, prazo:tarefaEditar.prazo})}/>
                      <div className="invalid-feedback">{inputInvalido.editMsg}</div>
                  </fieldset>
                </div>

                <div className="form-group">
                  <fieldset>
                    <label className="form-label" htmlFor="disabledInput">Prazo</label>
                    <input type="text" className={`form-control text-center ${inputInvalido.editInvalido}`} placeholder="yyyy-MM-dd HH:mm" id="inputDefault" value={tarefaEditar["prazo"]}
                        onChange={event => setTarefaEditar({id:tarefaEditar.id, descricao:tarefaEditar.descricao, prazo:event.target.value})}/>
                    <small id="emailHelp" className="form-text text-muted">Não esqueça do espaço entre a data e a hora.</small>
                  </fieldset>
                </div>
                <button type="submit" className="btn btn-success" onClick={() => console.log(tarefaEditar)}>Editar Tarefa</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-2'>
        {items.map((item) => {
          let card_type = "card text-white bg-dark text-center"
          let button_text = "completar"
          let button_type = "btn btn-success"
          if (item.completa === true) {
            card_type = "card text-white bg-success text-center"
            button_text = "resetar"
            button_type = "btn btn-warning"
          }
          var options = { year: 'numeric', month: 'short', day: 'numeric' };
          const data = new Date(item.prazo).toLocaleDateString([], options);
          const hora = new Date(item.prazo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div key={item.id} className='col-sm-6 col-md-4 v my-2'>
              <div className={card_type}>
                <div className='card-header'>
                  <p className='card-text'>{data} - {hora}</p>
                </div>
                <div className='card-body'>
                  <h5 className="card-title text-center">{item.descricao}</h5>
                </div>
                <div className='card-footer'>
                  <button type="button" className="btn btn-secondary" onClick={() => setTarefaEditar(item)}>Editar</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteTarefa(item)}>Deletar</button>
                  <button type="button" className={button_type} onClick={() => completeTarefa(item)}>{button_text}</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        // previousClassName={"page-link"}
        // nextClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>

  )
}

export default App;
