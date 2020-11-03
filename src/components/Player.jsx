import React, { useState } from 'react';
import SingleGameStats from './SingleGameStats.jsx';

const Player = ({ playerData }) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const getExpandedStats = () => {
    let statsArray = [];
    for (let key in playerData.stats) {
      playerData.stats[key].date = key;
      statsArray.push(playerData.stats[key])
    }
    return (
      statsArray.map((game, i) => <SingleGameStats game={game} key={i}/>)
    )
  }

  return (
    <div>
      <div key={`${playerData.name}-header`} onClick={handleClick}>{playerData.name} {playerData.position}</div>
      {clicked ? getExpandedStats() : ''}
    </div>
  )
};

export default Player;
