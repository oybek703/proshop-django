import React from 'react'
import './App.css'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Home from './components/pages/Home'
import Header from './components/UI/Header'
import Footer from './components/UI/Footer'
import ProductDetails from './components/pages/ProductDetails'
import Cart from './components/pages/Cart'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Profile from './components/pages/Profile'
import ShippingAddress from './components/pages/ShippingAddress'
import Payment from './components/pages/Payment'
import PlaceOrder from './components/pages/PlaceOrder'
import Order from './components/pages/Order'
import UsersList from './components/pages/UserList'
import EditUser from './components/pages/EditUser'
import ProductList from './components/pages/ProductList'
import EditProduct from './components/pages/EditProduct'
import CreateProduct from './components/pages/CreateProduct'
import OrderList from './components/pages/OrderList'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3" style={{minHeight: '85vh'}}>
        <Container>
            <Routes>
              <Route path='/' element={<Home/>} exact />
              <Route path='/product/:id' element={<ProductDetails/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/shipping' element={<ShippingAddress/>} />
              <Route path='/payment' element={<Payment/>} />
              <Route path='/placeorder' element={<PlaceOrder/>} />
              <Route path='/order/:id' element={<Order/>} />
              <Route path='/admin/users' element={<UsersList/>} />
              <Route path='/admin/users/:id/edit' element={<EditUser/>} />
              <Route path='/admin/products' element={<ProductList/>} />
              <Route path='/admin/products/:id/edit' element={<EditProduct/>} />
              <Route path='/admin/products/create' element={<CreateProduct/>} />
              <Route path='/admin/orders' element={<OrderList/>} />
            </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
