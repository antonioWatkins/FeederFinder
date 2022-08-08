/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { likeReport } from '../features/reports/reportSlice';
import './Likes.css';

function Likes({ data }) {
  const { user } = useSelector((state) => state.auth);
  const liked = data.likes.includes(user.id);
  const dispatch = useDispatch();
  console.log(data._id, 'datainfo');
  const handleLike = () => {
    dispatch(likeReport(data._id));

    // eslint-disable-next-line no-unused-expressions
  };
  console.log(data.likes);
  return (
      <div className='justwork'>
      <span>
        {data.likes.length} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.summoner} </b>
        </span>
        <span>{data.post}</span>
      </div>
    <img
    src={liked ? '/img/like.png' : '/img/unlike.png'}
    alt=''
    onClick={handleLike}
    />
    </div>
  );
}

export default Likes;
