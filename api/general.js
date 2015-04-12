var Reports = require('../models/report.js').Reports;

module.exports.deleteHistory = function(req, res) {

    Reports.find({timestamp:{$gte:req.body.start, $lte:req.body.end}}).remove(function(err) {
        if (err) {
            res.status(500).end('Something went wrong, could not delete records from DB');
            return;
        };

        res.status(200).end('Successfully deleted records from the DB');
    });
};
