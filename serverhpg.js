
var express  = require("express");
var signup=require('./signup');
var login=require('./login');
var timetable=require('./timetable');

var app = express();

//getting the homepage
app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( "C:/Users/vandi" + "/" + "index.html" );
})

//getting the signup page
app.get('/signup.htm', function (req, res) {
   res.sendFile( "C:/Users/vandi" + "/" + "signup.html" );
   
})

//after submission of the registraton form
app.get('/signup_get',function(req,res){
	signup.signup(req, res);
})


//getting the login page
app.get('/login.htm', function (req, res) {
   res.sendFile( "C:/Users/vandi" + "/" + "login.html" );
   
})

//after submission of the signup page
app.get('/login_get',function(req,res){
	login.login(req, res);
})

//getting the home page
app.get('/home.htm',function(req,res){
	res.sendFile("C:/Users/vandi"+"/"+"home.html");
})

//for generating the timetable
app.get('/tt_get',function(req,res){
	timetable.timetable(req,res);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})













