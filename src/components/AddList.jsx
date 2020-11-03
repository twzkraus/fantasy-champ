import React from 'react';
import styles from './Forms.module.css';

const AddList = ({ addList }) => {

  return (
    <form>
      <h4>Make a New List:</h4>
      <input type="text" className={styles.body} name="list-name" id="list-name" placeholder="List Name"></input>
      <button onClick={(e) => addList(e, document.getElementById('list-name').value)} className={styles.body}>Add!</button>
    </form>
  )
}


export default AddList;
