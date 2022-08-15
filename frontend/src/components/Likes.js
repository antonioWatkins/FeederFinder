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
      Posted by {data.player}
      </span>
      <div className="detail">
        <div className= 'detail-summoenr'>
          <b>Report on Summoner {data.summoner}</b>
        </div>
        <div className='detail-post'>{data.post}</div>
      </div>
    </div>
  );
}

export default Likes;
