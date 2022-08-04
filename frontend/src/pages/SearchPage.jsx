import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom/'

function SearchPage() {

  const [searchText, setSearchText] = useState('')
  const [playerData, setPlayerdata] = useState([])
  const API_KEY = 'RGAPI-a6bc94cc-00a8-4363-ab8a-8cf1c7980526';
  //console.log(searchText)




// the real call is being called on the backend hiding the api keys
  function SearchForPlayer(player) {

// the url makes it seems that the website is doing the call but its being done on the backend
    const options = {
      method: 'GET',
      url: '/api/feeder/searchpage/' + player,
    };
    return axios.request(options).then(response => response.data).catch(() => null);
  }



  function SearchForPlayers(response) {
    const players = searchText.split(",").slice(0, 5).map(strplayer => strplayer.toLowerCase().replace('has entered the lobby', '').trim())
    Promise.all(players.map(SearchForPlayer)).then((playerData) => setPlayerdata(playerData.filter(Boolean)));
  }

  return (
    <>
      <h5 className="heading"> search player</h5>
      <input type="text" className='form' onChange={e => setSearchText(e.target.value)}></input>
      <div>
        <button className='btn btn-block' onClick={e => SearchForPlayers(e)}> Search for player</button>
      </div>
      <div className='goals'>
        {playerData.map((player) => (
          <div>

          <p key={player.name} className='goal'> <div>Summoner: {player.name}</div>
            <div className="soloQ" key={player.soloQ}>Solo: {(player.soloQ || '').replace('/',  'LP : ')}</div>
            <div className="flexQ" key={player.flexQ}>Flex: {(player.flexQ || '').replace('/',  'LP : ')}</div>
          </p>
            {player.mostPlayedChamps.map((champ) => (
              

            <div className ='goal2'>
              <div  key={champ.champName}>
                Champion: {champ.champName}
              </div>
            <div key={champ.kda}>
                KDA: {champ.kda}
                </div>
                <div key={champ.winrate}>
                Win Rate: {champ.winrate}
                </div>
                <div key={champ.totalGames}>
                Games: {champ.totalGames}
                </div>
            </div>
            ))}
                <h3> make a report </h3>
            <Link to={`/api/report/${player.name}`}>
             Report 
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchPage

