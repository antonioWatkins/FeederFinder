import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Button } from './Button';

import './NavBar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // useEffect(() => {
  //   if (!localStorage.getItem('loggedIn')) return;
  //   getUser().then((data) => {
  //     setName(data.name);

  //   });
  // }, []);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Feeder Finder
            <i className="fa fa-binoculars" />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/api/feeder'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Journal
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/api/report/'
                className='nav-links'
                onClick={closeMobileMenu}
              >

                Report
              </Link>
            </li>

            <li>
              <Link
                to='/register'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>

          {user ? button && <Button buttonStyle='btn--outline' onClick={onLogout}>Logout</Button>
            : <ul className='nav-links2'>
              <ol className='nav-links2-color'>
                <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Sign In</Link>
              </ol>
              <ol>
                <Link to='/register' style={{ textDecoration: 'none', color: ' white' }}>Register</Link>
              </ol>
            </ul>
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;
