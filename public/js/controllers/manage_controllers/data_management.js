angular.module('GpsKovetoApp')

// ADMIN ROLE ONLY !!!!!!!!

.controller('DataManagementController', ['$scope', '$http', function($scope, $http) {

    $scope.fromDate = new Date();
	$scope.toDate = new Date();
	$scope.fromOpened = false;
	$scope.toOpened = false;
    $scope.trackers = [{name:'All'}];

    $scope.selected_tracker = 'Tracker';

    $http.get('/trackers/trackers')
    .success(function(data, status) {
        data.forEach(function(tracker) {
            $scope.trackers.push(tracker);
        });
    }).error(function(data, status) {
        console.log(status);
        console.log(data);
    });

	$scope.datePickerOpen = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		if($event.target.id == 'from'){
			$scope.fromOpened = !$scope.fromOpened;
		}else{
			$scope.toOpened = !$scope.toOpened;
		}
	};

    $scope.deleteHistory = function() {  // DELETES ALL GPS HSITORY ADMIN ONLY !!!!!!!!
        if($scope.selected_tracker == 'Tracker') {
            alert('A tracker needs to be chosen');
            return;
        };

        var query = {
            start: $scope.fromDate,
            end: $scope.toDate
        };
        var url;
        if($scope.selected_tracker == 'All') {
            url = '/delete_history';
        } else {
            url = '/delete_history?tracker=' + $scope.selected_tracker;
        };

        $http.post(url, query)
        .success(function(data, status) {
            //
        }).error(function(data, status) {
            //
        });
    };

    // Drop-down button
    $scope.status = {
        isopen: false
    };
    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
    $scope.setTracker = function(val) {
        $scope.selected_tracker = val;
    };

}]);
