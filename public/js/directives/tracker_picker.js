angular.module('GpsKovetoApp')

.directive('trackerPicker', function() {

    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            console.log(scope);

            scope.sessionUser.trackers.forEach(function(tracker) {
                element.append( $('<option></option>').text(tracker.name));
            });
        }
    };
});
