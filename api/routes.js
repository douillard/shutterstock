import track  from './controllers/track';
import logger from './util/logger';

module.exports = function(app) {

    app.get('/api/v1/track', track.index);

    app.get('*', (req, res) => res.status(404).send('This is not the page you\'re looking 404'))

    app.use(function(err, req, res, next){
        if (err) { return logger.error(err); }
    });

}
