angular.module('GpsKovetoApp')

.controller('HistoryController', ['$scope', '$http', '$timeout', 'map',
  function($scope, $http, $timeout, map) {

	$scope.map_init = map.map_init($scope);

	$scope.fromDate = new Date();
	$scope.toDate = new Date();
	$scope.fromOpened = false;
	$scope.toOpened = false;

	$scope.reports;

	var playbackPos = 0
	$scope.marker = new google.maps.Marker();
	var playing = false;

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

			$scope.reports = data;

		}).error(function(data, status) {
			console.log(status);
			console.log(data);
		});
	};

	$scope.startStopPlayback = function($event) {
		if(!playing) {
			playing = true;
			$event.target.innerHTML = "Stop Playback";
			playback();
		}else{
			playing = false;
			$event.target.innerHTML = "Start Playback";
		};
	};

	//Recursive playback function
	playback = function($event) {

		if(!playing) {
			return;
		};

		//base case --> stop if ran out of records
		if(playbackPos == $scope.reports.length - 1) {
			return;
		};

		var pos = new google.maps.LatLng($scope.reports[playbackPos].lat, $scope.reports[playbackPos].lng);
		$scope.marker.setMap($scope.map);
		$scope.marker.setPosition(pos);
		playbackPos++;

		$timeout(function(){
			playback();
		},1000);
	};

}]);
