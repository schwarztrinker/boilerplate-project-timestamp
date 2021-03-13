// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// your first API endpoint... 
app.get("/api/timestamp/:date", function(req, res) {
  let date_string = req.params.date
  console.log("Request", date_string)


  let date;
  let unix;
  let gmt;
  // Different Parse Algos
  //CHECK UNIX 
  if (/^[0-9]*$/.test(date_string)) {
    unix = Number(date_string)
    gmt = new Date(Number(date_string)).toUTCString()
  }
  // CHECK DATE STRING
  else if (Date.parse(date_string)) {
    date = new Date(date_string)
    unix = date.getTime()
    gmt = date.toGMTString();
  }
  // ELSE OTHER
  else {
    res.json({ error: "Invalid Date" });
  }

  let output = {unix:unix,utc:gmt}
  res.json(output);
});

// Hande timestamp Request if Date is empty
app.get("/api/timestamp/", function(req, res) {
  let date = new Date(Date.now())
  let unix = date.getTime()
  let gmt = date.toGMTString();
  let output = { unix: unix, utc: gmt }
  res.json(output);
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
