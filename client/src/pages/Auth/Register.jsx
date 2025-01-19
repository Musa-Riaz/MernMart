import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AuthStyle from '../../style/AuthStyle.css'
import toast from 'react-hot-toast';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const [role, setRole] = useState(0);
    const navigate = useNavigate();

   async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await axios.post('/api/v1/auth/register', {name, email, password, phone, address, answer, role});
            if(res.data.status){
                toast.success(res.data.message);
                navigate('/login'); //if user is created, we will direct him to the login route
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
        <h1 className="title">Register Page</h1>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder='Enter your name' value={name} onChange={(e)=> setName(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}  required/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder='Enter your phone number' value={phone} onChange={(e)=> setPhone(e.target.value)}  required/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Enter your address' value={address} onChange={(e)=> setAddress(e.target.value)}  required/>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}  required/>
  </div>
  <div className="mb-3">
    <select className="form-control"  onChange={(e)=> setRole(e.target.value)}  required>
      <option >Select Role</option>
      <option value={0}>User</option>
      <option value={1}>Admin</option>
    </select>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder="What is your bestfriend's name" value={answer} onChange={(e)=> setAnswer(e.target.value)}  required/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>

      </div>
    
    </Layout>
  )
}

export default Register
