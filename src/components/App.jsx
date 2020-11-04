import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from './Logo.jsx';
import PlayerList from './PlayerList.jsx';
import Player from './Player.jsx';
import AddPlayer from './AddPlayer.jsx';
import AddList from './AddList.jsx';
import popularPlayers from '../../data/popularPlayers.json';
import styles from './App.module.css';

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
      });
    document.getElementById('player-name').value = '';
    document.getElementById('position').value = 'QB';
  };

  const includePlayerInList = (event, name, listID) => {
    let playersCopy = players.slice();
    players.forEach((player, i) => {
      if (player.name === name && !player.listIDs.includes(listID)) {
        playersCopy[i].listIDs.push(listID);
      }
    });
    setPlayers(playersCopy);
  };

  const removePlayerFromList = (event, name, listID) => {
    let playersCopy = players.slice();
    players.forEach((player, i) => {
      if (player.name === name && player.listIDs.includes(listID)) {
        let arr = playersCopy[i].listIDs;
        arr.splice(arr.indexOf(listID), 1);
      }
    });
    setPlayers(playersCopy);
  }

  const addList = (event, name) => {
    event.preventDefault();
    setLists(lists.concat(name));
    document.getElementById('list-name').value = '';
  };

  const changeList = (event, listID) => {
    event.preventDefault();
    setSelectedList(listID);
  };

  return (
    <div>
      <Logo />
      <div className={styles.container}>
        <AddPlayer lists={lists} addPlayer={addPlayerToAllPlayers}/>
        <AddList addList={addList}/>
      </div>
      <nav>
        <h1 className={styles.listNav}>Your Lists:</h1>
        {lists.map((list, i) =>
          i === selectedList ?
            <button className={styles.selected} key={i} onClick={(e) => changeList(e, i)}>{list}</button> :
            <button className={styles.listButton} key={i} onClick={(e) => changeList(e, i)}>{list}</button>
        )}
      </nav>
      <div className={styles.listHead}>
        <h2>Name</h2>
        <h2>Position</h2>
        <h2>Lists</h2>
      </div>
      {players.filter(player => player.listIDs.includes(selectedList)).map(filteredPlayer =>
      <Player key={filteredPlayer.name} lists={lists} playerData={filteredPlayer} addToList={includePlayerInList} removeFromList={removePlayerFromList}/>)}
    </div>
  );
};

export default App;
