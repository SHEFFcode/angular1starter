var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var customers =	require('./routes/customers');
var invoices = require('./routes/invoices');
var PORT = process.env.PORT || 7000;
var Yelp = require('yelp');


app.get('/json', function(req, res) {
	(function(i){

    	//Set up yelp connection
    	var yelp = new Yelp({
    		consumer_key: 'jqzRyorgPw4t4nQ3StcSww',
    		consumer_secret: 'FlcrIHmnpG-o8QO9ot8esXECHck',
    		token: 'kO8VNBs0taiSBbwIJCIDTyuvMdciy_Sl',
    		token_secret: 'x85zJHByyXnjGxg1M91wnPEm9MU',
    	});

		// See http://www.yelp.com/developers/documentation/v2/search_api
		yelp.search({ term: 'brunch', ll: '37.77493, -122.419415', limit: 5, sort: 1 })
		.then(function (data) {
			res.send(data);
		})
		.catch(function (err) {
			console.error(err);
		});

	})();

});

//Mongoose Connection
mongoose.connect('mongodb://sheff:123@ds019058.mlab.com:19058/invoice');
var db = mongoose.conneciton;

//specify a static directory for express to use
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Hello world');
});

app.listen(PORT);
console.log('Server started on port ....' + PORT);