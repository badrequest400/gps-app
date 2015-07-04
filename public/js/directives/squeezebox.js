angular.module('GpsKovetoApp')

.constant('squeezeboxConfig', {
  closeOthers: true
})

.controller('SqueezeboxController', ['$scope', '$attrs', 'squeezeboxConfig', function ($scope, $attrs, squeezeboxConfig) {

  // This array keeps track of the squeezebox groups
  this.groups = [];

  // Ensure that all the groups in this squeezebox are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : squeezeboxConfig.closeOthers;
    if ( closeOthers ) {
      angular.forEach(this.groups, function (group) {
        if ( group !== openGroup ) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the squeezebox-group directive to add itself to the squeezebox
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the squeezebox-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(index, 1);
    }
  };

}])

// The squeezebox directive simply sets up the directive controller
// and adds an squeezebox CSS class to itself element.
.directive('squeezebox', function () {
  return {
    restrict:'EA',
    controller:'SqueezeboxController',
    transclude: true,
    replace: false,
    templateUrl: 'template/squeezebox.html'
  };
})

// The squeezebox-group directive indicates a block of html that will expand and collapse in an squeezebox
.directive('squeezeboxGroup', function() {
  return {
    require:'^squeezebox',         // We need this directive to be inside an squeezebox
    restrict:'EA',
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl:'template/squeezebox-group.html',
    scope: {
      heading: '@',               // Interpolate the heading attribute onto this scope
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
      this.setHeadingPlus = function(element) {
        this.headingPlus = element;
      };
    },
    link: function(scope, element, attrs, squeezeboxCtrl) {
      squeezeboxCtrl.addGroup(scope);

      scope.$watch('isOpen', function(value) {
        if ( value ) {
          squeezeboxCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function() {
        if ( !scope.isDisabled ) {
          scope.isOpen = !scope.isOpen;
        }

        // $http.get('/get_users?owner=' + user.username)
        // .success(function(data) {
    	// 	data.forEach(function(user) {
    	// 		// POPSZ: need it for the Accordion control
    	// 		user.isOpen = false;
    	// 		// popsz
    	// 		$scope.users.push(user);
    	// 	});
    	// }).error(function(data, status) {
    	// 	console.log(status);
    	// 	console.log(data);
    	// });

      };
    }
  };
})

// Use squeezebox-heading below an squeezebox-group to provide a heading containing HTML
// <squeezebox-group>
//   <squeezebox-heading>Heading containing HTML - <img src="..."></squeezebox-heading>
// </squeezebox-group>
.directive('squeezeboxHeading', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^squeezeboxGroup',
    link: function(scope, element, attr, squeezeboxGroupCtrl, transclude) {
      // Pass the heading to the squeezebox-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      squeezeboxGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use squeezebox-heading-plus below after squeezebox-heading to provide additional
// functionality to the heading (e.g buttons, other controls)
// <squeezebox-group>
//   <squeezebox-heading>Heading containing HTML - <img src="..."></squeezebox-heading>
//   <squeezebox-heading-plus>Additional HTML functionality - <button ...></squeezebox-heading-plus>
// </squeezebox-group>
.directive('squeezeboxHeadingPlus', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^squeezeboxGroup',
    link: function(scope, element, attr, squeezeboxGroupCtrl, transclude) {
      // Pass the heading to the squeezebox-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      squeezeboxGroupCtrl.setHeadingPlus(transclude(scope, angular.noop));
    }
  };
})

// Use in the squeezebox-group template to indicate where you want the heading to be transcluded
// You must provide the property on the squeezebox-group controller that will hold the transcluded element
// <div class="squeezebox-group">
//   <div class="squeezebox-heading" ><a ... squeezebox-transclude="heading">...</a></div>
//   ...
// </div>
.directive('squeezeboxTransclude', function() {
  return {
    require: '^squeezeboxGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.squeezeboxTransclude]; }, function(source) {
        if ( source ) {
          element.html('');
          element.append(source);
        }
      });
    }
  };
})

;
