import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('')
  const [company, setcompany] = useState('')
  const [error, seterror] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    getProductDetails()
  }, [])

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
    result = await result.json()
    setname(result.name)
    setprice(result.price)
    setcategory(result.category)
    setcompany(result.company)
  }

  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      seterror(true)
      return false
    }
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
    result = await result.json()
    navigate('/')
  }

  return (
    <div className='product'>
      <h1>Update product</h1>
      <input
        className='inputBox'
        type='text'
        placeholder='enter product name'
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      {error && !name && (
        <span className='invalidInput'>Please enter a valid name</span>
      )}
      <input
        className='inputBox'
        type='text'
        placeholder='enter product price'
        value={price}
        onChange={(e) => setprice(e.target.value)}
      />
      {error && !price && (
        <span className='invalidInput'>Please enter a valid price</span>
      )}
      <input
        className='inputBox'
        type='text'
        placeholder='enter product category'
        value={category}
        onChange={(e) => setcategory(e.target.value)}
      />
      {error && !category && (
        <span className='invalidInput'>Please enter a valid category</span>
      )}
      <input
        className='inputBox'
        type='text'
        placeholder='your product company'
        value={company}
        onChange={(e) => setcompany(e.target.value)}
      />
      {error && !company && (
        <span className='invalidInput'>Please enter a valid company name</span>
      )}
      <button onClick={updateProduct}>Update product</button>
    </div>
  )
}

export default UpdateProduct
