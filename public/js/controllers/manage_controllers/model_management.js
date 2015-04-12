angular.module('GpsKovetoApp')

// ADMIN ROLE ONLY !!!!!!!!

.controller('ModelManagementController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

    $scope.models;

    $http.get('/models')
    .success(function(data, status) {
        $scope.models = data;
    }).error(function(data, status) {
        //
    });

    $scope.deleteModel = function(name) {
        $http.post('/delete_model', {"name": name})
        .success(function(data, status) {

            // update the view by removing model from models array
            for(var i=0; i<$scope.models.length; i++) {
                if ($scope.models[i].name == name) {
                    $scope.models.splice(i, 1);
                };
            };

        }).error(function(data, status) {
            //
        });
    };

    $scope.openModifyModelModal = function(tracker) {

        var modalInstance = $modal.open({
            templateUrl: 'modify_model_modal.html',
            controller: 'ModifyModelModalController',
            size: 'md',
            resolve: {
                model: function() {
                    return tracker;
                }
            }
        });
    };

}])

.controller('ModifyModelModalController', ['$scope', '$http', '$modalInstance', 'model', function($scope, $http, $modalInstance, model) {

    $scope.model = model;

	$scope.ok = function() {
		$http.post('/update_model', $scope.model)
        .success(function(data, status) {
            //
        }).error(function(data, status) {
            //
        });
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
