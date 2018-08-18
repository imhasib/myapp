var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
// app.use(express.static("scripts"));
//Store all JS and CSS in Scripts folder.

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});