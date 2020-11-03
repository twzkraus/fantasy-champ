import React from 'react';

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
      {categories.includes('passing') ? getPassingData(realGameObj) : null}
      {categories.includes('rushing') ? getRushingData(realGameObj) : null}
      {categories.includes('receiving') ? getReceivingData(realGameObj) : null}
    </tr>
  )
}

export default SingleGameStats;
