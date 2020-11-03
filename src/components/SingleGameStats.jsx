import React from 'react';
// const jsonexport = require("jsonexport/dist");

// const parseGameData = (obj, categories) => {
//   let statString = '';
//   for (let key in obj) {
//     if (key === 'rushing' && headers.includes('Date Att. Yds. TDs')) {
//       statString += `${obj[key].attempts} ${obj[key].yards} ${obj[key].touchdowns} `;
//     } else if (key === 'receiving' && headers.includes('Date Rec. Yds. TDs')) {
//       statString += `${obj[key].receptions} ${obj[key].yards} ${obj[key].touchdowns} `;
//     } else if (key === 'passing' && headers.includes('Date Comp. Att. Yds. TDs')) {
//       statString += `${obj[key].completions} ${obj[key].attempts} ${obj[key].yards} ${obj[key].touchdowns}`;
//     }
//   }
//   return statString;
// };

const getPassingData = (obj) => {
  if (obj.passing) {
    return (
      <React.Fragment>
        <td>{obj.passing.completions}</td>
        <td>{obj.passing.attempts}</td>
        <td>{obj.passing.yards}</td>
        <td>{obj.passing.touchdowns}</td>
      </React.Fragment>
    )
  }
};

const getRushingData = (obj) => {
  if (obj.rushing) {
    return (
      <React.Fragment>
        <td>{obj.rushing.attempts}</td>
        <td>{obj.rushing.yards}</td>
        <td>{obj.rushing.touchdowns}</td>
      </React.Fragment>
    )
  }
};

const getReceivingData = (obj) => {
  if (obj.receiving) {
    return (
      <React.Fragment>
      <td>{obj.receiving.receptions}</td>
      <td>{obj.receiving.yards}</td>
      <td>{obj.receiving.touchdowns}</td>
    </React.Fragment>
  )
}
};

const SingleGameStats = ({ game, categories }) => {
  let realGameObj;

  for (let key in game) {
    if (key !== 'date') {
      realGameObj = game[key];
    }
  }

  return (
    <tr>
      <td>{`${game.date.slice(0, 4)}-${game.date.slice(4, 6)}-${game.date.slice(6, 8)}`}</td>
      {categories.includes('passing') ? getPassingData(realGameObj) : ''}
      {categories.includes('rushing') ? getRushingData(realGameObj) : ''}
      {categories.includes('receiving') ? getReceivingData(realGameObj) : ''}
    </tr>
  )
}

export default SingleGameStats;
