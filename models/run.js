var mongoose = require('mongoose');

//Run Schema
var runSchema = mongoose.Schema({
	runner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Runner'
	},
	length: {
		type: String,
		required: true
	},
	startTime: {
		type: String
	},
	runRoute: {
		type: Array
	},
	status: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Run = module.exports = mongoose.model('Run', runSchema);

//Get Runs
module.exports.getRuns = function(callback, limit) {
	Run.find(callback).limit(limit).populate('runner').sort([['createdAt', 'descending']]);
};

//Get RunById
module.exports.getRunById = function(id, callback) {
	Run.findById(id, callback).populate('runner');
};

//Add Run
module.exports.addRun = function(run, callback) {
	var add = {
		runner: run.runner_id,
		length: run.length,
		startTime: run.startTime,
		runRoute: run.runRoute,
		status: run.status,
		createdAt: run.createdAt
	}
	Run.create(add, callback);
};

//Update Run
module.exports.updateRun = function(id, run, options, callback) {
	var query = {_id: id};
	var update = {
		length: run.length,
		startTime: run.startTime,
		runRoute: run.runRoute,
		status: run.status,
		createdAt: run.createdAt
	}
	Run.findOneAndUpdate(query, update, options, callback);
};

//Delete Run
module.exports.removeRun = function(id, callback) {
	var query = {_id: id};
	Run.remove(query, callback);
};

//Get Runner Run
module.exports.getRunnerRuns = function(runner_id, callback, limit) {
	var query = {runner: runner_id};
	Run.find(query, callback).limit(limit).populate('runner').sort([['createdAt', 'ascending']]);
}