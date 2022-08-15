/* eslint-disable no-shadow */
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';
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
    return axios.request(options)
      .then((response) => (response.data
        ? { ...response.data, exists: true }
        : { name: player, exists: false }
      ))
      .catch(() => ({ name: player, exists: false }));
  }

  // eslint-disable-next-line no-unused-vars
  function SearchForPlayers(response) {
    const players = searchText.split(',').slice(0, 5).map((strplayer) => strplayer.toLowerCase().replace('has joined the lobby', '').trim());
    // eslint-disable-next-line no-shadow
    Promise.all(players.map(SearchForPlayer))
      .then((playerData) => setPlayerdata(playerData));
  }

  return (
    <div className='search-container background'>
    <Container>

      <Form id='search-heading'>
      <p className="heading">Search Players</p>
      <Form.Control
      required
       type="text"
       className='form'
       id='search-bar'
      value={searchText}
       isInvalid={!hasEntry}
       placeholder="Summoner Name"
       onChange={(e) => setSearchText(e.target.value)}
        />
        <Button id='search-btn'
         variant='outline-light'
         disabled={!allValid}
          onClick={(e) => SearchForPlayers(e)}>Search for Player</Button>
      <Form.Control.Feedback>Please enter a Summoners name</Form.Control.Feedback>
      </Form>
      <div className='goals'>
        {playerData.map((player) => (
          <div key={player.name}>
          {
            player.exists
              ? <PlayerCard player={player} />
              : <div>We could not find any info for {player.name}</div>
          }
          </div>
        ))}
      </div>
    </Container>
    </div>
  );
}

function PlayerCard({ player }) {
  return (
    <>
      <div className='goal'>
        <p>Summoner: <strong>{player.name }</strong></p>
        <p className="soloQ" key={player.soloQ}>Solo: <strong>{(player.soloQ || '').replace('/', 'LP : ')}</strong></p>
        <p className="flexQ" key={player.flexQ}>Flex: <strong>{(player.flexQ || '').replace('/', 'LP : ')}</strong></p>
      </div>
      {player.mostPlayedChamps.map((champ) => (
        <PlayerChamp key={champ.champName} champ={champ} />
      ))}
      <h3>Write an Entry </h3>
      <Button href={`/api/report/${player.name}`}>
          Report
      </Button>
      <Button href='/api/feeder/'>
        Journal
      </Button>
    </>
  );
}

function PlayerChamp({ champ }) {
  return (
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
  );
}

export default SearchPage;
