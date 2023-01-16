const express = require('express')
const app = express()
require('./db/config')

const cors = require('cors')
const Jwt = require('jsonwebtoken')
const jwtkey = 'e-comm' //jwt secret

app.use(cors())
app.use(express.json())

const User = require('./db/User')
const Product = require('./db/Product')

//api for signing users
app.post('/register', async (req, res) => {
  const user = new User(req.body)
  let result = await user.save()
  result = result.toObject()
  delete result.password

  //generating jwt token for the user
  Jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      res.send({ result: 'something went wrong...' })
    }
    res.send({ result, auth: token })
  })
})

//api for login users
app.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select('-password')
    if (user) {
      ////generating jwt token for the user
      Jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          res.send({ result: 'something went wrong...' })
        }
        res.send({ user, auth: token })
      })
    }
  } else {
    res.send({ result: 'no result found' })
  }
})

//api for adding products to database
app.post('/add-product', verifyToken, async (req, res) => {
  let product = new Product(req.body)
  let result = await product.save()
  res.send(result)
})

//api for listing products in front end
app.get('/products', verifyToken, async (req, res) => {
  let products = await Product.find()
  if (products.length > 0) {
    res.send(products)
  } else {
    res.send({ result: 'no product found' })
  }
})

//to delete one products with product id
app.delete('/product/:id', verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  res.send(result)
})

//for getting specific product details by product id
app.get('/product/:id', verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id })
  if (result) {
    res.send(result)
  } else {
    res.send({ error: 'not found' })
  }
})

//to update product details
app.put('/product/:id', verifyToken, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  )
  res.send(result)
})

//to search product with key as params
app.get('/search/:key', verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  })
  res.send(result)
})

//middlewares for verifying jwt token
function verifyToken(req, res, next) {
  let token = req.headers['authorization']
  if (token) {
    token = token.split(' ')[1]

    //taking request token as input and verifying
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: 'please provide valid token' })
      } else {
        next()
      }
    })
  } else {
    res.status(403).send({ result: 'please enter token with header' })
  }
}
app.listen(5000)
