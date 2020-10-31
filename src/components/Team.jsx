import React from 'react';
import Player from './Player.jsx';

const Team = ({ teamName, index, players }) => {

  return (
    <div>
      <div>Team Name: {teamName}</div>
      {players.filter(player => player.teamID === index)
        .map(filteredPlayer => <Player key={filteredPlayer.name} playerData={filteredPlayer}/>)}
    </div>
  );
}

export default Team;
