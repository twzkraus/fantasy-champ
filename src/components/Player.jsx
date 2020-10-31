import React from 'react';

const Player = ({ playerData }) => {

  return (
  <div>{playerData.name} {playerData.position} {playerData.points}</div>
  )
};

export default Player;
