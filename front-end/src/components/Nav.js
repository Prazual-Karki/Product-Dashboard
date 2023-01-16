import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const auth = localStorage.getItem('users')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/signup')
  }
  return (
    <div>
      {auth ? (
        <div className='navbar'>
          <Link to='/'>Product</Link>&nbsp;&nbsp;&nbsp;
          <Link to='/add'>Add product</Link>&nbsp;&nbsp;&nbsp;
          <Link id='logout' to='/signup' onClick={logout}>
            Logout({JSON.parse(auth).name})
          </Link>
        </div>
      ) : (
        <div className='rightnav'>
          <Link to='/signup'>signup</Link>&nbsp;&nbsp;&nbsp;
          <Link to='/login'>Login</Link>
        </div>
      )}
    </div>
  )
}

export default Nav
