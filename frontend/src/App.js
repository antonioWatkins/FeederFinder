import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import HomePage from './pages/HomePage.jsx';
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from './pages/SearchPage.jsx';
// import Header2 from './components/Header2';
import NavBar from './components/NavBar';
import Report from './pages/Report.jsx';
import Journal from './pages/Journal.jsx';
import UpdateJournal from './pages/UpdateJournal.jsx';
import ReportShow from './pages/ReportShow.jsx';

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
      <Route path='/api/feeder/:id' element = {<UpdateJournal />} />
      <Route path='/api/report/:name' element = {<Report />} />
      <Route path='/api/report/' element = {<ReportShow />} />
      {/* <Route path ='/homepage' element = {<HomePage />} /> */}
      <Route path ='/searchpage' element = {<SearchPage />} />
      {/* <Route path ='/homepage2' element = {<HomePage2 />} /> */}
     </Routes>
    </Router>
    <ToastContainer />
    </>
    </div>
  );
}
