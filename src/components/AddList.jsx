import React from 'react';

const AddList = ({ addList }) => {

  return (
    <form>
      <h4>Make a New List:</h4>
      <input type="text" name="list-name" id="list-name" placeholder="List Name"></input>
      <button onClick={(e) => addList(e, document.getElementById('list-name').value)}>Add!</button>
    </form>
  )
}


export default AddList;
