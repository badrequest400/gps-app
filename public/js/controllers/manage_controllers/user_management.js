angular.module('GpsKovetoApp')

.controller('UserManagementController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.users;

	$http.get('/get_users')
	.success(function(data) {
		$scope.users = data;
	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});

	$scope.openModifyModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'modify_user_modal.html',
			controller: 'ModifyUserModalController',
			size: 'md',
		});
	};
	$scope.openNewUserModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'new_user_modal.html',
			controller: 'NewUserModalController',
			size: 'md',
		});
	};
}])

.controller('ModifyUserModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

	$scope.ok = function() {
		// SUBMIT
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}])

.controller('NewUserModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.ok = function() {
		// SUBMIT
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
