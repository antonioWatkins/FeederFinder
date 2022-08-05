/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createReport } from '../features/reports/reportSlice';
import './Report.css';

function Report() {
  const [summoner, setSummoner] = useState('');
  const [post, setPost] = useState('');

  // const navigate =useNavigate()
  // const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  console.log(user._id, 'id');
  const player = user.name;
  console.log(player);
  const onSubmit = async (event) => {
    console.log('im here');
    event.preventDefault();
    dispatch(createReport({
      // eslint-disable-next-line no-underscore-dangle
      userid: user._id,
      player,
      summoner,
      post,
    }));

    setSummoner('');
    setPost('');
  };

  return (
    <div>
         <h1 className='text'>
        Warning You are about to put your thoughts out in the the interwebs
        </h1>

      <Form className='form' onSubmit={onSubmit}>

      <Form.Group className="form-group" controlId="summoner">
        <Form.Label>Summoner Name</Form.Label>
        <Form.Control type="text"
         value={summoner}
          onChange={(e) => {
            setSummoner(e.target.value);
          }} placeholder="Please Enter Summoners Name" />
      </Form.Group>
      <Form.Group className="form-group" controlId="formBasicPassword">
      <Form.Label>Discribe the player</Form.Label>
        <Form.Control type="text"
         value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }} placeholder="Enter players Details" />
       </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      </Form>
    </div>
  );
}

export default Report;
