import React from 'react';
import styles from './Add.module.css';

const AddList = ({ addList }) => {

  return (
    <form>
      <h4 className={styles.header}>Add List:</h4>
      <input type="text" className={styles.textInput} name="list-name" id="list-name" placeholder="List Name"></input>
      <button onClick={(e) => addList(e, document.getElementById('list-name').value)} className={styles.button}>Add List</button>
    </form>
  )
}


export default AddList;
