import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [username, setUsername]=useState('');
    const [password, setpassword]=useState('');
    const [error,setError] = useState(null);
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            const reponse = await fetch ('https://loud-twisty-softball.glitch.me/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if(data.success){
                login(data.token);
                navigate('/books');
            }else{
                setError(data.message || 'Login failed');
            }
        } catch (err){
            setError(err.message);
        }
    };

  return (
    <div>
        <h2>Login</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input
            type="text" 
            placeholder="USername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />

            <input
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            <button type="submit">Login</button>
        </form>
    </div>
  );
};

export default Login;