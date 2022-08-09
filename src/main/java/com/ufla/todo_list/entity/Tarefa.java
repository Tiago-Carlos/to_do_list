package com.ufla.todo_list.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "tarefa", schema = "to_do_list")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tarefa {
    @Id
    @Column(name = "id")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "prazo")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm")
    private Date prazo;

    @Column(name = "completa")
    private Boolean completa;
}
