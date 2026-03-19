import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    dispatch(addTodo(input.trim()));
    setInput("");
  };

  return (
    <form
      onSubmit={addTodoHandler}
      className="max-w-md mx-auto mt-6 flex gap-2"
    >
      <input
        type="text"
        placeholder="Add a new todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg text-sm
                   border border-gray-300 dark:border-slate-600
                   bg-white dark:bg-slate-800
                   text-gray-800 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={!input.trim()}
        className="px-5 py-2 rounded-lg text-sm font-medium
                   bg-blue-600 text-white
                   hover:bg-blue-700 transition
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
