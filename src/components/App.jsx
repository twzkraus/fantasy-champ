import React, { useState, useEffect } from 'react';
import Team from './Team.jsx';
import exampleTeam from '../exampleTeam.js';
import AddPlayer from './AddPlayer.jsx';

const App = () => {

  const [teams, setTeams] = useState([exampleTeam, exampleTeam]);

  return (
    <div>
      <AddPlayer />
      {teams.map(teamData => <Team teamData={teamData}/>)}
    </div>
  );
};

export default App;
