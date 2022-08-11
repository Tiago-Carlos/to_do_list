import 'bootswatch/dist/lux/bootstrap.css';
import React, { Component, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function App () {

  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0);
  let page_size = 6;

  useEffect( () => {
    const getTarefas = async () => {
      const res = await fetch(
        `http://localhost:8080/tarefas?page=0&size=${page_size}`
      );
      const data = await res.json();
      console.log(data.content)
      setItems(data.content);
      setPageCount(data.totalPages)
    };

    getTarefas();
  }, []);

  //console.log(items);

  const fetchTarefas = async (currentPage) => {
    const res = await fetch(
      `http://localhost:8080/tarefas?page=${currentPage}&size=${page_size}`
    );
    const data = await res.json();

    return data.content
  }

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const tarefasFormServer = await fetchTarefas(currentPage);

    setItems(tarefasFormServer)
  }

  return (
    <div className='container'>
      <div className='row m-2'>
              <button type="button" className="btn btn-success">Adicionar Tarefa</button>
        {items.map((item) => {
          let card_type = "card text-white bg-dark text-center"
          let button_text = "completar"
          let button_type = "btn btn-success"
          if (item.completa === true) { 
            card_type = "card text-white bg-success text-center"
            button_text = "descompletar"
            button_type = "btn btn-warning"
          }
          var options = { year: 'numeric', month: 'short', day: 'numeric'};
          const data = new Date(item.prazo).toLocaleDateString([],options);
          const hora = new Date(item.prazo).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          return (
            <div key={item.id} className='col-sm-6 col-md-4 v my-2'>
              <div className={card_type} style={{minHeight: 225}}>
                <div className='card-header'>
                  <p className='card-text'>{data} - {hora}</p>
                </div>
                <div className='card-body'>
                  <h5 className="card-title text-center h2">{item.descricao}</h5>
                  <button type="button" className="btn btn-secondary" onClick={ () => console.log("id: " + item.id)}>Editar</button>
                  <button type="button" className="btn btn-danger">Deletar</button>
                  <button type="button" className={button_type}>{button_text}</button>
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
