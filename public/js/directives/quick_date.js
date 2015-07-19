angular.module('GpsKovetoApp')

.directive('quickDate', function() {

    return {
        restrict: 'A',
        link: function(scope, element, attributes) {

            element.on('change', function() {
                switch (element.val()) {
                    case "yesterday":
                        var date = new Date();
                        var yesterday = date.setDate(date.getDate()-1)
                        scope.filter.from = timeNull(yesterday);
                        scope.filter.to = timeNull(date);
                        break;
                    case "last_7_days":

                        break;
                    case "last_30_days":

                        break;
                    case "last_week":

                        break;
                    case "current_week":

                        break;
                    case "last_month":

                        break;
                    case "current_month":

                        break;
                    case "custom":

                        break;
                };
            });
        }
    };
});

function timeNull(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0)

    return date;
}
