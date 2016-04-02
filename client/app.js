var myApp = angular.module('myApp', ['ngRoute', 'ngMap', 'ngResource', 'uiGmapgoogle-maps', 'facebook', 'angular-weather', 'LocalForageModule']);

//configure the router
myApp.config(function($routeProvider, FacebookProvider) {
	$routeProvider.when('/', {
		controller: 'DashboardController',
		templateUrl: 'views/login.html'
	})
	$routeProvider.when('/dashboard', {
		controller: 'RunnersController',
		templateUrl: 'views/newdashboard.html'
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
	$routeProvider.when('/runs/:id', {
		controller: 'RunnersController',
		templateUrl: 'views/my_runs.html'
	})
	$routeProvider.when('/runs/details/:id', {
		controller: 'DashboardController',
		templateUrl: 'views/dashboard.html'
	})
	.otherwise({
		redirectTo: '/'
	})
	FacebookProvider.init('1062941333748037');
});