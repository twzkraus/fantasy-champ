import React from 'react';
import Player from './Player.jsx';

const Team = ({ teamData }) => {

  return (
    <div>
      <div>Team Name: {teamData.name}</div>
      {teamData.players.map(playerData => <Player playerData={playerData}/>)}
    </div>
  );
}

export default Team;
