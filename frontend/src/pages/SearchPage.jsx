import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card'

function SearchPage() {

  const [searchText, setSearchText] = useState('')
  const [playerData, setPlayerdata] = useState([])
  const API_KEY = 'RGAPI-a6bc94cc-00a8-4363-ab8a-8cf1c7980526';
  //console.log(searchText)




  function SearchForPlayer(player) {


    const options = {
      method: 'GET',
      url: 'https://lol_stats.p.rapidapi.com/na1/' + player,
      headers: {
        'X-RapidAPI-Key': 'f5363a7e87mshaf27c657b83d227p126a5ajsnddbdde284f81',
        'X-RapidAPI-Host': 'lol_stats.p.rapidapi.com'
      }
    };
    return axios.request(options).then(response => response.data).catch(() => null);
  }



  function SearchForPlayers(response) {
    const players = searchText.split(",").slice(0, 4).map(strplayer => strplayer.toLowerCase().replace('has entered the lobby', '').trim())
    Promise.all(players.map(SearchForPlayer)).then((playerData) => setPlayerdata(playerData.filter(Boolean)));
  }

  return (
    <>
      <h5 className="heading"> search player</h5>
      <input type="text" className='form' onChange={e => setSearchText(e.target.value)}></input>
      <div>
        <button className='btn btn-block' onClick={e => SearchForPlayers(e)}> Search for player</button>
      </div>
      <div className='card'>
        {playerData.map((player) => (
          <div key={player.name} className='playerCard'> <div>Summoner name: {player.name}</div>
            <div className="soloQ" key={player.soloQ}>Solo Rank: {(player.soloQ || '').replace('/', ' - LP : ')}</div>
            <div className="flexQ" key={player.flexQ}>Flex Rank: {(player.flexQ || '').replace('/', ' - LP : ')}</div>

            <div>most played champs</div>
            {player.mostPlayedChamps.map((champ) => (
              <div key={champ.champName}>
                Champion: {champ.champName}
              </div>
            ))}
          </div>
       ))}
      </div>
    </>
  );
}

export default SearchPage

