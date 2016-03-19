var myApp = angular.module('myApp', ['ngRoute', 'uiGmapgoogle-maps']);

//configure the router
myApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'DashboardController',
		templateUrl: 'views/dashboard.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});