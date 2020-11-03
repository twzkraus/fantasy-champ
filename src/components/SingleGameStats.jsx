import React from 'react';
const jsonexport = require("jsonexport/dist");

const parseGameData = (obj) => {
  let statString = '';
  for (let key in obj) {
    if (key === 'rushing') {
      statString += `rushing attempts: ${obj[key].attempts}\n`;
      statString += `rushing yards: ${obj[key].yards}\n`;
      statString += `rushing TDs: ${obj[key].touchdowns}\n`;
    } else if (key === 'receiving') {
      statString += `receptions: ${obj[key].receptions}\n`;
      statString += `receiving yards: ${obj[key].yards}\n`;
      statString += `receiving touchdowns: ${obj[key].touchdowns}\n`;
    } else if (key === 'passing') {
      statString += 'still need to add passer data';
    }
  }
  return statString;
};

const SingleGameStats = ({ game }) => {

  let formattedGameData = `Date: ${game.date}\n`;

  for (let key in game) {
    if (key !== 'date') {
      formattedGameData += parseGameData(game[key]);
    }
  }

  return (
    <div>{formattedGameData}</div>
  )
}

export default SingleGameStats;
