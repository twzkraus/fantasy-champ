import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from './PlayerList.jsx';
import Player from './Player.jsx';
import AddPlayer from './AddPlayer.jsx';
import AddList from './AddList.jsx';
import popularPlayers from '../../data/popularPlayers.json';

const App = () => {

  const [lists, setLists] = useState(['All Players', 'Favorites']);
  const [players, setPlayers] = useState([]);
  const [selectedList, setSelectedList] = useState(0);

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

  const addPlayerToAllPlayers = (event, name, position) => {
    event.preventDefault();
    getPlayer(name)
      .then(result => {
        const newPlayer = {
          name,
          position,
          listIDs: [0],
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

  const changeList = (event, listID) => {
    event.preventDefault();
    setSelectedList(listID);
  };

  return (
    <div>
      <AddPlayer lists={lists} addPlayer={addPlayerToAllPlayers}/>
      <AddList addList={addList}/>
      <nav>
      {lists.map((list, i) =>
        <button key={i} onClick={(e) => changeList(e, i)}>{list}</button>
      )}
      </nav>
      {players.filter(player => player.listIDs.includes(selectedList)).map(filteredPlayer =>
      <Player key={filteredPlayer.name} playerData={filteredPlayer} addToList={includePlayerInList}/>)}
    </div>
  );
};

export default App;
