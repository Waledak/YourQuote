const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config');
const addQuoteForm = require('./addQuoteForm')
const card = require('./card')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  const query = 'select * from Quote order by adding_date desc';
  connection.query(query, (err, results) => {
    if(err){
      console.log(err)
      res.sendStatus(500);
    }
    if(results.length > 0){
      res.status(200).send(`<h2>Quote(s)</h2>${results.map(quote => card(quote)).join("")}`)
    }else{
      res.status(404).send('no quote in the database')
    }
  })
})

app.listen(port, err => {
  if(err){
    throw new Error('Something bad appen...')
  }
  console.log(`server running on port ${port}`)
})