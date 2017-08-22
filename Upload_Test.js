var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

http.createServer(function(request, response){
	if(request.url == '/fileupload'){
		var form = new formidable.IncomingForm();
		form.parse(request, function(err, fields, files){
			var old_path = files.upload_file.path;			
			var new_path = "C:/Users/Elliott/Dropbox/Node Files/" + files.upload_file.name;
			fs.rename(old_path, new_path, function(err){
				if(err){
					throw err;
					response.writeHead(404);
					response.write("Error Accessing Upload File");
					response.end();
				}
				else{
					response.writeHead(200, {'Content-Type': 'text/plain'});
					response.write("'" + files.upload_file.name + "' has been moved to: " + new_path);
					response.end();
				}
			});
		});
	}
	else{
		fs.readFile('./demo_page.html', function(err, data){
			if(err){
				throw err;
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
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
