angular.module('GpsKovetoApp')

.directive('trackerPicker', function() {

    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            
            scope.sessionUser.trackers.forEach(function(tracker) {
                element.append( $('<option></option>').text(tracker.name));
            });
        }
    };
});
