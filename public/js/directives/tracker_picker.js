angular.module('GpsKovetoApp')

.directive('trackerPicker', function() {

    return {
        restrict: 'A',
        link: function(scope, element, attributes) {

            // DEFAULT FILTER VALUE
            scope.filter.name = scope.sessionUser.trackers[0].name;

            // POPULATE SELECT ELEMENT WITH TRACKERS FROM SESSIONUSER
            scope.sessionUser.trackers.forEach(function(tracker) {
                element.append($('<option></option>').val(tracker.name).text(tracker.name));
            });

            // SET FILTER VALUE TO CHOSEN TRACKER NAME
            element.on('change', function() {
                scope.filter.name = element.val();
            });
        }
    };
});
