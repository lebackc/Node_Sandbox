const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const upload = multer();
const prototype_router = require("./prototype_router.js");

app.set("view engine", "pug");
app.set("views", "./prototype_views");

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(upload.array());

app.use("/", prototype_router);

app.get("*", function(request, response){
	response.send("Sorry, that was an invalid URL");
});

let server = app.listen(8081, function(){
	let port = server.address().port;
	let host = server.address().address;

	console.log("Server running on http://%s:%s", host, port);
});