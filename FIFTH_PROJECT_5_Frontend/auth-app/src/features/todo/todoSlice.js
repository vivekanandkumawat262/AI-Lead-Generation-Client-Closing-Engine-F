import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadTodos = () => {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  todos: loadTodos().length
    ? loadTodos()
    : [{ id: nanoid(), text: "Hello World", completed: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload,
        completed: false,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },

    toggleTodo: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
