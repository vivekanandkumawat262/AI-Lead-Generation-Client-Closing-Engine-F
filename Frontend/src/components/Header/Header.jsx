import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const {
    user,
    token,
    logout,
    themeMode,
    lightTheme,
    darkTheme
  } = useAuth();
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    authLogout();
    navigate("/", { replace: true });
  };
  const onChangeBtn = (e) => {
    e.currentTarget.checked ? darkTheme() : lightTheme();
  };

  const NAV_ITEMS = [
    {
      label: "Home",
      path: "/",
      dropdown: [
        { label: "Overview", path: "/" },
        { label: "Updates", path: "/updates" }
      ]
    },
    {
      label: "Product",
      path: "/product",
      dropdown: [
        { label: "Features", path: "/product#features" },
        { label: "Integrations", path: "/product#integrations" },
        { label: "Roadmap", path: "/product#roadmap" }
      ]
    },
    { label: "Pricing", path: "/pricing", dropdown: null },
    {
      label: "Technology",
      path: "/technology",
      dropdown: [
        { label: "Architecture", path: "/technology#architecture" },
        { label: "Security", path: "/technology#security" }
      ]
    },
    {
      label: "Contact Us",
      path: "/contact-us",
      dropdown: [
        { label: "Support", path: "/contact-us#support" },
        { label: "Sales", path: "/contact-us#sales" }
      ]
    },
    {
      label: "Github",
      path: "/github",
      dropdown: [
        { label: "Profile", path: "/github" },
        { label: "Repositories", path: "/github#repos" }
      ]
    }
  ];

  const dashboardPath =
    user?.role === "ADMIN" ? "/admin/dashboard" : "/agent/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative group">

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition ${
                      isActive
                        ? "text-orange-500"
                        : "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                    }`
                  }
                >
                  {item.label}
                  {item.dropdown && (
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </NavLink>

                {item.dropdown && (
                  <ul className="absolute left-0 mt-2 w-44 rounded-lg bg-white dark:bg-slate-800
                                shadow-lg border border-slate-200 dark:border-slate-700
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                transition-all duration-200 z-50">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.label}>
                        <NavLink
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200
                                    hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {!token ? (
              <>
                <Link to="/login" className="text-sm font-medium">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to={dashboardPath}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                  Dashboard
                </NavLink>

                 
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </>
            )}

            {/* Theme Toggle */}
            <label className="relative inline-flex cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={themeMode === "dark"}
                onChange={onChangeBtn}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full
                            after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all" />
            </label>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;


// import React, { useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import logo from '../../assets/logo1.png'
// import { useAuth } from '../../context/AuthContext'
// import TodoItem from '../TodoItem'

// const Header = () => {
 

//   const {
//     todos,
//     addTodo,
//     themeMode,
//     lightTheme,
//     darkTheme
//   } = useAuth()

//   const token = localStorage.getItem("token")

//   const onChangeBtn = (e) => {
//     e.currentTarget.checked ? darkTheme() : lightTheme()
//   }

 

//   const NAV_ITEMS = [
//     {
//       label: "Home",
//       path: "/",
//       dropdown: [
//         { label: "Overview", path: "/" },
//         { label: "Updates", path: "/updates" }
//       ]
//     },
//     {
//       label: "Product",
//       path: "/product",
//       dropdown: [
//         { label: "Features", path: "/product#features" },
//         { label: "Integrations", path: "/product#integrations" },
//         { label: "Roadmap", path: "/product#roadmap" }
//       ]
//     },
//     { label: "Pricing", path: "/pricing", dropdown: null },
//     {
//       label: "Technology",
//       path: "/technology",
//       dropdown: [
//         { label: "Architecture", path: "/technology#architecture" },
//         { label: "Security", path: "/technology#security" }
//       ]
//     },
//     {
//       label: "Contact Us",
//       path: "/contact-us",
//       dropdown: [
//         { label: "Support", path: "/contact-us#support" },
//         { label: "Sales", path: "/contact-us#sales" }
//       ]
//     },
//     {
//       label: "Github",
//       path: "/github",
//       dropdown: [
//         { label: "Profile", path: "/github" },
//         { label: "Repositories", path: "/github#repos" }
//       ]
//     }
//   ]

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b">
//       <nav className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <img src={logo} alt="Logo" className="h-8" />
//           </Link>

//           {/* Desktop Nav */}
//           {/* <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
//             {NAV_ITEMS.map(item => (
//               <li key={item.label} className="relative group">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-orange-500"
//                       : "text-slate-700 dark:text-slate-200 hover:text-slate-900"
//                   }
//                 >
//                   {item.label}
//                 </NavLink>

//                 {item.dropdown && (
//                   <ul className="absolute left-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
//                     {item.dropdown.map(sub => (
//                       <li key={sub.label}>
//                         <NavLink
//                           to={sub.path}
//                           className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
//                         >
//                           {sub.label}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul> */}
//           <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
//                     {NAV_ITEMS.map((item) => (
//                         <li key={item.label} className="relative group">

//                         {/* Top-level link */}
//                         <NavLink
//                             to={item.path}
//                             className={({ isActive }) =>
//                             `flex items-center gap-1 transition ${
//                                 isActive
//                                 ? "text-orange-500"
//                                 : "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
//                             }`
//                             }
//                         >
//                             {item.label}

//                             {/* Dropdown arrow */}
//                             {item.dropdown && (
//                             <svg
//                                 className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                             </svg>
//                             )}
//                         </NavLink>

//                         {/* Dropdown menu */}
//                         {item.dropdown && (
//                             <ul className="absolute left-0 mt-2 w-44 rounded-lg bg-white dark:bg-slate-800
//                                         shadow-lg border border-slate-200 dark:border-slate-700
//                                         opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                                         transition-all duration-200 z-50">
//                             {item.dropdown.map((subItem) => (
//                                 <li key={subItem.label}>
//                                 <NavLink
//                                     to={subItem.path}
//                                     className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200
//                                             hover:bg-slate-100 dark:hover:bg-slate-700"
//                                 >
//                                     {subItem.label}
//                                 </NavLink>
//                                 </li>
//                             ))}
//                             </ul>
//                         )}

//                         </li>
//                     ))}
//                 </ul>

//           {/* Right Section */}
//           <div className="flex items-center gap-4">

//             {!token ? (
//               <>
//                 <Link to="/login">Log in</Link>
//                 <Link
//                   to="/signup"
//                   className="bg-orange-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             ) : (
//               <NavLink
//                 to={localStorage.getItem("role") === "ADMIN"
//                   ? "/admin/dashboard"
//                   : "/agent/dashboard"}
//                 className="bg-orange-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Dashboard
//               </NavLink>
//             )}

//             {/* Theme Toggle */}
//             <label className="relative inline-flex cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={themeMode === "dark"}
//                 onChange={onChangeBtn}
//               />
//               <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all" />
//             </label>
//           </div>
//         </div>

//         {/* TODO SECTION */}
       

//       </nav>
//     </header>
//   )
// }

// export default Header



// // import React, { useState } from 'react'
// // import { Link, NavLink } from 'react-router-dom'
// // import logo from '../../assets/logo1.png'
// // import { useAuth } from '../../context/AuthContext'
// // import TodoItem from '../TodoItem'

// // const Header = () => {
  
// //   return (
// //     <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b">
// //       <nav className="max-w-7xl mx-auto px-6">
// //         <div className="flex items-center justify-between h-16">

// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-2">
// //             <img src={logo} alt="Logo" className="h-8" />
// //           </Link>

// //           {/* Auth */}
// //           <div className="flex items-center gap-4">
// //             {!token ? (
// //               <>
// //                 <Link to="/login">Log in</Link>
// //                 <Link
// //                   to="/signup"
// //                   className="bg-orange-500 text-white px-4 py-2 rounded-lg"
// //                 >
// //                   Get Started
// //                 </Link>
// //               </>
// //             ) : (
// //               <NavLink
// //                 to={localStorage.getItem("role") === "ADMIN"
// //                   ? "/admin/dashboard"
// //                   : "/agent/dashboard"}
// //                 className="bg-orange-500 text-white px-4 py-2 rounded-lg"
// //               >
// //                 Dashboard
// //               </NavLink>
// //             )}

// //             {/* Theme Toggle */}
// //             <label className="inline-flex items-center cursor-pointer">
// //               <input
// //                 type="checkbox"
// //                 className="sr-only peer"
// //                 checked={themeMode === "dark"}
// //                 onChange={onChangeBtn}
// //               />
// //               <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all"></div>
// //             </label>
// //           </div>
// //         </div>

      
// //       </nav>
// //     </header>
// //   )
// // }

// // export default Header



// import React from 'react'
// import { Link, NavLink} from 'react-router-dom'
// import logo from '../../assets/logo1.png';
// import { useAuth } from '../../context/AuthContext';
// import TodoForm from '../TodoForm';
// import TodoItem from '../TodoItem';
// // import { useNavigate } from 'react-router-dom';
// const {}  = useAuth();
// const Header = () => {
//     const [todo, setTodo] = useState("")

//   const {
//     todos,
//     addTodo,
//     themeMode,
//     lightTheme,
//     darkTheme
//   } = useAuth()

// //   const onChangeBtn = (e) => {
// //     e.currentTarget.checked ? darkTheme() : lightTheme()
// //   }

//   const add = (e) => {
//     e.preventDefault()
//     if (!todo.trim()) return

//     addTodo({
//       id: Date.now(),
//       todo,
//       completed: false
//     })

//     setTodo("")
//   }

// //   const token = localStorage.getItem("token")

//     // const [todo, setTodo] = useState("");
//     // const { updatedTodo, deleteTodo, toggleComplete,addTodo ,  themeMode, lightTheme, darkTheme } = useAuth();
//     const onChangeBtn = (e) => {
//         const darkModeStatus = e.currentTarget.checked;
//         if(darkModeStatus){
//             darkTheme();
//         } else {
//             lightTheme();
//         }
//     }
//     // const add = (e) => {
//     //     e.preventDefault();

//     //     if(!todo) return;

//     //     addTodo({todo, completed: false});
//     //     setTodo("");
//     // }
//     // const navigate = useNavigate();
//     const token = localStorage.getItem("token");
//     const NAV_ITEMS = [
//         {
//             label: "Home",
//             path: "/",
//             dropdown: [
//             { label: "Overview", path: "/" },
//             { label: "Updates", path: "/updates" },
//             ],
//         },
//         {
//             label: "Product",
//             path: "/product",
//             dropdown: [
//             { label: "Features", path: "/product#features" },
//             { label: "Integrations", path: "/product#integrations" },
//             { label: "Roadmap", path: "/product#roadmap" },
//             ],
//         },
//         {
//             label: "Pricing",
//             path: "/pricing",
//             dropdown: null,
//         },
//         {
//             label: "Technology",
//             path: "/technology",
//             dropdown: [
//             { label: "Architecture", path: "/technology#architecture" },
//             { label: "Security", path: "/technology#security" },
//             ],
//         },
//         {
//             label: "Contact Us",
//             path: "/contact-us",
//             dropdown: [
//             { label: "Support", path: "/contact-us#support" },
//             { label: "Sales", path: "/contact-us#sales" },
//             ],
//         },
//         {
//             label: "Github",
//             path: "/github",
//             dropdown: [
//             { label: "Profile", path: "/github" },
//             { label: "Repositories", path: "/github#repos" },
//             ],
//         },
//     ];


//   return ( 
//         <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
//             <nav className="max-w-7xl mx-auto px-6">
//                 <div className="flex items-center justify-between h-16">

//                 {/* Logo */}
//                 <Link to="/" className="flex items-center gap-2">
//                     <img
//                     src={logo}
//                     alt="Logo"
//                     className="h-8 w-auto"
//                     />
//                     {/* <span className="font-semibold text-slate-900 text-lg">
//                     LeadAI
//                     </span> */}
//                 </Link>

//                 {/* Desktop Nav */}
                


//                 {/* Auth Buttons */}
//                 <div className="hidden md:flex items-center gap-4">
//                     {!token ? (
//                         <>
//                             <Link to="/login" >Log in</Link>
//                             <Link to="/signup" className='inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition'>Get Started</Link>
//                         </>
//                     ) : (
// //   <Link
// //     to={localStorage.getItem("role") === "ADMIN"
// //       ? "/admin/dashboard"
// //       : "/agent/dashboard"}
// //   >
// //     Dashboard
// //   </Link>
  
//           <NavLink
//                 to={localStorage.getItem("role") === "ADMIN"
//       ? "/admin/dashboard"
//       : "/agent/dashboard"}
//                             className={({ isActive }) =>
//                             `transition ${
//                                 isActive
//                                 ? "inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//                                 : "inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//                             }`
//                             }
//                         >
//                             Dashboard
//                         </NavLink>
// )}

//                    {/* <Link
//                     to="/login"
//                     className="text-sm font-medium text-slate-700 hover:text-slate-900 transition"
//                     >
//                     Log In
//                     </Link>
//                     <Link
//                     to="/signup"
//                     className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition shadow-sm"
//                     >
//                     Get Started
//                     </Link> */}
//                 </div>
                
//                  {/* Right Section */}
//                <div className="flex items-center gap-4">

//                     {/* 🌙 Theme Toggle */}
//                     <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                         type="checkbox"
//                         className="sr-only peer"
//                         checked={themeMode === "dark"}
//                         onChange={onChangeBtn}
//                     />
//                     <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700
//                         peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px]
//                         after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all">
//                     </div>
//                     </label>
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <button className="md:hidden p-2 rounded-lg hover:bg-slate-100">
//                     <svg
//                     className="h-6 w-6 text-slate-800"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                 </button>
               
//                <div> <form onSubmit={add} className="todo-form">
//         <input type="text" placeholder="Add a new todo..." value={todo} onChange={(e) => setTodo(e.target.value)} />
//         <button type="submit">Add Todo</button>
//      </form></div>
//                <div>
//                      {todos.map((todo) => (
//                         <div key={todo.id}>
//                             <TodoItem todo={todo}/>
//                         </div>
//                      ))}
//                </div>


//                 </div>
                
                
//             </nav>
             
//             {/* 🔽 TODO SECTION */}
//         <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
//           <form onSubmit={add} className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Add a new todo..."
//               value={todo}
//               onChange={(e) => setTodo(e.target.value)}
//               className="flex-1 px-3 py-2 rounded-md"
//             />
//             <button
//               type="submit"
//               className="bg-orange-500 text-white px-4 rounded-md"
//             >
//               Add
//             </button>
//           </form>

//           <div className="mt-3 space-y-2">
//             {todos.length === 0 && (
//               <p className="text-sm text-gray-400">No todos yet</p>
//             )}

//             {todos.map((t) => (
//               <TodoItem key={t.id} todo={t} />
//             ))}
//           </div>
//         </div>            
                
//         </header>

//   )
// }

// // export default Header