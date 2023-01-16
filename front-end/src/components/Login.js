import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('users')
    if (auth) {
      navigate('/')
    }

    return () => {
      //   const auth = localStorage.getItem('users')
      //   if (auth) {
      //     navigate('/')
      //   }
      //   console.log('cleanup effect when unmounts ')
    }
  }, [])

  const handleSubmit = async () => {
    let result = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'Application/json',
      },
    })
    result = await result.json()

    if (result.auth) {
      localStorage.setItem('users', JSON.stringify(result.user))
      localStorage.setItem('token', JSON.stringify(result.auth))
      navigate('/')
    } else {
      alert('please enter correct details')
    }
  }

  return (
    <div className='signUp'>
      <h2>Login</h2>

      <input
        className='inputBox'
        value={email}
        onChange={(e) => setemail(e.target.value)}
        type='email'
        placeholder='your email'
        name='email'
      />
      <input
        className='inputBox'
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        type='password'
        placeholder='your password'
        name='password'
      />
      <button type='button' onClick={handleSubmit}>
        Login
      </button>
    </div>
  )
}

export default Login
