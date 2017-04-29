/**
 * Main application routes
 */

'use strict';
import path from 'path';

export default app =>  {
    app.use('/user', require('./user'));
    app.use('/auth', require('./auth').default);

    // All undefined asset or api routes should return a 404
    app.route('/:url(auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
