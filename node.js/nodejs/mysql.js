var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mirim2',
  database : 'dreamingbirds1'
});
 
connection.connect();
 
connection.query('SELECT* FROM user', function (error, results, fields) {
  if (error){
      console.log(error);
  }
  console.log(results);
  //console.log('The solution is: ', results[0].solution);
});
 
connection.end();