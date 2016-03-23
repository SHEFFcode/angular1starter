var express = require('express');
var router = express.Router();
var Runner = require('../models/runner.js');
var Run = require('../models/run.js');


//Get all Runners
router.get('/', function(req, res) {
	Runner.getRunners(function(err, runners) {
		if (err) {
			res.send(err);
		} else {
			res.json(runners);
		}
	});
});

//Get one runner by id
router.get('/:id', function(req, res) {
	Runner.getRunnerById(req.params.id, function(err, runner) {
		if (err) {
			res.send(err);
		} else {
			res.json(runner);
		}
	});
});

//Add Runner
router.post('/', function(req, res) {
	var runner = req.body;
	Runner.addRunner(runner, function(err, runner) {
		if (err) {
			res.send(err);
		} else {
			res.json(runner);
		}
	});
});

//Update Runner
router.put('/:id', function(req, res) {
	var id = req.params.id;
	var runner = req.body;
	Runner.updateRunner(id, runner, {}, function(err, runner) {
		if (err) {
			res.send(err);
		} else {
			res.json(runner);
		}
	});
});

//Delete Runner
router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Runner.removeRunner(id, function(err, runner) {
		if (err) {
			res.send(err);
		} else {
			res.json(runner);
		}
	});
});

module.exports = router;