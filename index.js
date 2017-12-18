var express= require ('express');
var app= express();
var signup=require('./signup');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host     : '127.0.0.1',
    user     : 'admin',
    password : 'admin',
    database    : 'vandita'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( "C:/Users/vandi" + "/" + "index.html" );
})
app.get('/signup.htm', function (req, res) {
   res.sendFile( "C:/Users/vandi" + "/" + "index.html" ); 
})

app.post('/process_get',signup.signup(req, res));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})