const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/my_db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(upload.array());

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

router.get('/person', function(req, res){
   res.render('person');
});

router.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
   console.log("hi")
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided wrong info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

router.get('/person/find', function(request, response){
   let search_param = request.body;
   if(search_param.name != ""){
      Person.find(function(err, result){
         if(err){
            response.render(err);
         }
         else{
            console.log(result);
            response.render('search_result', result[5]);
         }     
      });
   }
   else{
      response.render('find_person');
   }

});


module.exports = router;
