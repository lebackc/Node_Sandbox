var http = require("http");
var url = require("url");
var fs = require("fs");

function login_server(request, response) {
	q = url.parse(request.url, true);
	
	if(q.query.user_ID || q.query.user_password) {
		var user_ID = q.query.user_ID;
		var user_password = q.query.user_password;
		if(user_ID == "Elliott" && user_password == "rocks"){
			response.writeHead(200, {'Content-Type':'text/html'});
			response.write("Welcome back, Elliott");
			response.end();
		}
		else{
			response.writeHead(404);
			response.write("Invalid User ID or Password");
			response.end();
		}
	}
	else {
		fs.readFile('./demo_page.html', function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Error Loading Page");
				response.end();
			}
			else{
				response.writeHead(200, {'Content-Type':'text/html'});
				response.write(data);
				response.end();
			
			}
		});	
	}

}

http.createServer(login_server).listen(8081);
console.log("Server running at http://127.0.0.1:8081/");


