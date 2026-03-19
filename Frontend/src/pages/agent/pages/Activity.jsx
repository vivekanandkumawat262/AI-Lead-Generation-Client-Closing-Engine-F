import { useState } from "react";
import TodoForm from "../../../components/TodoForm";
import { useAuth } from "../../../context/AuthContext";
import TodoItem from "../../../components/TodoItem";
import AddTodo from "../../../components/AddTodo";
import Todos from "../../../components/Todos";

const Activity = () => {
  const [todo, setTodo] = useState("");

  const { todos, addTodo } = useAuth();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({
      id: Date.now(),
      todo,
      completed: false,
    });

    setTodo("");
  };

  return (
    <div className="space-y-10">

      {/* ================= Page Title ================= */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Activity
      </h1>

      {/* ================= TodoForm Component ================= */}
      <TodoForm />

      {/* ================= Context API Todo Section ================= */}
      <div className="w-[360px] p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-md">

        {/* Todo Input Form */}
        <form onSubmit={add} className="flex gap-2">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 rounded-lg text-sm
                       bg-white dark:bg-slate-700
                       border border-gray-300 dark:border-slate-600
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg
                       hover:bg-orange-600 transition text-sm font-medium"
          >
            Add
          </button>
        </form>

        {/* Todo List */}
        <div className="mt-4 space-y-2">
          {todos.length === 0 ? (
            <p className="text-sm text-gray-400 text-center">
              No todos yet 🚀
            </p>
          ) : (
            todos.map((t) => (
              <TodoItem key={t.id} todo={t} />
            ))
          )}
        </div>
      </div>

      {/* ================= Redux Section ================= */}
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Learn about redux toolkit
      </h1>

      <AddTodo />
      <Todos />
    </div>
  );
};

export default Activity;
