const  mysql = require('mysql');
require('dotenv').config()
const  connection = mysql.createConnection({
  host :  'localhost', // adresse du serveur
  user :  process.env.DB_USER, // le nom d'utilisateur
  password : process.env.DB_PASS , // le mot de passe
  database :  process.env.DB, // le nom de la base de données
});
module.exports = connection;