/**
 * Main application routes
 */

'use strict';

module.exports = app =>  {
    app.use('/user', require('./user'));
    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    /*app.route('/:url(auth|components|app|bower_components|assets)/!*')
        .get(errors[404]);
    */
    
    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            //res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
            res.send("App is running ...");
        });
};
