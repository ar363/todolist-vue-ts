import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import { nanoid } from "nanoid";

type Todo = { id: string; text: string; isCompleted: boolean };

export const useTodoStore = defineStore("counter", () => {
  const todos: Ref<Todo[]> = ref([]);
  const completedTodos = computed(() =>
    todos.value.filter((todo) => todo.isCompleted === true)
  );
  const incompleteTodos = computed(() =>
    todos.value.filter((todo) => todo.isCompleted !== true)
  );

  const lsKey = "_v_todos";

  function initFromLocalStorage() {
    const lstodos = localStorage.getItem(lsKey);

    if (lstodos === null) {
      todos.value = [];
    } else {
      try {
        todos.value = JSON.parse(lstodos);
      } catch (e) {
        todos.value = [];
      }
    }

    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem(lsKey, JSON.stringify(todos.value));
  }

  function addTodo(text: string) {
    todos.value = [
      ...todos.value,
      {
        id: nanoid(),
        isCompleted: false,
        text,
      },
    ];
    updateLocalStorage();
  }

  function removeTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
    updateLocalStorage();
  }

  function toggleTodo(id: string) {
    todos.value.forEach((todo) => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted;
    });
    updateLocalStorage();
  }

  function clearCompletedTodos() {
    todos.value = todos.value.filter((todo) => todo.isCompleted === false);
  }

  return {
    todos,
    completedTodos,
    incompleteTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    initFromLocalStorage,
    updateLocalStorage,
    clearCompletedTodos,
  };
});
