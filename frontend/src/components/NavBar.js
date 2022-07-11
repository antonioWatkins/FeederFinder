import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice'
import { useSelector } from 'react-redux';

import './NavBar.css';

function Navbar() {
  const [name, setName] = useState('')
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);



  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)


  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const onLogIn = () => {
   navigate('/login')
  }

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
                FeederTable
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/api/report'
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
            :
            <ul className='nav-links2'>
              <ol>
                <Link to='/login'>Sign In</Link>
              </ol>
              <ol>
                <Link  to='/register'>Register</Link>
              </ol>
            </ul>
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;






