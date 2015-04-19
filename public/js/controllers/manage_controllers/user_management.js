angular.module('GpsKovetoApp')

.controller('UserManagementController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.users = [];
	$scope.users[0] = $scope.sessionUser;

	$http.post('/get_users', {userList: $scope.sessionUser.owned_users})
	.success(function(data) {
		data.forEach(function(user) {
			$scope.users.push(user);
		});
	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});

	$scope.openModifyModal = function(current_user) {
		var modalInstance = $modal.open({
			templateUrl: 'modify_user_modal.html',
			controller: 'ModifyUserModalController',
			size: 'md',
			resolve: {
				users: function() {
					return $scope.users;
				},
				current_user: function() {
					return current_user;
				}
			}
		});
	};
	$scope.openNewUserModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'modify_user_modal.html',
			controller: 'NewUserModalController',
			size: 'md'
		});
	};
}])

.controller('ModifyUserModalController', ['$scope', '$modalInstance', '$http', 'users', 'current_user',
	function($scope, $modalInstance, $http, users, current_user) {

	$scope.form = {};
	$scope.form.role = 'Role';
	$scope.form.status = 'User Status';
	$scope.form.owner = 'Owner';
	$scope.users = users;
	$scope.current_user = current_user;

	$scope.ok = function() {
		// SUBMIT
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$http.get('/get_roles')
	.success(function(data, status) {
		$scope.roles = data;
	}).error(function(data, status) {
		//
	});

	$scope.status = {
		isopen: false
	};
	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
	$scope.setRole = function(val) {
		$scope.form.role = val;
	};
	$scope.setStatus = function(val) {
		$scope.form.status = val;
	};
	$scope.setOwner = function(val) {
		$scope.form.owner = val;
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
