var Tracker = require('../models/tracker.js').Tracker;


module.exports.getTrackers = function(req, res) {

    Tracker.find(function(err, docs) {
        if(err) {
            res.status(500).end('Could not fetch tracker models from DB');
            return;
        };

        res.status(200).end(JSON.stringify(docs));
    });
};

module.exports.deleteTracker = function(req, res) {

    Tracker.find({name: req.body.name}).remove(function(err) {
        if(err) {
            res.status(500).end('Could not delete tracker model from DB');
            return;
        };

        res.status(200).end('Successfully deleted tracker model from DB');
    });
};

module.exports.updateTracker = function(req, res) {

    Tracker.update({name: req.query.tracker}, req.body, function(err) {
        if(err) {
            res.status(500).end('Could not update tracker model in DB');
            return;
        };

        res.status(200).end('Successfully updated tracker model in DB');
    });

};
