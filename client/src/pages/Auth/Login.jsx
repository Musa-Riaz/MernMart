import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import "../../style/AuthStyle.css";
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await axios.post('/api/v1/auth/login', { email, password});
            if(res.data.status){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state ||'/'); 
            }
            else{
                toast.error(res.data.message);
            }

        }catch(err){
            console.log(err);
            toast.error("Something went wrong");
        }
    }
  return (
    <Layout>
    <div className="form-container">
      <h1 className='title'>Login Page</h1>
  <form onSubmit={handleSubmit}>

<div className="mb-3">
  <input type="email" className="form-control" aria-describedby="emailHelp" placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}  required/>
</div>

<div className="mb-3">
  <input type="password" className="form-control" placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}  required/>
</div>
<div className="mb-3 form-check">
</div>
<button type="submit" className="btn btn-primary">Login</button>
<div className="mt-3"><button type="submit" className="btn btn-primary" onClick={() =>{navigate('/forgot-password')} }>Forgot Password</button></div>

</form>

    </div>
  
  </Layout>
  )
}

export default Login
