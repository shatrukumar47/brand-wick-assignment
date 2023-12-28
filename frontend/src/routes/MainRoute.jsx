import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import PrivateRoute from './PrivateRoute'

const MainRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute>
        <Home />
      </PrivateRoute>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default MainRoute
