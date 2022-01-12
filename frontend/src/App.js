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
            </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
