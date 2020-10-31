const { curly } = require('node-libcurl');
const PRO_FOOTBALL_API_KEY = require('../secrets.js');

// sends query to Pro Football API using the parameters defined in options
// returns a promise
const executeRequest = (options) => {
  let query = `api_key=${PRO_FOOTBALL_API_KEY}`;

  for (let key in options) {
    query += `&${key}=${options[key]}`;
  }

  return curly.post(`https://profootballapi.com/players`, { postFields: query });
};

// Working test case:
// executeRequest({stats_type: 'offense', team: 'GB', year: 2019, week: 1}).then(result => console.log(result.data));
module.exports = executeRequest;
