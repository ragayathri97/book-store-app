import React, {useContext}from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout =()=>{
        logout();
        navigate('/login');
    };
  return (
    <nav>
        <Link to = "/">Home</Link>
        {isAuthenticated?(
            <>
            <Link to = "/books">Books</Link>
            <button onClick = { handleLogout }>Logout</button>
            </>
        ):(
            <Link to = "/login">Login</Link>
        )}
    </nav>
  );
};

export default Navbar;