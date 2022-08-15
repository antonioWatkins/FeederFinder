import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeederID, updateFeeder } from '../features/feeders/feederSlice';
import { reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner.jsx';
import './Report.css';

function UpdateJournal() {
  const [laning, setlaning] = useState('');
  const [gameOverview, setGameOverview] = useState('');
  const [playerGrade, setPlayerGrade] = useState('');
  const [teamFighting, setTeamFighting] = useState('');
  // const navigate =useNavigate()
  // const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const [item, setItem] = useState(true)

  const {
    feederToUpdate, isLoading, isError, message,
  } = useSelector((state) => state.feeder);
  const feeder = feederToUpdate;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }
    if (user) {
      dispatch(getFeederID(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, id, isError, message, dispatch]);

  const onSubmit = async (event) => {
    console.log('im here');
    event.preventDefault();
    dispatch(updateFeeder({
      id,
      feederData: {
        player: user,
        summoner: feeder.summoner,
        laning,
        gameOverview,
        playerGrade,
        teamFighting,
      },
    }));
    setlaning('');
    setGameOverview('');
    setPlayerGrade('');
    setTeamFighting('');
  };
  if (isLoading || !feeder) {
    return <Spinner />;
  }
  return (
    <div>
       <h1 className='reportHeader'>
             Update Journal entry for {feeder.summoner}
        </h1>

      <Form className='form' onSubmit={onSubmit}>

      <Form.Group className='form-group'>

        <Form.Select
        aria-label='player-ratiing'
        onSubmit={onSubmit}
        value={playerGrade}
        placeholder={feeder.playerGrade}
        onChange={(e) => setPlayerGrade(e.target.value)}

        >
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
        <Form.Control className='form-group2' type="textarea" onChange={(e) => {
          setGameOverview(e.target.value);
        }} placeholder={feeder.gameOverview || 'what happend with this player'} />
        <Form.Control className='form-group2' value={laning} type="textarea" onChange={(e) => {
          setlaning(e.target.value);
        }} placeholder={feeder.laning || 'laning'} />
         <Form.Control className='form-group2' type="textarea" onChange={(e) => {
           setTeamFighting(e.target.value);
         }} placeholder={feeder.teamfighting || 'team fighting' } />
      </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>

  );
}

export default UpdateJournal;
