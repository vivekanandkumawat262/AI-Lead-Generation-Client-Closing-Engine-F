import React from 'react'; 
import { AuthProvider } from '../../../context/AuthContext';
import { useAuth } from '../../../context/AuthContext';

function Profile() {
    const { user } = useAuth(); 
    localStorage.setItem("username", user?.username || '');
    localStorage.setItem("password", user?.password || '');
    localStorage.setItem("user", user); 

    if(!user) {
        const user = localStorage.getItem("user"); 
    }

    if (!user) return <div>Please log in</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold">Profile</h2>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
        </div>
    );
}

export default Profile;