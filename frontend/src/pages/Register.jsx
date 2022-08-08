import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import validator from 'validator';
import Button from 'react-bootstrap/Button';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner.jsx';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const {
    name, email, password, password2,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.auth);

  const isValidName = Boolean(name);
  const isValidEmail = validator.isEmail(email);
  const isValidPassword = password.length >= 8;
  const allValid = isValidName && isValidEmail && isValidPassword;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Password does not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
  <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p> Please Create an Account</p>
      </section>

      <Form className='register' onSubmit={onSubmit}>

      <Form.Group className='register-group'>
      <Form.Label>Name</Form.Label>
        <Form.Control
        required
        type='text'
        className='register-control'
        id='name'
        name='name'
        isInvalid={!isValidName}
        value={name}
        placeholder='Enter Summoners Name'
        onChange={onChange}
        />
        <Form.Control.Feedback type='invalid'>Please enter a valid Name</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='register-group'>

        <Form.Control
        required
        type='email'
        className='register-control'
        id='email'
      name='email'
        value={email}
        isInvalid={!isValidEmail}
        placeholder='Enter Email'
        onChange={onChange}
        />
         <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='register-group'>
        <Form.Control
        type='password'
        className='register-control'
        id='password'
        name='password'
        value={password}
        isInvalid={!isValidPassword}
        placeholder='Enter Password'
        onChange={onChange}
        />
         <Form.Control.Feedback type='invalid'>Please enter a valid password</Form.Control.Feedback>

      </Form.Group>
      <Form.Group className='register-group'>
        <Form.Control
        type='password'
        className='register-control'
        id='password2'
      name='password2'
        value={password2}
        placeholder='Confirm Password'
        onChange={onChange}
        />
      </Form.Group>

        <Button type='submit' className='btn btn-block' disabled={!allValid}>
          Submit
        </Button>

      </Form>

   </>
  );
}

export default Register;
