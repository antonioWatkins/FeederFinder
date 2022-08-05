import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createFeeder } from '../features/feeders/feederSlice';

function FeederForm() {
  const [summoner, setSummoner] = useState('');
  const [laning, setlaning] = useState('');
  const [gameOverview, setGameOverview] = useState('');
  const [playerGrade, setPlayerGrade] = useState('');
  const [teamFighting, setTeamFighting] = useState('');
  const [player, setPlayer] = useState('');

  // const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    console.log('im here');
    event.preventDefault();
    dispatch(createFeeder({
      player,
      summoner,
      laning,
      gameOverview,
      playerGrade,
      teamFighting,
    // eslint-disable-next-line comma-dangle
    }

    // eslint-disable-next-line function-paren-newline
    ));
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
        Journal
        </h1>
      <Form className='form' onSubmit={onSubmit}>

      <Form.Group className="form-group" controlId="summoner">
        <Form.Label>Summoner Name</Form.Label>
        <Form.Control type="text"
         value={summoner}
         onChange={(e) => {
           setSummoner(e.target.value);
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
        <Form.Control className='form-group2' type="textarea" onChange={(e) => { setGameOverview(e.target.value); }} placeholder="what happened with this player" />
        <Form.Control className='form-group2' type="textarea" onChange={(e) => {
          setlaning(e.target.value);
        }} placeholder="laning" />
        <Form.Control className='form-group2' type="textarea" onChange={(e) => {
          console.log('e');
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

export default FeederForm;
