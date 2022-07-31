import { useDispatch } from 'react-redux'
import { deleteFeeder } from '../features/feeders/feederSlice'
import { updateFeeder } from '../features/feeders/feederSlice'

function FeederItems({ feeder }) {
  const dispatch = useDispatch()

  return (
    <div>
      <div>{new Date(feeder.createdAt).toLocaleString('en-US')}</div>
      <h2>{feeder.summoner}</h2>
      <div>

      <button onClick={() => dispatch(deleteFeeder(feeder._id))} className='close'>
        delete
      </button>
      </div>
      <button onClick={() => dispatch(updateFeeder(feeder._id))} className='close'>
       udpate
      </button>
    </div>
  )
}

export default FeederItems