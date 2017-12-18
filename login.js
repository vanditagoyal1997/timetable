


var http=require('http');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host     : '127.0.0.1',
    user     : '',
    password : '',
    database    : ''
});

connection.connect(function(err) {
  if (err) throw err;
});
module.exports.login=function(req,res){
   //retrieving data from mysql file
  response = {
      regno:req.query.regno,
      pwd:req.query.pwd
   };
   
   var sql="SELECT password FROM login WHERE registration="+ "'"+ response.regno+"';";
   
   connection.query(sql, function (err, result) {
    if (err) throw err;
	var string= JSON.stringify(result);
	var json= JSON.parse(string);
	if (json[0].password==response.pwd)
		res.redirect ('/home.htm');
		
	if (json[0].password!= response.pwd)
	  //res.send(JSON.stringify("registration number or password is incorrect"));
	  res.redirect ('/index.htm');
  });
  


} 


