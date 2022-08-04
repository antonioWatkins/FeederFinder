import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getReport} from '../features/reports/reportSlice'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'



function ReportShow() {
  const navigate =useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)
  
  const { report, isLoading, isError, message } = useSelector(
    (state) => state.report 
    )
    console.log(report)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getReport())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  
  
  return (
    
    
   
      <div className='goal'>
      <section className='content'>
       
          <div className='goals'>
            {report.map((report) => (
              <div key={report._id} report={report}>
     
      
        <h3>summoner: {report.summoner}</h3>

        <p>laning: {report.laning}</p>
        <p>game Overview: {report.gameOverview}</p>
        <p>player Grade: {report.playerGrade}</p>
        <p> teamFighting: {report.teamfighting}</p>
      </div>
            ))}
        </div>
       
      </section>
    
    </div>
  )
}

export default ReportShow
