const express = require('express');
const executeRequest = require('./requestPFA');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.get('/stats', (req, res) => {
  console.log(req.body);
  executeRequest(req.body)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.send(400);
    })
});

app.listen(PORT, () => {
  console.log(`Express Server is listening on port ${PORT}`);
});
