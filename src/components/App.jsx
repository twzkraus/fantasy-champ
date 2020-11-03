import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from './PlayerList.jsx';
import AddPlayer from './AddPlayer.jsx';
import popularPlayers from '../../data/popularPlayers.json';

const App = () => {

  const [lists, setLists] = useState(['All Players']);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let tempPlayers = [];
    let i = 0;
    for (let key in popularPlayers) {
      tempPlayers.push({
        name: key,
        position: popularPlayers[key].position,
        stats: popularPlayers[key].stats,
        listID: 0
      })
    }
    setPlayers(tempPlayers);
  }, []);

  const getPlayer = (name) => {
    const playerObj = {
      resource: 'players',
      player_name: `${name.slice(0,1)}.${name.split(' ').slice(1).join(' ')}`,
      stats_type: 'offense'
    };
    return axios.get('/stats', {
      params: playerObj,
    });
  };

  const addPlayerToList = (event, name, position, listID) => {
    event.preventDefault();
    getPlayer(name)
      .then(result => {
        const newPlayer = {
          name,
          position,
          listID: parseInt(listID),
          stats: result.data,
          points: 0,
        };
        let tempPlayers = players.slice();
        tempPlayers.push(newPlayer);
        setPlayers(tempPlayers);
      })
      .catch(err => {
        console.log('error getting player', err);
      })
  };

  return (
    <div>
      <AddPlayer lists={lists} addPlayer={addPlayerToList}/>
      {lists.map((listName, i) => <PlayerList key={listName} playerListName={listName} index={i} players={players} />)}
    </div>
  );
};

export default App;
