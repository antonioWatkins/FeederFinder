import React, { useState , useEffect} from 'react'
import { Navigate,useNavigate, useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { createReport } from '../features/reports/reportSlice'
import {reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Radio } from '../components/Radio'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Report.css'






function Report() {

  const [summoner , setSummoner] = useState('')
  const [laning, setlaning]= useState('')
  const [gameOverview, setGameOverview] =useState('') 
  const [playerGrade, setPlayerGrade] = useState('')
  const [teamFighting, setTeamFighting]=useState('')
  const [player, setPlayer] = useState('')

  //const navigate =useNavigate()
  // const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onSubmit = async(event) => {
    console.log('im here')
    event.preventDefault()
    dispatch(createReport({ 
      player,
      summoner, 
      laning,
      gameOverview,
      playerGrade,
      teamFighting}))
      
      setPlayer('')
      setSummoner('')
      setlaning('')
      setGameOverview('')
      setPlayerGrade('')
      setTeamFighting('')
  }

  return (
    <div>
         <h1 className='text'>
        Warning You are about to put your thoughts out in the the interwebs
        </h1> 
      
      {/* <h3 className='text'>What will you right in your Journal today {user && user.name}</h3> */}
      <Form className='form' onSubmit={onSubmit}>

      <Form.Group className="form-group" controlId="summoner">
        <Form.Label>Summoner Name</Form.Label>
        <Form.Control type="text" 
         value={summoner}
        
          onChange={(e)=> {
          setSummoner(e.target.value)
         

        }} placeholder="Please Enter Summoners Name" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
      <Form.Group className='form-group'>

        <Form.Select 
        aria-label='player-ratiing' 
        onSubmit={onSubmit} 
        value={playerGrade} 
        onChange={(e) => setPlayerGrade(e.target.value)}
        
        >
        {/* <option value=''>Player Grade</option> */}
        <option value=''>Must select a Grade</option>
          <option value='Great Teammate'>Great Teammate</option>
          <option value='Untiltable'>Untiltable</option>
          <option value='Great Shotcaller'>Great ShotCaller</option>
          <option value='Carryable'>Carryable</option> 
          <option value='Just a Bad Game '>Just a bad Game</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="form-group" controlId="formBasicPassword">
        <Form.Label>
        </Form.Label>
        <Form.Control className='form-group2' type="textarea" onChange={(e)=> {
      console.log('e')
          setGameOverview(e.target.value)}} placeholder="what happened with this player" />
        <Form.Control className='form-group2' type="textarea" onChange={(e)=> {
          console.log('e')
          setlaning(e.target.value)}} placeholder="laning" />
        <Form.Control className='form-group2' type="textarea" onChange={(e)=> {
          
          console.log('e')
          setTeamFighting(e.target.value)}} placeholder="team fighting" />
      </Form.Group>
       
      <Button variant="primary" type="submit">
        Submit
      </Button>
      
      </Form>
    </div>
  )
}


export default Report