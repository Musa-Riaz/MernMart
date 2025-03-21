import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
    <h3 className='text-center'>Admin Panel</h3>
<ul className="list-group">
    <div className='text-center'>
    <NavLink to="/dashboard/admin/create-category" className="list-group-item">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item">Create Product</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item">Products</NavLink>
  <NavLink to="/dashboard/admin/orders" className="list-group-item">Orders</NavLink>
  <NavLink to="/dashboard/admin/users" className="list-group-item">Users</NavLink>
    </div>
  
</ul>

    </>
  )
}

export default AdminMenu
