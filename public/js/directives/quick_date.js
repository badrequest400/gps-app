angular.module('GpsKovetoApp')

// GENERATE FROM-TO DATE OBJECTS FOR FILTERING QUERIES
// ACCORDING TO QUICK TIME FILTER VALUES



//////////////////////////////////////////////////

// DATE VALUES ARE NOT RIGHT YET, TEST, TEST, TEST!!!!


/////////////////////////////////////////////////



.directive('quickDate', function() {

    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            
            // DEFAULT --> YESTERDAY
            var date = new Date();
            date.setDate(date.getDate()-1);
            scope.filter.from = timeNull(date);
            scope.filter.to = timeNull(new Date());

            element.on('change', function() {
                switch (element.val()) {
                    case "yesterday":
                        var date = new Date();
                        date.setDate(date.getDate()-1);
                        scope.filter.from = timeNull(date);
                        scope.filter.to = timeNull(new Date());
                        break;
                    case "last_7_days":
                        var date = new Date();
                        date.setDate(date.getDate() -7);
                        scope.filter.from = date
                        scope.filter.to = new Date();
                        break;
                    case "last_30_days":
                        var date = new Date();
                        date.setDate(date.getDate() -30);
                        scope.filter.from = date
                        scope.filter.to = new Date();
                        break;
                    case "last_week":
                        var date = new Date();
                        date.setDate(date.getDate() -7);
                        date.setDate(date.getDate() - date.getDay() + 1);
                        var date2 = new Date();
                        date2.setDate(date.getDate() - date.getDay());
                        scope.filter.from = date;
                        scope.filter.to = date2;
                        break;
                    case "current_week":
                        var date = new Date();
                        date.setDate(date.getDate() - date.getDay() + 1);
                        scope.filter.from = timeNull(date);
                        scope.filter.to = new Date();
                        break;
                    case "last_month":
                        var date = new Date();
                        date.setDate(date.getDate() - 30);
                        date.setDate(1);
                        var date2 = new Date();
                        date2.setDate(date2.getDate() - 30);
                        date2.setDate(30);
                        date2.setHours(23);
                        date2.setMinutes(59);
                        scope.filter.from = timeNull(date);
                        scope.filter.to = date2;
                        break;
                    case "current_month":
                        var date = new Date();
                        date.setDate(1);
                        scope.filter.from = timeNull(date);
                        scope.filter.to = new Date();
                        break;
                    case "custom":
                        // EMBED CUSTOM DATE-TIME PICKER
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
