angular.module('GpsKovetoApp')

.controller('TrackerConfigController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.users = [];
	// POPSZ: need it for the Accordion control
	$scope.sessionUser.isOpen = true;
	$scope.users[0] = $scope.sessionUser;
	// popsz
	$scope.isCollapsed = true;

	// POPSZ -----------------------------------------------------------
	// $http.get('/owned_users')
	// .success(function(data, status) {
	// 	$scope.users = data;
	// }).error(function(data, status) {
	// 	console.log(status);
	// 	console.log(data);
	// });

	// from user_management.js:
	$http.get('/get_users?owner=' + $scope.sessionUser.username)
	.success(function(data) {
		data.forEach(function(user) {
			// POPSZ: need it for the Accordion control
			user.isOpen = false;
			// popsz
			$scope.users.push(user);
		});
	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});
	// popsz -------------------------------------------------------------

	$scope.openModal = function(tracker) {
		var modalInstance = $modal.open({
			templateUrl: 'tracker_config_modal.html',
			controller: 'ModifyTrackerModalController',
			size: 'md',
			resolve: {
				tracker: function() {
					return tracker;
				}
			}
		});
	};

}])

.controller('ModifyTrackerModalController', ['$scope', '$modalInstance', '$http', 'tracker',
	function($scope, $modalInstance, $http, tracker) {

	$scope.tracker = tracker;
	var original_name = tracker.name;

	$scope.form = {};
	$scope.form.name = tracker.name;
	$scope.form.GID = tracker.GID;
	$scope.form.model = tracker.model;
	$scope.form.users = tracker.users;

	$scope.ok = function() {
		$http.post('/trackers/update_tracker?tracker=' + original_name, $scope.form)
		.success(function(data, status) {
			$modalInstance.close();
		}).error(function(data, status) {
			//
		});
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
