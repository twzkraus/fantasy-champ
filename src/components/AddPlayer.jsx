import React from 'react';
import styles from './Forms.module.css';

const AddPlayer = ({ lists, addPlayer }) => {

  const positions = ['QB', 'RB', 'WR', 'TE', 'D/ST', 'K'];

  return (
    <form>
      <h4>Add a Player:</h4>
      <input type="text" className={styles.body} name="player-name" id="player-name" placeholder="Player Name"></input>
      <select id="position" name="position" className={styles.body}>
        {positions.map(pos => <option value={pos} key={pos}>{pos}</option>)}
      </select>
      <button onClick={(e) => addPlayer(e, document.getElementById('player-name').value, document.getElementById('position').value)} className={styles.body}>Search</button>
    </form>
  )
}


export default AddPlayer;
