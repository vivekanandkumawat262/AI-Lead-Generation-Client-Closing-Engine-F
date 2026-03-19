import React, {  useState } from 'react'
import { useAuth } from '../context/AuthContext';


const TodoForm = () => {
    const [todo, setTodo] = useState("");
    const { addTodo } = useAuth();

    const add = (e) => {
        e.preventDefault();

        if(!todo) return;

        addTodo({todo, completed: false});
        setTodo("");
    }
  return (
     <form onSubmit={add} className="todo-form">
        <input type="text" placeholder="Add a new todo..." value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button type="submit">Add Todo</button>
     </form>
  )
}

export default TodoForm