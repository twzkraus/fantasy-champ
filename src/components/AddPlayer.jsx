import React from 'react';

const AddPlayer = ({teams}) => (
  <form>
    <h4>Add a Player:</h4>
    <input type="text" placeholder="Player Name"></input>
    <select id="fantasy-team" name="fantasy-team">
      {teams.map(team => <option value={team.name.toLowerCase().split(' ').join('-')}>{team.name}</option>)}
    </select>
    <button type="submit">Search</button>
  </form>
);

export default AddPlayer;
