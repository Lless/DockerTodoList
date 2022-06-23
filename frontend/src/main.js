let messageApi = Vue.resource('http://localhost:8080{?id}');

function getIndex(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return i;
    }
  }
  return -1;
}
Vue.component('todoList', {
  props:['todos'],
  data: function() {
  return {
    todoChangeItem: ''
  }
  },
  template:'<ul class="list-group">' +
    '<todoForm :todos="todos" :editTodo="todoChangeItem" class="my-2"/>' +
    '<todoItem v-for="todo in todos" :todo="todo" :editMethod="edit"' +
    ' :todos="todos" class="mb-1"/>' +
    '</ul>',
  created: function() {
    messageApi.get().then(result =>
      result.json().then(data =>
        data.forEach(todo => this.todos.push(todo))
    ))
  },
  methods: {
    edit: function(todo) {
      this.todoChangeItem=todo;
    }
  }
});


Vue.component('todoItem', {
  props: ['todo', 'editMethod', 'todos'],
  template: '<li class="list-group-item col-4 mx-auto d-flex justify-content-between" >' +
    '<div class="col-form-label">' +
    '{{todo.description}}' +
    '</div>' +
    '<div class="">' +
    '<input type="button" value="Edit" v-on:click="edit" class="btn' +
    ' btn-primary me-2">' +
    '<input type="button" v-on:click="del" class="btn' +
    ' btn-close">' +
    '</div>' +
    '</li>',
  methods: {
    edit: function() {
      this.editMethod(this.todo);
    },
    del: function () {
      messageApi.delete({id: this.todo.id}).then(result => {
        if (result.ok) {
          this.todos.splice(this.todos.indexOf(this.todo), 1)
        }
      })
    }
  }
});


Vue.component('todoForm', {
  props: ['todos', 'editTodo'],
  data: function() {
    return {
      description: '',
      id: ''
    }
  },
  watch: {
    editTodo: function(newVal) {
      this.description = newVal.description
      this.id = newVal.id
    }
  },
  template:'<div class="mx-auto col-4 d-flex justify-content-between">' +
    '<input type="text" placeholder="New todo item" v-model="description"' +
    ' class="form-control me-1">' +
    '<input type="button" value="Save" v-on:click="save" class="btn' +
    ' btn-primary">' +
    '</div>',
  methods: {
    save: async function() {
      if (this.id) {
        messageApi.update({}, {id: this.id, description: this.description}).then(result =>
          result.json().then(data => {
            this.todos.splice(getIndex(this.todos, data.id), 1, data)
            this.description = '';
            this.id = '';
          })
        );
      } else {
        const result = await messageApi.save({}, this.description);


          result.json().then(data => {
            this.todos.push(data);
            this.description = '';
          })
      }
    }
  }
});

let app = new Vue({
  el: '#app',
  template:'<todoList :todos="todos"/>',
  data: {
    todos: []
  }
});