var myApp = angular.module('myApp');

myApp.controller('RunnersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
	console.log('runners controller initialized');

	//get customers
	$scope.getRunners = function() {
		$http.get('/api/runners').success(function(response) {
			$scope.runners = response;
		});
	}

	//get customer details
	$scope.getRunner = function() {
		var id = $routeParams.id;
		$http.get('/api/runners/' + id).success(function(response) {
			$scope.runner = response;
		});
	}

	//get customers
	$scope.getRunnerRuns = function() {
		var id = $routeParams.id;
		$http.get('/api/runs/runner/' + id).success(function(response) {
			$scope.runner_invoices = response;
		});
	}

	//add Customer
	$scope.addRunner = function() {
		$http.post('/api/runners/', $scope.runner).success(function(response) {
			window.location.href = '#/runners';
		});
	}

	//update Customer
	$scope.updateRunner = function() {
		$http.put('/api/runners/' + $scope.runner._id, $scope.runner).success(function(response) {
			window.location.href = '#/runners';
		});
	}

	$scope.deleteRunner = function(id) {
		$http.delete('/api/runners/' + id).success(function(response) {
			window.location.href = '#/runners';
		});
	}
}]);