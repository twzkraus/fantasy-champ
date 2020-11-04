import React from 'react';
import styles from './Player.module.css';

const getPassingData = (obj) => {
  if (obj.passing) {
    return (
      <React.Fragment>
        <td className={styles.statsTable}>{obj.passing.completions}</td>
        <td className={styles.statsTable}>{obj.passing.attempts}</td>
        <td className={styles.statsTable}>{obj.passing.yards}</td>
        <td className={styles.statsTable}>{obj.passing.touchdowns}</td>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <td className={styles.statsTable}>{0}</td>
        <td className={styles.statsTable}>{0}</td>
        <td className={styles.statsTable}>{0}</td>
        <td className={styles.statsTable}>{0}</td>
      </React.Fragment>
    )
  }
};

const getRushingData = (obj) => {
  if (obj.rushing) {
    return (
      <React.Fragment>
        <td className={styles.statsTable}>{obj.rushing.attempts}</td>
        <td className={styles.statsTable}>{obj.rushing.yards}</td>
        <td className={styles.statsTable}>{obj.rushing.touchdowns}</td>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <td className={styles.statsTable}>{0}</td>
        <td className={styles.statsTable}>{0}</td>
        <td className={styles.statsTable}>{0}</td>
      </React.Fragment>
    )
  }
};

const getReceivingData = (obj) => {
  if (obj.receiving) {
    return (
      <React.Fragment>
      <td className={styles.statsTable}>{obj.receiving.receptions}</td>
      <td className={styles.statsTable}>{obj.receiving.yards}</td>
      <td className={styles.statsTable}>{obj.receiving.touchdowns}</td>
    </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <td className={styles.statsTable}>{0}</td>
        <td className={styles.statsTable}>{0}</td>
        <td className={styles.statsTable}>{0}</td>
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
    <tr className={styles.statsTable}>
      <td className={styles.statsTable}>{`${game.date.slice(4, 6)}/${game.date.slice(6, 8)}/${game.date.slice(0, 4)}`}</td>
      {categories.includes('passing') ? getPassingData(realGameObj) : null}
      {categories.includes('rushing') ? getRushingData(realGameObj) : null}
      {categories.includes('receiving') ? getReceivingData(realGameObj) : null}
    </tr>
  )
}

export default SingleGameStats;
