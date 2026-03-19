import { useNavigate } from "react-router-dom";


function LogoutButton(){
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <button onClick={logout}>Logout</button>
    )
}
export default LogoutButton;

// function Logout(){
// 	// setUser(null);
//     localStorage.removeItem("token");
//     window.localtion.href = "/login";
//     return null;
// };

// export default Logout;