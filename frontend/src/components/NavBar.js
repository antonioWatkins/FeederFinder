import React, { useState } from 'react'
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import './NavBar.css'
function NavBar() {

  const [click, setClick] = useState(false)
  const [button, setButton]= useState(true)

  const handleClick = () => setClick(!click);
  const closeMobleMenu = () =>setClick(false);


  const showButton = () => {
    if(window.innerHeight <=960){
    setButton(false)
  } else{
    setButton(true)
  }
}
   
  

  window.addEventListener('resize', showButton)

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to="/" className="navbar-logo">
            Feeder <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobleMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/feedertable' className='nav-links' onClick={closeMobleMenu}>
                Feeder Table
              </Link>
              </li>
              <li className='nav-item'>
              <Link to='/register' className='nav-links-mobile' onClick={closeMobleMenu}>
                Register
              </Link>
              </li>
              <li className='nav-item'>
              <Link to='/login' className='nav-links-mobile' onClick={closeMobleMenu}>
                Login
              </Link>
              </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>Register</Button>}

        </div>
      </nav>
    </>
  )
}

export default NavBar

