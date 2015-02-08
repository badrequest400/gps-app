angular.module('GpsKovetoApp')

.controller('RealTimeController', ['$scope', '$http', '$timeout', 'geocode', 'map', function($scope, $http, $timeout, geocode, map) {

	$scope.map_init = map.map_init($scope);

	$scope.trackerSelected = false;
	$scope.marker = new google.maps.Marker();

	$scope.report = {
		"_id" : "54346df8efd498c92cab01be",
		"mystery" : 6100,
		"analogue" : "f9",
		"output" : "00000",
		"input" : "00010",
		"date" : 71014,
		"orientation" : 129.7,
		"speed" : 0,
		"lat" : 47.491364,
		"lng" : 19.055845,
		"time" : 224925,
		"GID" : 1234,
		"__v" : 0
	};

	//RECURSION --> position update

	$scope.getLatest = function(id) {
		$http.get('/latest')
		.success(function(data) {
			$scope.report.lat += 0.001;
			$scope.report.lng += 0.001;
			$scope.drawMarkers(1234);

		}).error(function(data) {
			console.log('Something went wrong');
		});
	};

	$scope.drawMarkers = function(id) {

		var pos = new google.maps.LatLng($scope.report.lat, $scope.report.lng);

		$scope.marker.setMap($scope.map);
		$scope.marker.setPosition(pos);
		$scope.marker.setTitle('POS 1');

		$timeout(function(){
			$scope.getLatest(id);
		},1000);

		////async call to google geocoding for address lookup --> service:geocode
		// geocode.reverse_geocode($scope.report.lat, $scope.report.lng, function(address) {
		// 	$scope.report.address = address;
		// 	$scope.$apply();
		// });


	};

}])

.controller('DropDownController', ['$scope', function($scope) {

	$scope.items = [];

	$scope.items.push($scope.report.GID);


	$scope.status = {
		isopen: false
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
}]);
