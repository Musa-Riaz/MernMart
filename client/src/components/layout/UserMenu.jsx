import React from 'react'
import {NavLink} from 'react-router-dom'
const UserMenu = () => {
  return (
    <div>
        <h3 className='text-center'>DashBoard</h3>
<ul className="list-group">
    <div className='text-center'>
    <NavLink to="/dashboard/user/profile" className="list-group-item">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item">Orders</NavLink>
    </div>
  
</ul>
    </div>
  )
}

export default UserMenu
