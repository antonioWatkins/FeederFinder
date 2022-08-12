/* eslint-disable no-underscore-dangle */
import React from 'react';
// import { useParams } from 'react-router-dom';

import './Likes.css';

function Likes({ data }) {
  console.log(data._id, 'datainfo');

  console.log(data.likes);
  return (
      <div className='reportgoal'>
      <span>
        {data.likes.length} likes
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
