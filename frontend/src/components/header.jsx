import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function header() {
  return (
    <div>
      <header className='header'>
        <div className='logo'>
            <Link to='/'>Feeder</Link>
        </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt />Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser />Register
                    </Link>
                </li>
            </ul>
      </header>
    </div>
  )
}

export default header
