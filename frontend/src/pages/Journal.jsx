import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import FeederForm from '../components/FeederForm'
import FeederItems from '../components/FeederItems'

import './Journal.css'
import { getFeeder } from '../features/feeders/feederSlice'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'



function Journal() {


  const navigate =useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)
  
  const { feeder, isLoading, isError, message } = useSelector(
    (state) => state.feeder 
    )
    console.log(feeder)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getFeeder())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  

  
  
  //
    return (
      <div className='container'>
      <FeederForm />
      
      <section className='content'>
        {feeder.length > 0 ? (
          <div className='goals'>
            {feeder.map((feeder) => (
              <FeederItems key={feeder._id} feeder={feeder} />
            ))}
          </div>
        ) : (
          <h3>Enter your an Entry into your journal</h3>
        )}
      </section>
    </div>
  )
}


export default Journal