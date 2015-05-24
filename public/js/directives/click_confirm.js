angular.module('GpsKovetoApp')

.directive('ngClickConfirm', function() {
    return {
        priority: -1,   // Run before original click handler
        restrict: 'A',
        link: function(scope, element, attributes) {
            element.bind('click', function(event) {
                var message = attributes.ngClickConfirm;
                if(message && !confirm(message)) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                };
            });
        }
    };
});
