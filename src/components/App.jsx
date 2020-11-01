import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from './Team.jsx';
import AddPlayer from './AddPlayer.jsx';

import { exampleTeams, examplePlayers } from '../exampleTeam.js';

const App = () => {

  const [teams, setTeams] = useState(exampleTeams);
  const [players, setPlayers] = useState(examplePlayers);

  const getPlayer = (name) => {
    const playerObj = {
      resource: 'players',
      player_name: `${name.slice(0,1)}.${name.split(' ').slice(1)}`,
      stats_type: 'offense'
    };
    return axios.get('/stats', {
      params: playerObj,
    });
  };

  const addPlayerToTeam = (event, name, position, teamID) => {
    event.preventDefault();
    getPlayer(name)
      .then(result => {
        const newPlayer = {
          name,
          position,
          teamID: parseInt(teamID),
          stats: result.data,
          points: 0,
        };
        let tempPlayers = players.slice();
        tempPlayers.push(newPlayer);
        setPlayers(tempPlayers);
      })
      .catch(err => {
        console.log('error getting player', err);
      })
  }

  return (
    <div>
      <AddPlayer teams={teams} addPlayer={addPlayerToTeam}/>
      {teams.map((teamName, i) => <Team key={teamName} teamName={teamName} index={i} players={players} />)}
    </div>
  );
};

export default App;
