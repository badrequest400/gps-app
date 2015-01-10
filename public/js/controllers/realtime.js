angular.module('GpsKovetoApp')

.controller('RealTimeController', ['$scope', function($scope) {

	$scope.init = map_init($scope);

	var report = {
		"_id" : "54346df8efd498c92cab01be",
		"mystery" : 6100,
		"analogue" : "f9",
		"output" : "00000",
		"input" : "00010",
		"date" : 71014,
		"orientation" : 129.7,
		"speed" : 0,
		"lon" : 0.9164,
		"lat" : 5134.6871,
		"time" : 224925,
		"GID" : 1234,
		"__v" : 0
	};

}]);
