const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const FB = require('facebook-node');

mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/my_db");

var personSchema = mongoose.Schema({
	name: String,
	age: Number,
	nationality: String
});

var userSchema = mongoose.Schema({
	name: String,
	password: String,
	age: Number
});

var bookingSchema = mongoose.Schema({
	userID: Number,
	serviceID: Number,
	timeStamp: Date,
	timeStart: Date,
	timeEnd: Date
});

var serviceSchema = mongoose.Schema({
	serviceDescription: String,
	serviceRate: Number
});

var Person = mongoose.model("Person", personSchema);
var User = mongoose.model("User", userSchema);
var Booking = mongoose.model("Booking", bookingSchema);
var Service = mongoose.model("Service", serviceSchema);

router.use(bodyParser.urlencoded({extended:true}));
router.use(upload.array());

router.get("/", function(request, response){
	response.render("home");
});

router.get("/contact", function(request, response){
	response.render("contact");
});

router.get("/about", function(request, response){
	response.render("about");
});

router.get("/services", function(request, response){
	response.render("services");
});

router.get("/people", function(request, response){
	let search_param = request.query;
	Person.find(function(err, result){
		people = {start: 0, users: []};
		if(search_param.start) { people.start = Number(search_param.start);}		
		for(let count = people.start, i = 0; i < 5; i++, count++){
			if(count == result.length) {break;}
			people.users.push(result[count]);
		}
		response.render("people", people);
	});
});

router.get("/person/find", function(request, response){
	let search_param = request.query;
	Person.findOne({_id:search_param.id}, function(err, result){
		response.render("search_result", result)
	});
});

router.get("/id", function(request, response){
	let search_param = request.query;
	let start = parseInt(search_param.start) || 0;
	let limit = 5;
	let model_count;
	Person.count({}, function(err, count){
			model_count = count;
	});

	Person.find(function(err, result){
		let next = -1;
		if (start + limit < model_count) {
			next = start + limit;
		}

		people = {paging: {next: next, prev: start - limit}, users: result};
		console.log(model_count, start, next);

		response.render("find_id", people);
	}).limit(5).skip(start);
});


router.get("/find_id/:id", function(request, response){
	let search_param = request.params;
	Person.findOne({_id:search_param.id}, function(err, result){
		response.render("search_result", result);
	});
});

router.get("/calendar", function(request, response){
	let request_query = request.query;
	let timeStamp = request_query.month_start || new Date().getTime().toString();

	let curr_date = new Date(timeStamp);
	response.render("monthly_calendar", {month_start_ts: timeStamp});


});

router.get("/weekly_calendar", function(request, response){
	let request_query = request.query;
	let timeStamp = request_query.week_start || new Date().getTime().toString();

	let curr_date = new Date(timeStamp);
	response.render("weekly_calendar", {week_start_ts: timeStamp});
});

router.get("/new_booking", function(request, response){
	response.render("new_booking");
});

router.post('/new_booking', function(request, response){
	let bookingInfo = request.body; 
	let bookingDate = request.query;
	console.log(bookingDate.date);
	
	if(!bookingInfo.serviceID || !bookingInfo.timeStart || !bookingInfo.timeEnd) {
		response.render('show_message', {
			message: "Sorry, you provided the wrong info", type: "error"
		});
	}
	else {
		let newBooking = new Booking({
			//userID: ,
			serviceID: bookingInfo.serviceID,
			timeStamp: bookingDate.date,
			timeStart: bookingInfo.timeStart,
			timeEnd: bookingInfo.timeEnd
		})
		
		newBooking.save(function(err, booking){
			if(err)
				response.render('show_message', {message: "Database error", type: "error"});
			else
				response.render('show_message', {
					message: "New Booking added", type: "success", booking: bookingInfo});
		});
	}
});

router.get("/new_user", function(request, response){
	response.render('new_user');
});

router.post('/new_user', function(request, response){
	let userInfo = request.body; 
	if(!userInfo.last_name || !userInfo.first_name || !userInfo.password || !userInfo.age) {
		response.render('show_message', {
			message: "Sorry, you provided the wrong info", type: "error"
		});
	}
	else {
		var newUser = new User({
			name: userInfo.last_name + ", " + userInfo.first_name,
			password: userInfo.password,
			age: userInfo.age
		});
		console.log(newUser.name + newUser.age);

		newUser.save(function(err, user){
			if(err)
				response.render('show_message', {message: "Database error", type: "error"});
			else
				response.render('new_booking', newUser);
		});
	}
});

router.get("/sign_in", function(request, response){
	response.render("sign_in");
});

router.post("/sign_in", function(request, response){
	let user_cred = request.body;
	
	console.log(myStorage.getItem("booking_date"));
	if(!user_cred.last_name || !user_cred.first_name || !user_cred.password) {
		response.end("Sorry, you provided the wrong info");
	}
	else {
		let user_name = user_cred.last_name + ', ' + user_cred.first_name
		User.find({name: user_name, password: user_cred.password}, function(err, result) {
			if (err) {
				response.end("Incorrect user name or password...");
			}
			else if(result.length != 0){
				console.log(result[0]);
				response.render("new_booking", {user: result[0]});
			}
			else {
				response.end("Incorrect user name or password...");
			}

		});
	}
});

router.get("/jquery_demo", function(request, response){
	response.render("jquery_demo");
})

router.get("/FB_demo", function(request, response){
	response.render("FB_demo");
})

module.exports = router;