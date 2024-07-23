import React from 'react'
import Layout from '../components/layout/Layout'
import UserMenu from '../components/layout/UserMenu'
import {useState, useEffect} from 'react'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast';
import axios from 'axios';
const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [auth, setAuth] = useAuth();

  useEffect(()=>{
    const {name, email, phone, address} = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    
    }, [auth.user])

  async function handleSubmit(e){
    e.preventDefault();
    try{
        const {data} = await axios.put('/api/v1/auth/profile', {name, email, password, phone, address});
      if(data?.error){
        toast.error(data?.error);
      }

      else{
        setAuth({...auth, user: data?.updatedUser});
        let ls = localStorage.getItem('auth');
        ls =  JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully")
      }

    }catch(err){
        console.log(err);
        toast.error("Something went wrong");
    }
}




  return (
    <Layout title={"Your Profile"}>
       <div className="container-fluid p-3 m-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu />
            </div>
            <div className="col-md-9">
            <div className="form-container">
        <h1 className="title">User Form</h1>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder='Enter your name' value={name} onChange={(e)=> setName(e.target.value)} />
  </div>
  <div className="mb-3">
    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}  />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder='Enter your phone number' value={phone} onChange={(e)=> setPhone(e.target.value)}  />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Enter your address' value={address} onChange={(e)=> setAddress(e.target.value)}  />
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}  />
  </div>
 
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-primary">Update</button>
</form>

      </div>
            </div>
        </div>
       </div>
    </Layout>
  )
}

export default Profile
