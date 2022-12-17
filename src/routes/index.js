const express = require('express');
const router = express.Router();

const controller = require('../controllers');


module.exports = app => {
    // GENERATE APP ROUTES
    router.get('/', controller.getIndex);
    router.get('/:format', controller.getFormatIndex); // Format index
    router.get('/:format/:bet', controller.getLastBet); // Format index

    app.use(router);
}