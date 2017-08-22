var http = require("http");
var dt = require("./Date_Module");
var fs = require("fs");
var url = require("url");

function server_INIT(request, response) 
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write("Hello, Elliott\n")
	response.write("The time is currently: " + dt.myDateTime() + '\n');
	response.write("Now the time is: " + dt.myOtherDateTime() + '\n');
	response.write(request.url);
	response.end();
}

function server2_INIT(request, response)
{
	fs.readFile('./Demo_Page.html', function(err, data) 
	{
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		
		var q = url.parse(request.url, true);
		var user_ID = q.query.user_ID;
		var user_password = q.query.user_password;
		var validated;
		response.write("User ID: " + user_ID + '\n');
		response.write("Password: " + user_password + '\n');
		if(user_ID && user_password)
		{
			validated = validate_user(user_ID, user_password);
			if(validated == true)
			{
				response.statusCode = 200;
				response.end("Welcome, Elliott");
			}
			else
			{
				response.statusCode = 404;
				response.end("Invalid User ID or Password");
			}
		}

		response.end();
	});
}

function validate_user(ID, password)
{
	if(ID == "Elliott" && password == "rocks")
		{
			return true;
		}
		else
		{
			return false;
		}
}

http.createServer(server2_INIT).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
