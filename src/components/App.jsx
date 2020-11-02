import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from './Team.jsx';
import AddPlayer from './AddPlayer.jsx';
import popularPlayers from '../../data/popularPlayers.json';

import { exampleTeams, examplePlayers } from '../exampleTeam.js';

const App = () => {

  const [teams, setTeams] = useState(exampleTeams);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let tempPlayers = [];
    let i = 0;
    for (let key in popularPlayers) {
      tempPlayers.push({
        name: key,
        position: popularPlayers[key].position,
        stats: popularPlayers[key].stats,
        teamID: ++i % 2
      })
    }
    setPlayers(tempPlayers);
  }, []);

  const getPlayer = (name) => {
    const playerObj = {
      resource: 'players',
      player_name: `${name.slice(0,1)}.${name.split(' ').slice(1).join(' ')}`,
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
  };

  return (
    <div>
      <AddPlayer teams={teams} addPlayer={addPlayerToTeam}/>
      {teams.map((teamName, i) => <Team key={teamName} teamName={teamName} index={i} players={players} />)}
    </div>
  );
};

export default App;
