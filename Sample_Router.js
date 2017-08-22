const express = require('express');
let router = express.Router();

router.use(function(request, response, next){
	console.log("This router request occurred at " + Date.now());

	next();
});

router.get('/:first_name/:last_name', function(request, response){
	let last_name = request.params.last_name;
	let first_name = request.params.first_name;
	response.send("Hey " + first_name + " " + last_name + ", this is your router talking to you!");
});

module.exports = router;