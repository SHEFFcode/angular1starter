var myApp = angular.module('myApp');

myApp.controller('RunnersController', ['$scope', '$http', '$location', '$routeParams', 'weatherService', function($scope, $http, $location, $routeParams, weatherService) {
	console.log('runners controller initialized');

	//get customers
	$scope.getRunners = function() {
		$http.get('/api/runners').success(function(response) {
			$scope.runners = response;
		});
	}

	$scope.getCurrentRunner = function() {
		$http.get('/account').success(function(response) {
			$scope.runner = response.user;
		})
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
		var id = $routeParams.id || '56f314b82f2f0e259ea8d44e';
		$http.get('/api/runs/runner/' + id).success(function(response) {
			$scope.runner_runs = response;
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

	//Weather
    $scope.weatherResult = weatherService.getWeather();
    $scope.convertToFarenheit = function(degK){
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    }
}]);
