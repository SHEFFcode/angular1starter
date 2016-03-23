var myApp = angular.module('myApp');

myApp.controller('RunsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
	console.log('Runners controller initialized');

	//get invoices
	$scope.getInvoices = function() {
		$http.get('/api/runs').success(function(response) {
			$scope.runs = response;
		});
	}

	//get invoice details
	$scope.getRun = function() {
		var id = $routeParams.id;
		$http.get('/api/runs/' + id).success(function(response) {
			$scope.run = response;

		//Fill Select
		$scope.run.runner_id = response.runner._id;
		$scope.run.status = response.runner.status;
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
