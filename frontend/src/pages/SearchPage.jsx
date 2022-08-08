/* eslint-disable no-shadow */
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './SearchPage.css';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [playerData, setPlayerdata] = useState([]);
  const hasEntry = Boolean(searchText);
  const allValid = hasEntry;
  // console.log(searchText)

  // the real call is being called on the backend hiding the api keys
  function SearchForPlayer(player) {
    // the url makes it seems that the website is doing the call but its being done on the backend
    const options = {
      method: 'GET',
      url: `/api/feeder/searchpage/${player}`,
    };
    return axios.request(options).then((response) => response.data).catch(() => null);
  }

  // eslint-disable-next-line no-unused-vars
  function SearchForPlayers(response) {
    const players = searchText.split(',').slice(0, 5).map((strplayer) => strplayer.toLowerCase().replace('has entered the lobby', '').trim());
    // eslint-disable-next-line no-shadow
    Promise.all(players.map(SearchForPlayer))
      .then((playerData) => setPlayerdata(playerData.filter(Boolean)));
  }

  return (
    <div className='search-container background'>
      <div id='search-heading'>
      <p className="heading">Search Players</p>
      <input
      required
      value={searchText}
       isinvalid={hasEntry}
       id='search-bar'
       type="text"
       className='form'
       onChange={(e) => setSearchText(e.target.value)}
        />
        <Button id='search-btn'
         variant='outline-light'
         disabled={!allValid}
          onClick={(e) => SearchForPlayers(e)}>Search for Player</Button>

      </div>
      <div className='goals'>
        {playerData.map((player) => (
          <div>

          <p key={player.name} className='goal'>
          <div>Summoner: <strong>{player.name}</strong></div>
            <div className="soloQ" key={player.soloQ}>Solo: <strong>{(player.soloQ || '').replace('/', 'LP : ')}</strong></div>
            <div className="flexQ" key={player.flexQ}>Flex: <strong>{(player.flexQ || '').replace('/', 'LP : ')}</strong></div>
          </p>
            {player.mostPlayedChamps.map((champ) => (

            <div className ='goal2 text-center'>
              <div key={champ.champName}>
                Champion: <strong>{champ.champName}</strong>
              </div>
            <div key={champ.kda}>
                KDA: <strong>{champ.kda}</strong>
                </div>
                <div key={champ.winrate}>
                Win Rate: <strong>{champ.winrate}</strong>
                </div>
                <div key={champ.totalGames}>
                Games: <strong>{champ.totalGames}</strong>
                </div>
            </div>
            ))}
                <h3>Write an Entry </h3>
            <Button href={`/api/report/${player.name}`}>
                Report
            </Button>
            <Button href='/api/feeder/'>
              Journal
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
