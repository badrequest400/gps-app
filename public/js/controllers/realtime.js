angular.module('GpsKovetoApp')

.controller('RealTimeController', ['$scope', '$http', 'geocode', 'map', function($scope, $http, geocode, map) {

	$scope.map_init = map.map_init($scope);

	$scope.trackerSelected = false;

	$scope.reports = [{
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
	}];
	$scope.currentReport = {};
	$scope.currentReport.address = '';

	// recursive refresh of latest position report once tracker is selected
	if($scope.trackerSelected == true) {
		$scope.getLatest();
	};

	$scope.getLatest = function(id) {
		$http.get('/latest')
		.success(function(data) {
			setTimeout($scope.getLatest,15000);
		}).error(function(data) {
			console.log('Something went wrong');
		});
	};

	$scope.drawMarkers = function(id) {

		$scope.reports.forEach(function(report) {
			if(report.GID == id) {
				$scope.trackerSelected = true;
				var pos = new google.maps.LatLng(report.lat, report.lng);

				var marker = new google.maps.Marker({
					position: pos,
					map: $scope.map,
					title: 'POS 1'
				});

				$scope.currentReport = report;

				//async call to google geocoding for address lookup --> service:geocode
				geocode.reverse_geocode(report.lat, report.lng, function(address) {
					$scope.currentReport.address = address;
					$scope.$apply();
				});
			};
		});
	};

}])

.controller('DropDownController', ['$scope', function($scope) {

	$scope.items = [];
	$scope.reports.forEach(function(report) {
		$scope.items.push(report.GID);
	});

	$scope.status = {
		isopen: false
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
}]);
