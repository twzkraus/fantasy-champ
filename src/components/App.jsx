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

  const addPlayerToTeam = (event, player, teamName) => {
    event.preventDefault();
    getPlayer(player)
      .then(result => {
        let newTeams = [];
        teams.forEach(team => {
          if (team.name === teamName) {
            let newTeamPlayers = team.players.slice().push(result);
            newTeams.push({ name: team.name, players: newTeamPlayers })
          } else {
            newTeams.push(team);
          }
        });
        setTeams(newTeams);
      })
      .catch(err => {
      })

  }

  return (
    <div>
      {/* <AddPlayer teams={teams} addPlayer={addPlayerToTeam}/> */}
      {teams.map((teamName, i) => <Team key={teamName} teamName={teamName} index={i} players={players} />)}
    </div>
  );
};

export default App;
