const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config');
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
      res.status(200).json(results)
    }else{
      res.status(404).json({message : 'no quote in the database'})
    }
  })
})

app.listen(port, err => {
  if(err){
    throw new Error('Something bad appen...')
  }
  console.log(`server running on port ${port}`)
})