import React from 'react'
import { useState } from 'react'

const AddProduct = () => {
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('')
  const [company, setcompany] = useState('')
  const [error, seterror] = useState(false)

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      seterror(true)
      return false
    }
    const userId = JSON.parse(localStorage.getItem('users'))._id
    let result = await fetch('http://localhost:5000/add-product', {
      method: 'POST',
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
    result = await result.json()
  }

  return (
    <div className='product'>
      <h1>Add product</h1>
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
      <button onClick={addProduct}>Add product</button>
    </div>
  )
}

export default AddProduct
