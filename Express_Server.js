const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
const sample_router = require('./Sample_Router.js');
const mongo_router = require('./mongo_router.js');
const home_router = require('./home_router.js');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const mongoose = require('mongoose');

app.set('view engine', 'pug');
app.set('views','./sample_views');

app.use('/router', sample_router);
app.use('/mongo_router', mongo_router);
app.use('/home_router', home_router);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

app.post('/home', function(request, response){
	console.log(request.body);
	response.send("received your request!<br />" + "you typed: " + request.body.sample_input);
});

app.get('/', function(request, response){
	console.log("Got a request at: " + __dirname);
	response.send("This message was displayed using send()");
});

app.get('/home', function(request, response){
	let data = {
		title: 'My First View',
		name:'my title',
		url: '/myurl',
		text: 'this is some text'
	};
	response.render('first_view', data); 
});


app.get('*', function(request, response){
	response.send("Sorry, that was an invalid URL");
});

var server = app.listen(8081, function(){
	let host = server.address().address
	let port = server.address().port

	console.log("Server running at http://%s:%s", host, port);
});