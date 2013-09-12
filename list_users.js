var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("error event - " + client.host + ":" + client.port + " - " + err);
});

// hallo

var express = require('express');

// this is express 3 code
// var app = express();   

// this is express 2.5 code
var app=express.createServer();
app.use(express.static(__dirname + '/public'));


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();

});


app.get('/list.json', function(req, res){
  client.keys("user:*", function (err, replies) {
      if (err) {  return console.error("error response - " + err); }

      console.log(replies.length + " replies:");
      var users = [];
      replies.forEach(function (reply, i) {
          users.push(reply.split(':')[1])
          console.log("    " + i + ": " + reply);
      });
      res.send(JSON.stringify(users));
  });
});

var port = 8080;

app.listen(port);
console.log('Listening on port ' + port);

// client.quit(function (err, res) {
//     console.log("Exiting from quit command.");
// });
