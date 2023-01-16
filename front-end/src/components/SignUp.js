import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('users')
    if (auth) {
      navigate('/')
    }
    return () => {
      // const auth = localStorage.getItem('users')
      // if (auth) {
      //   navigate('/')
      // }
    }
  }, [])

  const handleSubmit = async () => {
    let result = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    result = await result.json()
    localStorage.setItem('users', JSON.stringify(result.result))
    localStorage.setItem('token', JSON.stringify(result.auth))

    console.log(result)
    if (result) {
      navigate('/')
    }
  }

  return (
    <div className='signUp'>
      <h2>Register</h2>
      <input
        className='inputBox'
        value={name}
        onChange={(e) => setname(e.target.value)}
        type='text'
        placeholder='your name'
        name='name'
      />
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
        Signup
      </button>
    </div>
  )
}

export default SignUp
