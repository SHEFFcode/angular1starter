myApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService, weatherService){
    $scope.weatherResult = weatherService.getWeather();
    $scope.convertToFarenheit = function(degK){
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    }
}]);