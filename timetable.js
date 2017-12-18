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

module.exports.timetable=function(req,res){
	var d=new Date();
	var n = d.getDay();
	var t=d.getHours();
	var json;
	if (n==0 || n==6){
		n=1;
		t=8;
		var sql="select class, teacher from timetable where day="+n+" and time=(select min(time) from timetable where time>='0"+t+":00:00');";
		connection.query(sql, function (err, result) {
		if (err) throw err;
		var string= JSON.stringify(result);
		json= JSON.parse(string);
		console.log (json[0]);
		while (json[0]=="undefined"){
			t=t+1;
			if (t<10){
			connection.query(sql, function (err, result) {
			if (err) throw err;
			var string= JSON.stringify(result);
			json= JSON.parse(string);
		});
		}
		else{
			connection.query("select class, teacher from timetable where day="+n+" and time=(select min(time) from timetable where time>='"+t+":00:00');", function (err, result) {
			if (err) throw err;
			var string= JSON.stringify(result);
			json= JSON.parse(string);
		});
		}
		}
		})
 
	}
	else{
		if (d.getHours()>=17){
			n=n+1;
			if (n>=6)
				n=1;
			t=8;
			connection.query("select class, teacher from timetable where day=" +n+" and time=(select min(time) from timetable where time>='0"+t+":00:00');", function (err, result) {
				
				if (err) throw err;
				var string= JSON.stringify(result);
				json= JSON.parse(string);
				console.log (json[0]);
				while (json[0]=="undefined"){
					t=t+1;
					if (t<10){
						connection.query("select class, teacher from timetable where day="+n+" and time=(select min(time) from timetable where time>='0"+t+":00:00');", function (err, result) {
						if (err) throw err;
						var string= JSON.stringify(result);
						json= JSON.parse(string);
						});
					}
					else{
						connection.query("select class, teacher from timetable where day="+n+" and time=(select min(time) from timetable where time>='"+t+":00:00');", function (err, result) {
						if (err) throw err;
						var string= JSON.stringify(result);
						json= JSON.parse(string);
						});
					}
				
				}
			})
		}
		else{
			var sql= "select class, teacher from timetable where day=" +n+" and time=(select min(time) from timetable where time>'0"+t+":00:00');";
			connection.query(sql, function (err, result) {
				if (err) throw err;
				var string= JSON.stringify(result);
				json= JSON.parse(string);
				while (json[0]=="undefined"){
					t=t+1;
					if (t>=17){
						n=n+1;
						if (n>=6)
							n=1;
					t=8;
					}
				if (t<10){
					connection.query("select class, teacher from timetable where day="+n+" and time=(select min(time) from timetable where time>='0"+t+":00:00');", function (err, result) {
					if (err) throw err;
					var string= JSON.stringify(result);
					json= JSON.parse(string);
					});
				}
				else{
					connection.query("select class, teacher from timetable where day="+n+" and time=(select min(time) from timetable where time>='"+t+":00:00');", function (err, result) {
					if (err) throw err;
					var string= JSON.stringify(result);
					json= JSON.parse(string);
					});
				}
				}
			});
		}
  
	}
	res.end(json);
}	