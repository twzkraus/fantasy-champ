import React, { useState } from 'react';
import SingleGameStats from './SingleGameStats.jsx';

const Player = ({ playerData, addToList, lists }) => {

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
      <React.Fragment>
        <p className="text">This player is in the following lists:</p>
        {lists.filter((listName, i) => playerData.listIDs.includes(i)).map(filteredLists => <p>{filteredLists}</p>)}
        <p>Add to:</p>
        {lists.filter((listName, i) => !playerData.listIDs.includes(i)).map(filteredLists => <button onClick={(e) => addToList(e, playerData.name, lists.indexOf(filteredLists))}>{filteredLists}</button>)}
        {headers.length ? <h4>Stats:</h4> : null}
        <table key={`${playerData.name}-table`}>
          <thead key="table-head">
            <tr>
              {headers.length ? <th>Date</th> : null}
              {headers.map((head, i) => <th key={i}>{head}</th>)}
            </tr>
          </thead>
          <tbody key="table-body">{statsArray.map((game, i) => <SingleGameStats game={game} categories={categories} key={i}/>)}</tbody>
        </table>
      </React.Fragment>
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
