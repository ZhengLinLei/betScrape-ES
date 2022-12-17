const express = require('express');
const routes = require('../routes');

module.exports = app => {
    // SERVER CONFIG-----------

    // SET GLOBAL VARIABLES
    app.set('env', 'dev'); // dev | prod
    app.set('port', process.env.PORT || 3000); // IN PRODUCTION MUST CHANGE THIS PORT TO 80

    // MIDDLEWARE
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());

    // ROUTES
    routes(app);

    // RETURN ALL CONFIG TO THE MAIN FILE
    return app;
}