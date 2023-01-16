import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [products, setproducts] = useState([])

  useEffect(() => {
    getProducts()

    // return () => {
    //   console.log('cleanup  effect running...')
    // }
  }, [])

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products', {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
    result = await result.json()
    setproducts(result)
  }

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
    result = await result.json()
    if (result) {
      getProducts()
    }
  }
  const handleChange = async (e) => {
    let key = e.target.value
    if (key) {
      let result = await (
        await fetch(`http://localhost:5000/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`,
          },
        })
      ).json()
      if (result) {
        setproducts(result)
      }
    } else {
      getProducts()
    }
  }

  return (
    <>
      <input
        type='text'
        placeholder='search products'
        onChange={handleChange}
      />
      {products.length > 0 ? (
        <table border='1'>
          <thead>
            <tr>
              <th>S.no</th>
              <th>product name</th>
              <th>product price</th>
              <th>product category</th>
              <th>company name</th>
              <th>Operation</th>
            </tr>
          </thead>

          {products.map((item, index) => {
            return (
              <tbody key={item._id}>
                <tr>
                  <td>{index + 1}</td>

                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(item._id)
                      }}
                    >
                      Delete
                    </button>
                    <Link to={'/update/' + item._id}>Update</Link>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      ) : (
        <h1>No results found</h1>
      )}
    </>
  )
}

export default ProductList
