import track from '../models/track';
import logger from '../util/logger';

exports.index = function (req, res) {
    track.getAll()
        .then(data => res.json(data))
        .catch(err => logger.error(err));
};
