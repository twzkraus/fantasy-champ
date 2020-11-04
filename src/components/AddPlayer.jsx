import React from 'react';
import styles from './Add.module.css';

const AddPlayer = ({ lists, addPlayer }) => {

  const positions = ['QB', 'RB', 'WR', 'TE', 'D/ST', 'K'];

  return (
    <form>
      <h4 className={styles.header}>Add Player:</h4>
      <input type="text" className={styles.textInput} name="player-name" id="player-name" placeholder="Player Name"></input>
      <select id="position" name="position" className={styles.dropdown}>
        {positions.map(pos => <option value={pos} key={pos}>{pos}</option>)}
      </select>
      <button onClick={(e) => addPlayer(e, document.getElementById('player-name').value, document.getElementById('position').value)} className={styles.button}>Add Player</button>
    </form>
  )
}


export default AddPlayer;
