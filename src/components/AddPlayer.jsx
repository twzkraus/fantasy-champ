import React from 'react';

const AddPlayer = ({ teams, addPlayer }) => (
  <form>
    <h4>Add a Player:</h4>
    <input type="text" name="player-name" id="player-name" placeholder="Player Name"></input>
    <select id="fantasy-team" name="fantasy-team">
      {teams.map(team => <option value={team.name.toLowerCase().split(' ').join('-')}>{team.name}</option>)}
    </select>
    <button onClick={(e) => addPlayer(e, document.getElementById('player-name').value, document.getElementById('fantasy-team').value)}>Search</button>
  </form>
);

export default AddPlayer;
