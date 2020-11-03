import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from './PlayerList.jsx';
import AddPlayer from './AddPlayer.jsx';
import AddList from './AddList.jsx';
import popularPlayers from '../../data/popularPlayers.json';

const App = () => {

  const [lists, setLists] = useState(['All Players', 'Favorites']);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let tempPlayers = [];
    let i = 0;
    for (let key in popularPlayers) {
      tempPlayers.push({
        name: key,
        position: popularPlayers[key].position,
        stats: popularPlayers[key].stats,
        listIDs: [0]
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
          listIDs: [0, parseInt(listID)],
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

  const includePlayerInList = (event, name, listID) => {
    let playersCopy = players.slice();
    players.forEach((player, i) => {
      if (player.name === name && !player.listIDs.includes(listID)) {
        playersCopy[i].listIDs.push(listID);
      }
    });
    setPlayers(playersCopy);
  }

  const addList = (event, name) => {
    event.preventDefault();
    setLists(lists.concat(name));
  };

  return (
    <div>
      <AddPlayer lists={lists} addPlayer={addPlayerToList}/>
      <AddList addList={addList}/>
      {lists.map((listName, i) => <PlayerList key={listName} playerListName={listName} index={i} players={players} addToList={includePlayerInList}/>)}
    </div>
  );
};

export default App;
