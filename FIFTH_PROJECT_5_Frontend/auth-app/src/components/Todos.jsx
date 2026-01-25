import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  updateTodo,
  toggleTodo,
} from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  if (!todos || todos.length === 0) {
    return (
      <div className="mt-6 text-center text-sm text-gray-400">
        No todos yet 🚀
      </div>
    );
  }

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    dispatch(updateTodo({ id, text: editText.trim() }));
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="mt-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Your Todos
      </h2>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3
                       bg-white dark:bg-slate-800
                       border border-gray-200 dark:border-slate-700
                       rounded-xl px-4 py-3 shadow-sm
                       hover:shadow-md transition"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className="w-4 h-4 accent-green-600 cursor-pointer"
            />

            {/* Todo Text / Input */}
            {editId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 text-sm rounded-md
                           border border-blue-500
                           bg-white dark:bg-slate-700
                           focus:outline-none"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {todo.text}
              </span>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              {editId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium
                             bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(todo)}
                  disabled={todo.completed}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                    ${
                      todo.completed
                        ? "bg-gray-300 dark:bg-slate-600 cursor-not-allowed opacity-50"
                        : "bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600"
                    }`}
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="px-3 py-1.5 rounded-lg text-xs font-medium
                           bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
