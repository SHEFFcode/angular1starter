//Services
myApp.service('cityService', function(){
    this.city = "San Francisco, CA";
});

myApp.service('weatherService', ['$resource', function($resource){
    this.getWeather = function(){
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?q=SanFrancisco&cnt=5&appid=01de5aa15510ac9a6198c852e1ffb325", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
        return weatherResult = weatherAPI.get({ q: 'San Francisco', cnt: 5 });
    }
    console.log('weatherResult');
}]);