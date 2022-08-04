import { useDispatch } from 'react-redux'
import { deleteFeeder } from '../features/feeders/feederSlice'
import { updateFeeder } from '../features/feeders/feederSlice'
import Button from 'react-bootstrap/Button'
import FeederForm from './FeederForm'


function FeederItems({ feeder }) {
  const dispatch = useDispatch()

  function showUpDateOptions(){
    <div><FeederForm /></div>

  }
   

  return (
    <div>
      <div className='goal'>
        <div>{new Date(feeder.createdAt).toLocaleString('en-US')}</div>
      
        <h3>summoner: {feeder.summoner}</h3>

        <p>laning: {feeder.laning}</p>
        <p>game Overview: {feeder.gameOverview}</p>
        <p>player Grade: {feeder.playerGrade}</p>
        <p> teamFighting: {feeder.teamfighting}</p>
        <div>

        <Button variant='Danger' onClick={() => dispatch(deleteFeeder(feeder._id))} className='close'>
          X
        </Button>
      </div>
    
    <Button variant='Primary' href={(`/api/feeder/${feeder._id}`)}>
      update
    </Button>
    <Button variant='Secondary' href={(`/api/report/${feeder._id}`)}>
    report
    </Button>
    </div>
      {/* <button onClick={() => dispatch(updateFeeder(feeder._id))} className='close'>
      update
    </button>*/}
    </div> 
  )
}

export default FeederItems