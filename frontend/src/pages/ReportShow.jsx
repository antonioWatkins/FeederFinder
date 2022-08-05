/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getReport } from '../features/reports/reportSlice';
import { reset } from '../features/auth/authSlice';
// eslint-disable-next-line import/no-unresolved
import Spinner from '../components/Spinner';
import Likes from '../components/Likes';

function ReportShow() {
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
   <div className='goal'>
    <div className='goals'>
      {report.map((report, id) => (
       <Likes data={report} key={id} />))}
       
      </div>
      </div>
  );
}

export default ReportShow;
