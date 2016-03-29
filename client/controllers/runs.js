var myApp = angular.module('myApp');

myApp.controller('RunsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
	console.log('Runs controller initialized');

	//get invoices
	$scope.getRuns = function() {
		$http.get('/api/runs').success(function(response) {
			$scope.runs = response;
		});
	}

	$scope.getBrunch = function(location) {
		$http.get('/json/:' + location).success(function(response) {
			$scope.run.brunch = [];
			for (i=0; i<response.businesses.length; i++) {
				$scope.run.brunch.push(response.businesses[i].name);	
			}
			console.log($scope.run.brunch);
					
		});
	}

	//get invoice details
	$scope.getRun = function() {
		var id = $routeParams.id;
		$http.get('/api/runs/' + id).success(function(response) {
			$scope.run = response;

		//Fill Select
		$scope.run.runner_id = response.runner._id;
	});
	}

		//get customers
		$scope.getRunners = function() {
			$http.get('/api/runners').success(function(response) {
				$scope.runners = response;
			});
		}

		//add Invoice
		$scope.addRun = function() {
			$http.post('/api/runs/', $scope.run).success(function(response) {
				window.location.href = '#/runs';
			});
		}
			//update Invoice
			$scope.updateRun = function() {
				$http.put('/api/runs/' + $scope.run._id, $scope.run).success(function(response) {
					window.location.href = '#/runs';
				});
			}
			$scope.deleteRun = function(id) {
				$http.delete('/api/runs/' + id).success(function(response) {
					window.location.href = '#/runs';
				});
			}
		}]);
