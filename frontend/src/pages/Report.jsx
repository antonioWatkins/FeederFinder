/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createReport } from '../features/reports/reportSlice';
import './Report.css';

function Report() {
  const [post, setPost] = useState('');
  const { name } = useParams();

  // const navigate =useNavigate()
  // const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const onSubmit = async (event) => {
    console.log('im here');
    event.preventDefault();
    dispatch(createReport({
      // eslint-disable-next-line no-underscore-dangle
      userid: user._id,
      player: user.name,
      summoner: name,
      post,
    }));
    setPost('');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <div className='background'>
         <h1 className='reportHead'>
               Reporting on Summoner {name}
        </h1>

      <Form className='form' onSubmit={onSubmit}>
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
