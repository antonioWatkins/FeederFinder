import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserDash from './pages/UserDash';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/header'

export default function () {
  return (
    <>
    <Router>
    <div className='container'>
    <Header />
     <Routes>
      <Route path='/register' element = {<Register />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/userdash' element = {<UserDash />} />
     </Routes>
    </div>
    </Router>
    </>
      )
    }
    

