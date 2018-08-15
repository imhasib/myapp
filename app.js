var express = require('express');
var app = express();

app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/scripts'));
//Store all JS and CSS in Scripts folder.

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});