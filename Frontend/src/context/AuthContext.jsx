import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /* ================= AUTH ================= */
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  /* ================= THEME ================= */
  const [themeMode, setThemeMode] = useState("light");

  /* ================= TODOS ================= */
  const [todos, setTodos] = useState([]);

  /* ================= RESTORE ON REFRESH ================= */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");
    const storedTheme = localStorage.getItem("theme");
    const storedTodos = localStorage.getItem("todos");

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    if (storedTheme) {
      setThemeMode(storedTheme);
    }

    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch {
        localStorage.removeItem("todos");
      }
    }
  }, []);

  /* ================= PERSIST AUTH ================= */
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, role, user]);

  /* ================= PERSIST TODOS ================= */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* ================= APPLY THEME ================= */
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  /* ================= AUTH METHODS ================= */
  const login = (token, role, userData) => {
    setToken(token);
    setRole(role);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  /* ================= THEME METHODS ================= */
  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  /* ================= TODO METHODS ================= */
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updatedTodo = (id, updated) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        /* auth */
        token,
        role,
        user,
        login,
        logout,
        setUser,

        /* theme */
        themeMode,
        lightTheme,
        darkTheme,

        /* todos */
        todos,
        addTodo,
        updatedTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext({
//   todos:[
//     { id: 1, todo: "Sample Todo", completed: false },
//   ],
//   addTodo: (todo) => {},
//   updatedTodo: (id, todo) => {},
//   deleteTodo: (id) => {},
//   toggleComplete: (id) => {},
//   themeMode: "light",
//   darkTheme: () => {},
//   lightTheme: () => {},
//   token: null,
//   role: null,
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   /* ---------------- AUTH ---------------- */
//   const [token, setToken] = useState(null);
//   const [role, setRole] = useState(null);
//   const [user, setUser] = useState(null);

//   /* ---------------- THEME ---------------- */
//   const [themeMode, setThemeMode] = useState("light");

//   /* 🔥 Restore state on refresh */
//   useEffect(() => {
//     setToken(localStorage.getItem("token"));
//     setRole(localStorage.getItem("role"));

//     const storedUser = localStorage.getItem("user");
// if (storedUser) {
//   try {
//     setUser(JSON.parse(storedUser));
//   } catch (error) {
//     console.error("Invalid user in localStorage", error);
//     localStorage.removeItem("user");
//   }
// }

//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme) {
//       setThemeMode(storedTheme);
//     }
//   }, []);

//   /* 🔥 Persist user */
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   /* 🔥 Persist & apply theme */
//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(themeMode);
//     localStorage.setItem("theme", themeMode);
//   }, [themeMode]);

//   /* ---------------- METHODS ---------------- */
//   const login = (token, role, userData) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", role);
//     setToken(token);
//     setRole(role);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     setToken(null);
//     setRole(null);
//     setUser(null);
//   };

//   const lightTheme = () => setThemeMode("light");
//   const darkTheme = () => setThemeMode("dark");
  
//   const [todos, setTodos] = useState([]);
//   const addTodo = (todo) => {
//     setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
//   }
//   const updatedTodo = (id, todo) => {
//     setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
//   }

//   const deleteTodo = (id) => {
//     setTodos((prev) => prev.filter((todo) => todo.id !== id))
//   }

//   const toggleComplete = (id) => {
//     setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
//   }

//   useEffect(() => {
//        const todos = JSON.parse(localStorage.getItem("todos"))

//        if(todos && todos.length > 0) {
//         setTodos(todos)
//        }
//   }, [])

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos))
//   }, [todos])

//   return (
//     <AuthContext.Provider
//       value={{
//         todos,
//         addTodo,
//         updatedTodo,
//         deleteTodo,
//         toggleComplete,
//         themeMode,
//         lightTheme,
//         darkTheme,
//         token,
//         role,
//         login,
//         logout,
//         user,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
