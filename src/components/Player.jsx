import React, { useState } from 'react';
import SingleGameStats from './SingleGameStats.jsx';

const Player = ({ playerData }) => {

  const [clicked, setClicked] = useState(false);
  let categories = [];

  const handleClick = () => {
    setClicked(!clicked);
  };

  const possHeaders = {
    passing: ['Completions', 'Pass Attempts', 'Yards', 'TDs'],
    rushing: ['Rushes', 'Yards', 'TDs'],
    receiving: ['Receptions', 'Yards', 'TDs'],
  };

  const getHeaders = (datum) => {
    let headers = [];
    for (let outerKey in datum) {
      if (outerKey !== 'date') {
        for (let key in datum[outerKey]) {
          headers = headers.concat(possHeaders[key]);
          categories.push(key);
        }
      }
    }
    return headers;
  }

  const getExpandedStats = () => {
    let statsArray = [];
    for (let key in playerData.stats) {
      playerData.stats[key].date = key;
      statsArray.push(playerData.stats[key])
    }
    let headers = getHeaders(statsArray[statsArray.length - 1]);

    return (
      <table>
        <tr>
          <th>Date</th>
          {headers.map(head => <th>{head}</th>)}
        </tr>
        <tbody>{statsArray.map((game, i) => <SingleGameStats game={game} categories={categories} key={i}/>)}</tbody>
      </table>
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
