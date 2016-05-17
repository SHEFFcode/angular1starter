//configure the router
myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'ControllerOne',
    templateUrl: 'views/home.html'
  })
  $routeProvider.when('/route', {
    controller: 'ControllerTwo',
    templateUrl: 'views/goodbye.html'
  })
    .otherwise({
      redirectTo: '/'
    });
});