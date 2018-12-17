const express = require('express');
const app = express();
const path = require('path');
var request = require('request-promise');
var qs = require('qs');
var parseString = require('xml2js').parseString;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});



