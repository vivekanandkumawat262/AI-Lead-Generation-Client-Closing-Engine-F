// import React, { useEffect, useState } from 'react'
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TodoItem from '../TodoItem';

const Github = () => {
    
    const data = useLoaderData();

    const [todo, setTodo] = useState("")
    const {
      todos,
      addTodo,
       
    } = useAuth()
    const add = (e) => {
      e.preventDefault()
      if (!todo.trim()) return

      addTodo({
        id: Date.now(),
        todo,
        completed: false
      })

      setTodo("")
    }
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch("https://api.github.com/users/vivekanandkumawat262")
    //         .then(res => {
    //         if (!res.ok) {
    //             throw new Error("User not found");
    //         }
    //         return res.json();
    //         })
    //         .then(data => {
    //            console.log("User Data:", data);
    //            setData(data);
    //         })
    //         .catch(err => {
    //            console.error("Error:", err.message);
    //         });
    // }, []);


  return (
    <div className="flex flex-col items-center mt-10 mb-8 gap-6">

  {/* ================= GitHub Profile Card ================= */}
  <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-[360px] text-center border border-gray-700">

    {/* Avatar */}
    <img
      src={data.avatar_url}
      alt={`${data.login} avatar`}
      className="w-36 h-36 rounded-full mx-auto border-4 border-gray-700 shadow-md"
    />

    {/* Name */}
    <h2 className="text-2xl font-semibold mt-4">
      {data.name || "No Name Available"}
    </h2>

    {/* Username */}
    <p className="text-gray-400 text-sm">@{data.login}</p>

    {/* Bio */}
    <p className="mt-3 text-sm text-gray-300 leading-relaxed">
      {data.bio || "No bio available"}
    </p>

    {/* Stats */}
    <div className="flex justify-between mt-6 px-4">
      <div>
        <p className="text-xl font-bold">{data.followers}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Followers
        </p>
      </div>
      <div>
        <p className="text-xl font-bold">{data.following}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Following
        </p>
      </div>
      <div>
        <p className="text-xl font-bold">{data.public_repos}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Repos
        </p>
      </div>
    </div>

    {/* Location */}
    {data.location && (
      <p className="mt-4 text-sm text-gray-300">
        📍 {data.location}
      </p>
    )}

    {/* Profile Button */}
    <a
      href={data.html_url}
      target="_blank"
      rel="noreferrer"
      className="inline-block mt-6 px-6 py-2.5 bg-blue-600 rounded-lg text-sm font-medium
                 hover:bg-blue-700 transition duration-200"
    >
      View GitHub Profile
    </a>
  </div>

  {/* ================= Todo Section ================= */}
  <div className="w-[360px] p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-md">

    {/* Todo Form */}
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
</div>

  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch("https://api.github.com/users/vivekanandkumawat262");
    if (!response.ok) {
        throw new Error("Failed to fetch GitHub user data");
    }
    return response.json();

}