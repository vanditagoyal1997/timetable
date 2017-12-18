var mysql=require('mysql');
var connection=mysql.createConnection({
	host     : '127.0.0.1',
    user     : 'admin',
    password : 'admin',
    database    : 'vandita'
});

connection.connect(function(err) {
  if (err) throw err;
});
module.exports.signup=function (req, res) {
	
   //inserting data in mysql file
   response = {
      regno:req.query.regno,
      pwd:req.query.pwd
   };
   console.log(response);
   var sql = "INSERT INTO login (registration, password) VALUES (" + "'"+response.regno+"'"+","+"'"+response.pwd+"'"+")";
  
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  //res.end(JSON.stringify("registration complete"));
  res.redirect('/login.htm');
}