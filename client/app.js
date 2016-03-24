var myApp = angular.module('myApp', ['ngRoute', 'uiGmapgoogle-maps', 'directive.g+signin', 'facebook']);

//configure the router
myApp.config(function($routeProvider, FacebookProvider) {
	$routeProvider.when('/', {
		controller: 'DashboardController',
		templateUrl: 'views/login.html'
	})
	$routeProvider.when('/dashboard', {
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
	})
	FacebookProvider.init('1062941333748037');
});