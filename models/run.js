var mongoose = require('mongoose');

//Run Schema
var runSchema = mongoose.Schema({
	runner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Runner'
	},
	name: {
		type: String,
		required: true
	},
	hood: {
		type: String,
		required: true
	},
	start: {
		type: String,
		required: true
	},
	end: {
		type: String,
		required: true
	},
	distance: {
		type: String
	},
	brunches: {
		type: String
	},
	date: {
		type: String
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
		name: run.name,
		hood: run.hood,
		start: run.start,
		end: run.end,
		distance: run.distance,
		brunches: run.brunches,
		date: run.date
	}
	Run.create(add, callback);
};

//Update Run
module.exports.updateRun = function(id, run, options, callback) {
	var query = {_id: id};
	var update = {
		runner: run.runner_id,
		name: run.name,
		hood: run.hood,
		start: run.start,
		end: run.end,
		distance: run.distance,
		brunches: run.brunches,
		date: run.date
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