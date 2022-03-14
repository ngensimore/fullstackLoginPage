const express = require('express')
const app = express()
const port = 3001

const userTable = require('./pool')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/user', (req, res) => {
    userTable.getUser(req.query)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

app.post('/user', (req,res) => {
  userTable.insertUser(req.body)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})