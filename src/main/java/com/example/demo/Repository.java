package com.example.demo;

import org.springframework.data.repository.CrudRepository;

@org.springframework.stereotype.Repository
interface Repository extends CrudRepository<Todo, Integer> {

}
