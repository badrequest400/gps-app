angular.module('GpsKovetoApp')

.controller('MapController', ['$scope', 'map', 'geocode', function($scope, map, geocode) {

	$scope.map_init = map.map_init($scope);

	$scope.locate = {};
	$scope.locate.lat = '';
	$scope.locate.lng = '';
	$scope.locate.address='';

	$scope.plan = {};
	$scope.plan.lat_start = '';
	$scope.plan.lng_start = '';
	$scope.plan.lat_dest = '';
	$scope.plan.lng_dest = '';

	$scope.locate.locate = function() {
		var pos = new google.maps.LatLng($scope.locate.lat, $scope.locate.lng);

		var marker = new google.maps.Marker({
			position: pos,
			map: $scope.map,
			title: 'POS 1'
		});

		//async call to google geocoding for address lookup --> service:geocode
		geocode.reverse_geocode($scope.locate.lat, $scope.locate.lng, function(address) {
			$scope.locate.address = address;
			$scope.$apply();
		});
	};

	$scope.plan.plan = function() {
		var posStart = new google.maps.LatLng($scope.plan.lat_start, $scope.plan.lng_start);
		var posDest = new google.maps.LatLng($scope.plan.lat_dest, $scope.plan.lng_dest);

		geocode.planRoute(posStart, posDest, $scope.map);
	};

}]);
