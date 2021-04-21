const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'LoginDB',
});

connection.connect((err)=>{
    if(err){
        console.log(err);
    } else{
        console.log('SQL database Connected...');
    }
});

module.exports = connection;
