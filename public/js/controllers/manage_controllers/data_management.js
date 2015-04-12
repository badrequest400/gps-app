angular.module('GpsKovetoApp')

// ADMIN ROLE ONLY !!!!!!!!

.controller('DataManagementController', ['$scope', '$http', function($scope, $http) {

    $scope.fromDate = new Date();
	$scope.toDate = new Date();
	$scope.fromOpened = false;
	$scope.toOpened = false;

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
        var query = {
            start: $scope.fromDate,
            end: $scope.toDate
        };

        $http.post('/delete_history', query)
        .success(function(data, status) {
            //
        }).error(function(data, status) {
            //
        });
    };

}]);
