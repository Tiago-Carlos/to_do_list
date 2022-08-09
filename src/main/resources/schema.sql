CREATE TABLE to_do_list.tarefa (
    id bigserial NOT NULL PRIMARY KEY,
    descricao CHARACTER VARYING(200),
    prazo timestamp DEFAULT NOW(),
    completa BOOLEAN DEFAULT FALSE
);