var myApp = angular.module('myApp', ['ngRoute', 'uiGmapgoogle-maps', 'facebook']);

//configure the router
myApp.config(function($routeProvider, FacebookProvider) {
	$routeProvider.when('/', {
		controller: 'DashboardController',
		templateUrl: 'views/dashboard.html'
	})
	$routeProvider.when('/dashboard', {
		controller: 'DashboardController',
		templateUrl: 'views/dashboard.html'
	})
	$routeProvider.when('/signup', {
		controller: 'RunnersController',
		templateUrl: 'views/add_runner.html'
	})
	$routeProvider.when('/addrun', {
		controller: 'RunsController',
		templateUrl: 'views/add_run.html'
	})
	$routeProvider.when('/runners', {
		controller: 'RunnersController',
		templateUrl: 'views/runners.html'
	})
	$routeProvider.when('/runs', {
		controller: 'RunsController',
		templateUrl: 'views/runs.html'
	})
	.otherwise({
		redirectTo: '/'
	})
	FacebookProvider.init('1062941333748037');
});