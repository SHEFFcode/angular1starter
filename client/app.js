var myApp = angular.module('myApp', ['ngRoute', 'uiGmapgoogle-maps']);

//configure the router
myApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'DashboardController',
		templateUrl: 'views/dashboard.html'
	})
	$routeProvider.when('/signup', {
		controller: 'RunnersController',
		templateUrl: 'views/add_runner.html'
	})
	$routeProvider.when('/runners', {
		controller: 'RunnersController',
		templateUrl: 'views/runners.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});