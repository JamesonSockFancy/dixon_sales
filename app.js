const http = require('http');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
      res.render("home");
    });


// const port=process.env.PORT || 3000
// const server = http.createServer((req, res) => {

//     res.statusCode = 200;

//     res.setHeader('Content-Type', 'text/html');

//     res.end('<h1>Hello World</h1>');

// });

// server.listen(port,() => {

//     console.log(`Server running at port `+port);

// });