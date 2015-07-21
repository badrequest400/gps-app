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
