import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserDash from './pages/UserDash';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';


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
      {/* <Route path ='/homepage' element = {<HomePage />} /> */}
      <Route path ='/searchpage' element = {<SearchPage />} />
     </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
      )
    }
    

