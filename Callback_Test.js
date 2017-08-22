var fs = require("fs");

function myCallback(err, data)
{
	if(err)
	{
		console.error(err);
	}
	console.log(data.toString());
}

fs.readFile("./sample.txt", myCallback);

console.log("Program has ended");