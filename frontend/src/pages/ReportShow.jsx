/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getReport } from '../features/reports/reportSlice';
import { reset } from '../features/auth/authSlice';
// eslint-disable-next-line import/no-unresolved
import Spinner from '../components/Spinner';
import Likes from '../components/Likes';

function ReportShow() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    report, isLoading, isError, message,
  } = useSelector(
    (state) => state.report,
  );
  console.log(report, 'reportftr');

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getReport());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
   <div className='report-container'>
   <h1>Report Page</h1>
   <div>
      <Form>
        <Form.Group>
          <Form.Control
          type='text'
           placeholder='Search...'
           onChange={(event) => {
             setSearchText(event.target.value);
           }}
           >

          </Form.Control>
        </Form.Group>
      </Form>
    </div>
    <div className='reportgoals'>

      {report.filter((val) => (
        searchText === '' || val.summoner.toLowerCase().includes(searchText.toLowerCase())
      )).map((report) => (

       <Likes data={report} key={report._id} />))}

      </div>
      </div>
  );
}

export default ReportShow;
