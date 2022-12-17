const model = require('../models')

// Generate code
const controller = {};


controller.getIndex = (req, res) => {
    res.json(model.getAPI);
}
controller.getFormatIndex = (req, res) => {
    model.getIndex(req.params.format) // Index json, Format [json, xml, csv], API
    .then(data => {
        res.type(`application/${data._f}`)
        res.send(data.data)
    });
}
controller.getLastBet = (req, res) => {
    model.getLastBet(req.params.format, req.params.bet) // Get last bet;
    .then(data => {
        res.type(`application/${data._f}`)
        res.send(data.data)
    })
    .catch(err => {
        if(err == 404){
            res.status(404).json({
                query: req.params,
                error: 'Not found'
            });
        }else{
            res.status(500).send(err);
        }
    });
}

module.exports = controller;