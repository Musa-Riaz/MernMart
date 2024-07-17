import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import { MdShoppingBag } from "react-icons/md";
const Header = () => {
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to='/' className="navbar-brand"> <MdShoppingBag style={{fontSize:'30px'}} /> MernMart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <NavLink to='/'className="nav-link " aria-current="page" >Home</NavLink>
        <NavLink to='/register'className="nav-link" >Sign Up</NavLink>
        <NavLink to='/login'className="nav-link" >Sign In</NavLink>
        <NavLink to='/cart'className="nav-link" >Cart</NavLink>
        <NavLink to='/category'className="nav-link" >Cateogory</NavLink>
      </div>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
