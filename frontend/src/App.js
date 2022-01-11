import React from 'react'
import './App.css'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Home from './components/pages/Home'
import Header from './components/UI/Header'
import Footer from './components/UI/Footer'
import ProductDetails from './components/pages/ProductDetails'
import Cart from './components/pages/Cart'

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
            </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
