var myApp = angular.module('myApp');

myApp.controller('DashboardController', ['$scope', '$http', '$location', '$routeParams', 'NgMap', 'uiGmapGoogleMapApi', 'Facebook',  function($scope, $http, $location, $routeParams, NgMap, uiGmapGoogleMapApi, Facebook) {
	
	
	NgMap.getMap().then(function(map) {
		console.log(map.getCenter());
		console.log('markers', map.markers);
		console.log('shapes', map.shapes);
		$scope.map = map;
		console.log('this happens');
	});


		$scope.$watch('map', function(newValue, oldValue){
			console.log($scope.map);
		});

		$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjYwP0Fs_DJqPA92Op0dHHgbMXhyXdn4A";

		var ABSOLUTE_URI = "https://runandbrunch.herokuapp.com/";
		var FB_ID = "1062941333748037";

		$scope.IntentLogin = function openFBLoginDialogManually(){
  		// Open your auth window containing FB auth page 
  		// with forward URL to your Opened Window handler page (below)

  		var redirect_uri = "&redirect_uri=" + ABSOLUTE_URI + "fbjscomplete";
  		var scope = "&scope=public_profile,email,user_friends";
  		var url = "https://www.facebook.com/dialog/oauth?client_id=" + FB_ID + redirect_uri + scope;

  		// notice the lack of other param in window.open
  		// for some reason the opener is set to null
  		// and the opened window can NOT reference it
  		// if params are passed. #Chrome iOS Bug
  		window.open(url);

  	}

	// $scope.IntentLogin = function() {
 //      // From now on you can use the Facebook service just as Facebook api says
 //      Facebook.login(function(response) {
 //        // Do something with response.
 //      });
 //    };

 $scope.getLoginStatus = function() {
 	Facebook.getLoginStatus(function(response) {
 		if(response.status === 'connected') {
 			$scope.loggedIn = true;
 		} else {
 			$scope.loggedIn = false;
 		}
 	});
 };

 $scope.me = function() {
 	Facebook.api('/me', function(response) {
 		$scope.user = response;
 		console.log(response);
 	});
 };


	//API call for yelp
	$scope.getYelps = function() {

		//make a request to the backend.
		$http.get('/json').success(function(response) {
			console.log(response);

			//set up the scope window
			$scope.items = response.businesses;
			$scope.windowOptions = {
				visible: false
			};

			//marker window opens / closes on click
			$scope.onClick = function() {
				$scope.windowOptions.visible = !$scope.windowOptions.visible;
			};

			$scope.closeClick = function() {
				$scope.windowOptions.visible = false;
			};

			//set up variables for the views
			$scope.title = response.businesses[0].name;
			$scope.phone= response.businesses[0].display_phone;
			$scope.image= response.businesses[0].image_url;
			$scope.rating = response.businesses[0].rating_img_url;
			$scope.url = response.businesses[0].url;
			$scope.street = response.businesses[0].location.address[0];
			$scope.zip = response.businesses[0].location.postal_code;
		});
	}

	//set map center coordaintes.
	$scope.map = { center: { latitude: 37.76, longitude: -122.44 }, zoom: 12 };

	//set up an empty lines array
	$scope.polylines = [];

	//The pay line of the run.
	uiGmapGoogleMapApi.then(function(){
		$scope.polylines = [
		{
			id: 1,
			path: [
			{
				latitude: 37.7608638,
				longitude: -122.4660961
			},
			{
				latitude: 37.7621336,
				longitude: -122.4661788
			},
			{
				latitude: 37.762316,
				longitude: -122.462972
			},
			{
				latitude: 37.765122,
				longitude: -122.4631679
			},
			{
				latitude: 37.7652594,
				longitude: -122.4599554
			},
			{
				latitude: 37.7661587,
				longitude: -122.4598928
			},
			{
				latitude: 37.769055,
				longitude: -122.4547682
			},
			{
				latitude: 37.7690402,
				longitude: -122.4547294
			},
			{
				latitude: 37.7696845,
				longitude: -122.4539492
			},
			{
				latitude: 37.770067,
				longitude: -122.4540343
			},
			{
				latitude: 37.7743488,
				longitude: -122.4203938
			},
			{
				latitude: 37.7888201,
				longitude: -122.4019967
			},
			{
				latitude: 37.790976,
				longitude: -122.4024281
			},
			{
				latitude: 37.7910773,
				longitude: -122.4016291
			}
			],
			stroke: {
				color: '#6060FB',
				weight: 3
			},
			editable: true,
			draggable: true,
			geodesic: true,
			visible: true,
			icons: [{
				icon: {
					path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
				},
				offset: '25px',
				repeat: '50px'
			}]
		}
		];
	});

	//get invoice details
	$scope.getRun = function() {
		var id = $routeParams.id;
		console.log($routeParams.id);
		$http.get('/api/runs/' + id).success(function(response) {
			$scope.run = response;

		//Fill Select
		$scope.run.runner_id = response.runner._id;
	});
	}

	//Put a marker of the closest restaurant
	$scope.marker = {
		id: 0,
		coords: {
			latitude:  37.7910773,
			longitude: -122.4016291
		},
		options: { draggable: true, label: 'b' },
		events: {
			dragend: function (marker, eventName, args) {
				$log.log('marker dragend');
				var lat = marker.getPosition().lat();
				var lon = marker.getPosition().lng();
				$log.log(lat);
				$log.log(lon);

				$scope.marker.options = {
					draggable: true,
					labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
					labelAnchor: "100 0",
					labelClass: "marker-labels"
				};
			}
		}
	};

}]);
