<script setup lang="ts">
import { useTodoStore } from "@/stores/todo";
import { ref } from "vue";

const todoStore = useTodoStore();
todoStore.initFromLocalStorage();

let currentTodoInp = ref("");

function addTodo() {
  const text = currentTodoInp.value;
  currentTodoInp.value = "";

  if (text.trim() !== "") {
    todoStore.addTodo(text);
  }
}
</script>

<template>
  <main>
    <h1>Todos</h1>
    <ul class="todos" v-for="todo in todoStore.todos">
      <li class="todo">
        <input
          type="checkbox"
          name="isCompleted"
          :id="todo.id"
          :checked="todo.isCompleted"
          @change="todoStore.toggleTodo(todo.id)"
        />
        <label
          :for="todo.id"
          :class="todo.isCompleted ? 'completed' : 'incomplete'"
          >{{ todo.text }}</label
        >
      </li>
    </ul>

    <form @submit.prevent="addTodo">
      <label for="add">Add todo</label>
      <input type="text" name="add" id="add" v-model="currentTodoInp" />
      <button type="submit">Add</button>
    </form>

    <button @click="todoStore.clearCompletedTodos()">
      Clear completed todos
    </button>
  </main>
</template>

<style scoped>
label.completed {
  color: hsl(246, 8%, 24%);
  text-decoration: line-through;
}
</style>
