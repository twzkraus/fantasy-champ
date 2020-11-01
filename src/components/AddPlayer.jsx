import React from 'react';

const AddPlayer = ({ teams, addPlayer }) => {

  const positions = ['QB', 'RB', 'WR', 'TE', 'D/ST', 'K'];

  return (
    <form>
      <h4>Add a Player:</h4>
      <input type="text" name="player-name" id="player-name" placeholder="Player Name"></input>
      <select id="fantasy-team-index" name="fantasy-team-index">
        {teams.map((teamName, i) =>
          <option value={i} key={teamName}>
            {teamName}
          </option>)
        }
      </select>
      <select id="position" name="position">
        {positions.map(pos => <option value={pos} key={pos}>{pos}</option>)}
      </select>
      <button onClick={(e) => addPlayer(e, document.getElementById('player-name').value, document.getElementById('position').value, document.getElementById('fantasy-team-index').value)}>Search</button>
    </form>
  )
}


export default AddPlayer;
