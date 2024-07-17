import React from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
     <h4 className='text-center'>All Rights Reserved &copy; MernMart</h4>
     <p className="text-center mt3">
        <Link to='/about'>About</Link>
        <Link to='/policy'>Privacy Policy</Link>
     </p>
    </div>
  )
}

export default Footer
