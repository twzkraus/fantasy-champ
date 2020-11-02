import React from 'react';
import Player from './Player.jsx';

const PlayerList = ({ playerListName, index, players }) => {

  return (
    <div>
      <div>List Name: {playerListName}</div>
      {players.filter(player => player.listID === index)
        .map(filteredPlayer => <Player key={filteredPlayer.name} playerData={filteredPlayer}/>)}
    </div>
  );
}

export default PlayerList;
