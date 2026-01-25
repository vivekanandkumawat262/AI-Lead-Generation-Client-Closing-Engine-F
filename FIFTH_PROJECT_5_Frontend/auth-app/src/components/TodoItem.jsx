import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
// import { useDispatch, useSelector } from 'react-redux';
const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const {updatedTodo, deleteTodo, toggleComplete}  = useAuth();
     
    
    const editTodo = () => {
        updatedTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false);
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    }

  return (
     <div
  className={`flex items-center justify-between gap-3 p-3 rounded-xl shadow-sm
    transition-all duration-200
    ${
      todo.completed
        ? "bg-green-100 dark:bg-green-900/30"
        : "bg-purple-100 dark:bg-purple-900/30"
    }`}
>
  {/* Left Section */}
  <div className="flex items-center gap-3 flex-1">

    {/* Checkbox */}
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={toggleCompleted}
      className="w-4 h-4 cursor-pointer accent-green-600"
    />

    {/* Todo Text */}
    <input
      type="text"
      value={todoMsg}
      onChange={(e) => setTodoMsg(e.target.value)}
      readOnly={!isTodoEditable}
      className={`flex-1 bg-transparent text-sm
        px-2 py-1 rounded-md
        focus:outline-none
        ${
          todo.completed
            ? "line-through text-gray-400"
            : "text-gray-800 dark:text-gray-100"
        }
        ${
          isTodoEditable
            ? "border border-blue-500 bg-white dark:bg-slate-800"
            : "border border-transparent"
        }`}
    />
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-2">

    {/* Edit / Save */}
    <button
      onClick={() => {
        if (todo.completed) return;

        if (isTodoEditable) {
          editTodo();
        } else {
          setIsTodoEditable(true);
        }
      }}
      disabled={todo.completed}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
        ${
          isTodoEditable
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600"
        }
        ${todo.completed && "opacity-50 cursor-not-allowed"}`}
    >
      {isTodoEditable ? "Save" : "Edit"}
    </button>

    {/* Delete */}
    <button
      onClick={() => deleteTodo(todo.id)}
      className="px-3 py-1.5 rounded-lg text-xs font-medium
                 bg-red-500 text-white hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
</div>

  )
}

export default TodoItem