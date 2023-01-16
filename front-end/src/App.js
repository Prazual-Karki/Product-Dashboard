import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import PrivateComp from './components/PrivateComp'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'
import ProductList from './components/ProductList'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
