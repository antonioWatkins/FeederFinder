import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner.jsx';
import '../components/HeroSection';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user || localStorage.getItem('loggedIn')) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='background'>

      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p> Login and Start Tracking</p>
      </section>

      <section className='form'>
      <Form onSubmit={onSubmit}>

      <Form.Group className='form-group'>

        <Form.Control
        type='email'
        className='form-control'
      name='email'
        id='email'
        value={email}
        placeholder='Enter Email'
        onChange={onChange}
        />
      </Form.Group>
      <div className='form-group'>
        <input
        type='password'
        className='form-control'
        id='password'
        name='password'
        value={password}
        placeholder='Enter Password'
        onChange={onChange}
        />
      </div>
      <div className="form-group-btn">
        <button
          className='btn-login center'
          buttonStyle='btn-primary'
          buttonSize='btn-large'
        >
          Submit
        </button>
      </div>
      </Form>
</section>
    <div className='background'>
    <div className='solidblock'></div>

    </div>
   </div>
  );
}

export default Login;
