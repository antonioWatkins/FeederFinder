import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeederID, updateFeeder } from '../features/feeders/feederSlice';
import { reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner.jsx';

function UpdateJournal() {
  const [summoner, setSummoner] = useState('');
  const [laning, setlaning] = useState('');
  const [gameOverview, setGameOverview] = useState('');
  const [playerGrade, setPlayerGrade] = useState('');
  const [teamFighting, setTeamFighting] = useState('');
  const [player, setPlayer] = useState('');
  const [isSummoner, setIsSummoner] = useState(false);
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

    dispatch(getFeederID(id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading || !feeder) {
    return <Spinner />;
  }

  const onSubmit = async (event) => {
    console.log('im here');
    event.preventDefault();
    dispatch(updateFeeder({
      id,
      feederData: {
        player,
        summoner,
        laning,
        gameOverview,
        playerGrade,
        teamFighting,
      },
    }));

    setPlayer('');
    setSummoner('');
    setlaning('');
    setGameOverview('');
    setPlayerGrade('');
    setTeamFighting('');
  };

  return (
    <div>
       <h1 className='text'>
        Update Journal Entry
        </h1>

      <Form className='form' onSubmit={onSubmit}>

      <Form.Group className="form-group" controlId="summoner">
        <Form.Label>Summoner Name</Form.Label>
        <Form.Control type="text"
          placeholder={feeder.summoner}
          value={summoner}
          isInvalid={isSummoner}
          onChange={(e) => {
            setSummoner(e.target.value);
            setIsSummoner(true);
          }}
        />
      </Form.Group>
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
        }} placeholder={feeder.laning || 'what happend with this player'} />
        <Form.Control className='form-group2' value={laning} type="textarea" onChange={(e) => {
          setlaning(e.target.value);
        }} placeholder={teamFighting || 'laning'} />
        <Form.Control className='form-group2' value={teamFighting} type="textarea" onChange={(e) => {
          setTeamFighting(e.target.value);
        }} placeholder="team fighting" />
      </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>

  );
}

export default UpdateJournal;
