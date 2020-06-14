const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config');
const { end } = require('./config');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let date = new Date();
date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' + 
      ('00' + date.getHours()).slice(-2) + ':' + 
      ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + date.getUTCSeconds()).slice(-2);

app.get('/quotes', (req, res) => {
  const query = 'select * from Quote';
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

app.get('/quotes/:order', (req, res) => {
  let query = 'select * from Quote order by adding_date desc';
  if(req.params.order === "asc" || req.params.order === "desc"){
    const { order } = req.params;
    if(order === "asc"){
      query = 'select * from Quote order by adding_date asc';
    }
    connection.query(query, order,(err, results) => {
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
  }else{
    res.status(422).json({ message : 'wrong parameter'})
  }
})

app.delete('/quotes/del/:id', (req, res) => {
  const query = 'DELETE FROM Quote WHERE id = ?';
  const { id } = req.params;
  connection.query(query, [id], (err, results) => {
    if(err){
      console.log(err)
      res.sendStatus(500);
    }
    if(results.affectedRows === 1){
      res.status(204).json({ message : "success"})
    }else{
      res.status(404).json({message : 'no quote with this id'})
    }
  })
})

app.delete('/quotes/delFalse', (req, res) => {
  const query = 'DELETE FROM Quote WHERE isTrue = 0';
  connection.query(query, (err, results) => {
    if(err){
      console.log(err)
      res.sendStatus(500);
    }
    if(results.affectedRows !== 0){
      res.status(204).json({ message : "success"})
    }else{
      res.status(404).json({message : 'no quote to delete'})
    }
  })
})


app.post('/addQuote', (req, res) => {
  const query = 'insert into Quote (adding_date, isTrue, quote) VALUES (?,?,?)';
  const { isTrue, quote } = req.body;
  if(Number(isTrue) !== 0 && Number(isTrue) !== 1){
    res.status(422).json({ message: 'wrong data type send'});
  }else{
    connection.query(query, [date, Number(isTrue), quote], (err, results) => {
      if(err){
        console.log(err)
        res.sendStatus(500);
      }
      if(results.affectedRows === 1){
        res.status(201).json({ message : 'created'});
      }else{
        res.status(422).json({message : `something went wrong while insert`})
      }
    })
  }
})

app.listen(port, err => {
  if(err){
    throw new Error('Something bad appen...')
  }
  console.log(`server running on port ${port}`)
})