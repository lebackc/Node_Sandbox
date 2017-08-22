var events = require("events");

var myEventEmitter = new events.EventEmitter();

function connectionHandler ()
{
	console.log("connection successful");
	myEventEmitter.emit("data_received");
}


myEventEmitter.addListener("connection", function() {
	console.log("Greetings!");
})

myEventEmitter.on("connection", connectionHandler);

myEventEmitter.on("data_received", function(){
	console.log("data received")
	myEventEmitter.emit("end_program");
});

myEventEmitter.once("end_program", function(){
	console.log("ending program in...");
})

var connectionListeners = myEventEmitter.listenerCount("connection", myEventEmitter);
console.log("There are " + connectionListeners + " listeners...");

myEventEmitter.emit("connection");

for(var i = 10; i > 0; i--){
	myEventEmitter.once("end_program", function(){
		console.log(i + "...");
	});
	myEventEmitter.emit("end_program");
}

myEventEmitter.once("end_program", function(){
	console.log("Goodbye!");
})

myEventEmitter.emit("end_program");
