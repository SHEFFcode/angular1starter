var mongoose = require('mongoose');

//Runner Schema
var runnerSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	photo_url: {
		type: String
	},
	neighborhood: {
		type: String,
	}
});

var Runner = module.exports = mongoose.model('Runner', runnerSchema);

//Get Runners
module.exports.getRunners = function(callback, limit) {
	Runner.find(callback).limit(limit).sort([['first_name', 'ascending']]);
};

//Get RunnerById
module.exports.getRunnerById = function(id, callback) {
	Runner.findById(id, callback);
};

//Add a runner
module.exports.addRunner = function(runner, callback) {
	var add = {
		first_name: runner.first_name,
		last_name: runner.last_name,
		email: runner.email,
		photo_url: runner.photo_url,
		neighborhood: runner.neighborhood
	}
	Runner.create(add, callback);
};

module.exports.addGoogleRunner = function(runner, callback) {
	var add = {
		first_name: runner.name.givenName,
		last_name: runner.name.familyName,
		email: runner.emails.value
	}
	console.log('runner added');
	Runner.create(add, callback);

}

//Update a runner
module.exports.updateRunner = function(id, runner, options, callback) {
	var query = {_id: id};
	var update = {
		first_name: runner.first_name,
		last_name: runner.last_name,
		email: runner.email,
		photo_url: runner.photo_url,
		neighborhood: runner.neighborhood
	}
	Runner.findOneAndUpdate(query, update, options, callback);
};

//Delete runner
module.exports.removeRunner = function(id, callback) {
	var query = {_id: id};
	Runner.remove(query, callback);
};