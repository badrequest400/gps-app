var Reports = require('../models/report.js').Reports;

module.exports.deleteHistory = function(req, res) {
    var query = {};

    if(req.query.tracker) {
        query = {timestamp:{$gte:req.body.start, $lte:req.body.end}, 'tracker.name': req.query.tracker};
    } else {
        query = {timestamp:{$gte:req.body.start, $lte:req.body.end}};
    };

    Reports.find(query).remove(function(err) {
        if (err) {
            res.status(500).end('Something went wrong, could not delete records from DB');
            return;
        };

        res.status(200).end('Successfully deleted records from the DB');
    });
};
