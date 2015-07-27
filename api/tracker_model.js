var Model = require('../models/tracker_model.js').Model;


///// API HANDLER FUNCTIONS FOR DEALING WITH TRACKER BASE MODELS DEFINED IN THE SYSTEM

module.exports.getModels = function(req, res) {

    Model.find(function(err, docs) {
        if(err) {
            res.status(500).end('Could not fetch tracker models from DB');
            return;
        };

        res.status(200).end(JSON.stringify(docs));
    });
};

module.exports.deleteModel = function(req, res) {

    Model.find({name: req.body.name}).remove(function(err) {
        if(err) {
            res.status(500).end('Could not delete tracker model from DB');
            return;
        };

        res.status(200).end('Successfully deleted tracker model from DB');
    });
};

module.exports.updateModel = function(req, res) {

    Model.update({name: req.query.tracker}, req.body, function(err) {
        if(err) {
            res.status(500).end('Could not update tracker model in DB');
            return;
        };

        res.status(200).end('Successfully updated tracker model in DB');
    });

};
