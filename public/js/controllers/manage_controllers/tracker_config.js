angular.module('GpsKovetoApp')

.controller('TrackerConfigController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.users;
	$scope.isCollapsed = true;

	$http.get('/get_users')
	.success(function(data, status) {
		$scope.users = data;
	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});

	$scope.openModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'tracker_config_modal.html',
			controller: 'TrackerConfigModalController',
			size: 'md',
		});
	};

}])

.controller('TrackerConfigModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

	$scope.ok = function() {
		// SUBMIT
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
