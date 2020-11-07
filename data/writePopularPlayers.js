const fs = require('fs');
const executeRequest = require('../server/requestPFA');

const stream = fs.createWriteStream('./data/popularPlayers.json');
stream.write('{');

const popularPlayers = [
  {
    name: 'Patrick Mahomes',
    position: 'QB',
  },
  {
    name: 'Saquon Barkley',
    position: 'RB',
  },
  {
    name: 'Ezekiel Elliott',
    position: 'RB',
  },
  {
    name: 'Christian McCaffrey',
    position: 'RB',
  },
  {
    name: 'Alvin Kamara',
    position: 'RB',
  },
  {
    name: 'Davante Adams',
    position: 'WR',
  },
  {
    name: 'DeAndre Hopkins',
    position: 'WR',
  },
  {
    name: 'Todd Gurley',
    position: 'RB',
  },
  {
    name: 'James Conner',
    position: 'RB',
  },
  {
    name: 'Odell Beckham Jr.',
    position: 'WR',
  },
  {
    name: 'Joe Mixon',
    position: 'RB',
  },
  {
    name: 'Julio Jones',
    position: 'WR',
  },
  {
    name: 'JuJu Smith-Schuster',
    position: 'WR',
  },
  {
    name: 'Lamar Jackson',
    position: 'QB',
  },
  {
    name: 'Dalvin Cook',
    position: 'RB',
  },
  {
    name: 'Michael Thomas',
    position: 'WR',
  },
  {
    name: 'Tyreek Hill',
    position: 'WR',
  },
  {
    name: 'Travis Kelce',
    position: 'TE',
  },
  {
    name: 'Nick Chubb',
    position: 'RB',
  },
  {
    name: 'Mike Evans',
    position: 'WR',
  },
  {
    name: 'Josh Jacobs',
    position: 'RB',
  },
  {
    name: 'Le\'Veon Bell',
    position: 'RB',
  },
  {
    name: 'Antonio Brown',
    position: 'WR',
  },
  {
    name: 'Aaron Jones',
    position: 'RB',
  },
  {
    name: 'Keenan Allen',
    position: 'WR',
  },
  {
    name: 'Chris Carson',
    position: 'RB',
  },
  {
    name: 'Kerryon Johnson',
    position: 'RB',
  },
];

let popularData = {};
let i = 0;

popularPlayers.forEach((player, i) => {
  let requestObj = {
    resource: 'players',
    player_name: `${player.name.slice(0,1)}.${player.name.split(' ').slice(1).join(' ')}`,
    stats_type: 'offense',
  }
  executeRequest(requestObj)
    .then(response => {
      popularData[player.name] = response.data;
      stream.write(`"${player.name}":{"position": "${player.position}", "stats":${response.data} },`);
    })
});
