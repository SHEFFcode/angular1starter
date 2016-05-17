myApp.factory('requestService', function($resource){
  var data = $resource('', {}, {
    update: {
      method: 'GET'
    }
  });
  return data;
});