var Reports = require('../models/report.js').Reports;


module.exports.gps = function(req, res) {

    Reports.find({'tracker.name': req.body.name, timestamp:{$gte: req.body.start, $lte: req.body.end}}, function(err, docs) {
        if(err)	{
            res.status(500).end('Something went wrong, could not fetch records from DB');
            return;
        };

        res.status(200).end(JSON.stringify(docs));
    });
};

module.exports.distance = function(req, res) {

    var grouping = { $group: {
                        _id: "",
                        start: {$first: "$timestamp"},
                        end: {$last: "$timestamp"},
                        distance: {$subtract: [{$last: "$odometer"}, {$first: "$odometer"}]},
                        duration: {$subtract: [{$last: "$timestamp"}, {$first: "$timestamp"}]},
                        // start_address: {$first: "$address"},  /// SUBJECT TO DECISION, IF WE DO ADDRESS LOOKUPS STRAIGHT ON WRITES OR NOT
                        // end_address: {$last: "$address"},     /// SUBJECT TO DECISION, IF WE DO ADDRESS LOOKUPS STRAIGHT ON WRITES OR NOT
                        highest_speed: {$max: "$speed"},
                        odometer_start: {$first:"$odometer"}
                    }
    };

    if(req.query.grouping) {
        if(req.query.grouping == 'day') {
            grouping.$group._id = "$day";
        } else if(req.query.grouping == 'week') {
            grouping.$group._id = "$week";
        } else if(req.query.grouping == 'month') {
            grouping.$group._id = "$month";
        }

    } else {
        grouping.$group._id: null;
    };

    Reports.aggregate([
        {$match: timestamp:{$gte: req.query.start, $lte: req.query.end}},
        {$sort: {timestmap: 1}},
        {$project:
            timestamp: 1,
            day: {$dayOfYear: "$timestmap"}
            week: {$week: "$timestmap"},
            month: {$month: "$timestmap"},
            odometer: 1,
            speed: 1
        },
        grouping
    ], function(err, docs) {
        if(err)	{
            res.status(500).end('Something went wrong, could not fetch records from DB');
            return;
        };

        res.status(200).end(JSON.stringify(docs));
    });
};
