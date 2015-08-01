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
                        name: {$first: "$name"},
                        start: {$first: "$timestamp"},
                        end: {$last: "$timestamp"},
                        odometer_start: {$last: "$odometer"},
                        odometer_end: {$first: "$odometer"},
                        // start_address: {$first: "$address"},  /// SUBJECT TO DECISION, IF WE DO ADDRESS LOOKUPS STRAIGHT ON WRITES OR NOT
                        // end_address: {$last: "$address"},     /// SUBJECT TO DECISION, IF WE DO ADDRESS LOOKUPS STRAIGHT ON WRITES OR NOT
                        max_speed: {$max: "$speed"}
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
        grouping.$group._id = null;
    };

    Reports.aggregate([
        {$match: {timestamp:{$gte: new Date(req.query.start), $lte: new Date(req.query.end)}, "tracker.name": req.query.name}},
        {$sort: {timestmap: 1}},
        {$project: {
            name: "$tracker.name",
            timestamp: 1,
            day: {$dayOfYear: "$timestamp"},
            week: {$week: "$timestamp"},
            month: {$month: "$timestamp"},
            odometer: 1,
            speed: 1
            }
        },
        grouping,
        {$project: {
            name: 1,
            start: 1,
            end: 1,
            distance: {$subtract: ["$odometer_end", "$odometer_start"]},
            duration: {$subtract: ["$end", "$start"]},
            // start_address: 1,  /// SUBJECT TO DECISION, IF WE DO ADDRESS LOOKUPS STRAIGHT ON WRITES OR NOT
            // end_address: 1,     /// SUBJECT TO DECISION, IF WE DO ADDRESS LOOKUPS STRAIGHT ON WRITES OR NOT
            max_speed: 1,
            odometer_start: 1
            }
        }
    ], function(err, docs) {
        if(err)	{
            res.status(500).end('Something went wrong, could not fetch records from DB');
            return;
        };

        res.status(200).end(JSON.stringify(docs));
    });
};
