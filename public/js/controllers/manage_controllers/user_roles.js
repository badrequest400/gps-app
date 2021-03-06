angular.module('GpsKovetoApp')

.controller('UserRolesController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.roles;
	$scope.tabChecked;

	$http.get('/get_roles')
	.success(function(data) {
		$scope.roles = data;
	}).error(function(status, data) {
		console.log(status);
		console.log(data);
	});

	$scope.openModifyModal = function(current_role) {
		var modalInstance = $modal.open({
			templateUrl: 'modify_role_modal.html',
			controller: 'ModifyRoleModalController',
			size: 'lg',
			scope: $scope,
			resolve: {
				current_role: function() {
					return current_role;
				}
			}
		});
	};
	$scope.openNewRoleModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'new_role_modal.html',
			controller: 'NewRoleModalController',
			size: 'lg',
		});
	};


}])

.controller('ModifyRoleModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

	$scope.ok = function() {
		// SUBMIT
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}])

.controller('NewRoleModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

	$scope.ok = function() {
		// SUBMIT
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
