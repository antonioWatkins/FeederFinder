/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeReport } from '../features/reports/reportSlice';

function Likes({ data }) {
  const { user } = useSelector((state) => state.auth);
  const [liked, setliked] = useState(data.likes.includes(user.id));
  const [likes, setLikes] = useState(data.likes.length);

  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(
      likeReport(data._id, user._id),
      setliked((prev) => !prev),
      liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1),
    );
  };
  return (
    <div className='just work'>
    <img
    src={liked ? '/img/like.png' : '/img/unlike.png'}
    alt=''
    onClick={handleLike}
    />
      <span>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.summoner} </b>
        </span>
        <span>{data.post}</span>
      </div>
    </div>
  );
}

export default Likes;
