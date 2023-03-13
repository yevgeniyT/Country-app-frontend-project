import React from 'react'

import { Routes,Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'

import Favorite from '../pages/Favorite'
import Home from '../pages/Home'
import Map from '../pages/Map'
import Error from '../pages/Error'

type IndexProps ={}

const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Navbar/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favorite' element={<Favorite/>}/>
            <Route path='/map' element={<Map/>}/>
            <Route path='*' element={<Error/>}/>
          </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default Index