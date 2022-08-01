import React from 'react';
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserDash from './pages/UserDash';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
// import Header2 from './components/Header2';
import NavBar from './components/NavBar';
import Journal from './pages/Journal';
import UpdateJournal from './pages/UpdateJournal';
//import HomPage2 from './pages/HomPage2';


export default function () {
  return (
    <div className='App'>
    <>
    <Router>
    {/* <Header /> */}
    {/* {<Header2 />} */}
    <NavBar />
    {/* <SideBar /> */}
     <Routes>
      
      <Route path='/' exact element = {<HomePage />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/api/feeder' element = {<Journal/>} />
      <Route path='/api/feeder' element = {<Journal/>} />
      <Route path='/api/feeder/:id' element = {<UpdateJournal/>} />
      
      {/* <Route path ='/homepage' element = {<HomePage />} /> */}
      <Route path ='/searchpage' element = {<SearchPage />} />
      {/* <Route path ='/homepage2' element = {<HomePage2 />} /> */}
     </Routes>
    </Router>
    <ToastContainer />
    </>
    </div>
      )
    }
    

