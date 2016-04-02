var express = require('express');
var router = express.Router();
var Runner = require('../models/runner.js');
var Run = require('../models/run.js');


//Get all invoices
router.get('/', function(req, res) {
	Run.getRuns(function(err, runs) {
		if (err) {
			res.send(err);
		} else {
			res.json(runs);
		}
	});
});

//Get one invoice by id
router.get('/:id', function(req, res) {
	Run.getRunById(req.params.id, function(err, run) {
		if (err) {
			res.send(err);
		} else {
			res.json(run);
		}
	});
});

//Add invoice
router.post('/', function(req, res) {
	var run = req.body;
	Run.addRun(run, function(err, run) {
		if (err) {
			res.send(err);
		} else {
			res.json(run);
		}
	});
});

//Update invoice
router.put('/:id', function(req, res) {
	var id = req.params.id;
	var run = req.body;
	Run.updateRun(id, run, {}, function(err, run) {
		if (err) {
			res.send(err);
		} else {
			res.json(run);
		}
	});
});

//Delete invoice
router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Run.removeRun(id, function(err, run) {
		if (err) {
			res.send(err);
		} else {
			res.json(run);
		}
	});
});

//Get all invoices for a single customer
router.get('/runner/:runner_id', function(req, res) {
	var runner_id = req.params.runner_id;
	Run.getRunnerRuns(runner_id, function(err, runs){
		if (err) {
			res.send(err);
		} else {
			res.json(runs);
		}
	});
});

module.exports = router;