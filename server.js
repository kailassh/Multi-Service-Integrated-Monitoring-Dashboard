var express = require('express');
var mongojs = require('mongojs');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;
var http = require('http');
var db = mongojs('DATABASE_NAME', ['test', 'testevents']);

var app = express();

app.use(express.static(__dirname + "/public"));



url = "API CALL URL";
var request = setInterval(function(){
  http.get(url, function (response) {
    var buffer = "", data;

    response.on("data", function (chunk) {
        buffer += chunk;
    });

    response.on("end", function (err) {
        data = JSON.parse(buffer);
        //console.log(data);
        db.test.find(function(err, docs){
          console.log("Updated Clients data");
          db.test.update(data);

      });

    });
});
}, 60000);
app.get('/clients', function(req, res){
  db.test.find(function(err, docs){
    console.log("Clients");
    res.json(docs);
  });
});
 app.get('/clients/:id', function(req, res){
   var id = req.params.id;
   console.log(id);
   db.test.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
     console.log(doc);
     res.json(doc);
   });
 });

 url2 = "API CALL";
 var request2 = setInterval(function(){
   http.get(url2, function (response) {
     var buffer = "", data;

     response.on("data", function (chunk) {
         buffer += chunk;
     });

     response.on("end", function (err) {
         data = JSON.parse(buffer);
         //console.log(data);
         db.testevents.find(function(err, docs){
           console.log("Updated Events data");
           db.testevents.update(data);
       });
     });
 });
 }, 60000);
 app.get('/events', function(req, res){
   db.testevents.find(function(err, docs){
     console.log("Events");
     res.json(docs);
   });
 });
 app.get('/events/:id', function(req, res){
   var id = req.params.id;
   console.log(id);
   db.testevents.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
     console.log(doc);
     res.json(doc);
   });
 });

//});

app.listen(8000);
console.log("Server running on port 8000");
