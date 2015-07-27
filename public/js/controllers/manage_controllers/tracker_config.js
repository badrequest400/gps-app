angular.module('GpsKovetoApp')

.controller('TrackerConfigController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.users = [];
	// accordion controll, parent user is open by default
	$scope.sessionUser.isOpen = true;
	$scope.users[0] = $scope.sessionUser;
	$scope.isCollapsed = true;

	$http.get('/get_users?owner=' + $scope.sessionUser._id)
	.success(function(data) {
		data.forEach(function(user) {
			// needed for the Accordion control
			user.isOpen = false;
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
		$http.post('/trackers/update_model?tracker=' + original_name, $scope.form)
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
