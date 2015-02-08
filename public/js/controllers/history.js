angular.module('GpsKovetoApp')

.controller('HistoryController', ['$scope', '$http', 'map', function($scope, $http, map) {

	$scope.map_init = map.map_init($scope);

	$scope.fromDate = new Date();
	$scope.toDate = new Date();
	$scope.fromOpened = false;
	$scope.toOpened = false;

	$scope.reports;

	$scope.datePickerOpen = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		if($event.target.id == 'from'){
			$scope.fromOpened = !$scope.fromOpened;
		}else{
			$scope.toOpened = !$scope.toOpened;
		}
	};

	$scope.search = function() {
		var query = {
			start: $scope.fromDate,
			end: $scope.toDate
		};

		$http.post('/timefilter', query)
		.success(function(data, status) {
			console.log(status);
			console.log(data);
			$scope.reports = data;

		}).error(function(data, status) {
			console.log(status);
			console.log(data);
		});
	};

}]);
