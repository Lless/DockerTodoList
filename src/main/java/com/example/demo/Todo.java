package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("todos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    @Id
    private Integer id;
    private String description;
}
