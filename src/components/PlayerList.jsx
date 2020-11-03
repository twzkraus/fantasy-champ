import React from 'react';
import Player from './Player.jsx';

const PlayerList = ({ playerListName, index, players, addToList }) => {

  return (
    <div>
      <div>List Name: {playerListName}</div>
      {players.filter(player => player.listIDs.includes(index))
        .map(filteredPlayer => <Player key={filteredPlayer.name} playerData={filteredPlayer} addToList={addToList}/>)}
    </div>
  );
}

export default PlayerList;
