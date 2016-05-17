var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var env         = require('dotenv').config();


//specify a static directory for express to use
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

app.listen(PORT);
console.log('Server started on port ....' + PORT);