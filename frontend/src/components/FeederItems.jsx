/* eslint-disable no-underscore-dangle */
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { deleteFeeder } from '../features/feeders/feederSlice';

function FeederItems({ feeder }) {
  const dispatch = useDispatch();

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
    </div>
  );
}

export default FeederItems;
