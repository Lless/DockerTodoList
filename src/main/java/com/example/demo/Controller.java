package com.example.demo;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController("/")
@CrossOrigin
@AllArgsConstructor
public class Controller {
    private final Repository repository;

    @GetMapping
    public List<Todo> getAll() {
        final List<Todo> result = new ArrayList<>();
        repository.findAll().forEach(result::add);
        return result;
    }

    @GetMapping("/{id}")
    public Todo get(@PathVariable final int id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public Todo create(@RequestBody final String decription) {
        return repository.save(new Todo(null, decription));
    }

    @PutMapping
    public Todo update(@RequestBody final Todo todo) {
        return repository.save(todo);
    }

    @DeleteMapping
    public void delete(@RequestParam final int id) {
        repository.deleteById(id);
    }
}
