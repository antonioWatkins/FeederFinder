// import React from 'react'
// import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
// import {Link} from 'react-router-dom'
// //import {useSelector, useDispatch} from 'react-redux'
// import {logout, reset} from '../features/auth/authSlice'
// import {useNavigate} from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'

// function Header() {

//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const {user} = useSelector((state)=> state.auth)
  
  

//   const onLogout = () => {
//     dispatch(logout())
//     dispatch(reset())
//     navigate('/')
//   }
//   return (
//     <div>
//       <header className='header'>
//         <div className='logo'>
//             <Link to='/'>Feeder</Link>
//         </div>
//             <ul>
//             {user ? ( <li>
//                     <button className ='btn' onClick ={onLogout}>
//                         <FaSignOutAlt />Logout
//                     </button>
//                 </li>) : (<>
//               <li>
//                     <Link to='/login'>
//                         <FaSignInAlt />Login
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to='/register'>
//                         <FaUser />Register
//                     </Link>
//                 </li>
            
//              </>) }
                
//             </ul>
//       </header>
//     </div>
//   )
// }

// export default Header
