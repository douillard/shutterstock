import track from '../models/track';

let fieldsArray = [
    "email",
    "name",
    "username",
    "password"
];


exports.index = function (req, res) {

    track.getAll()
        .then(data => res.json(data))
        .catch(err => console.log(err));

    //options.criteria = "";
    //const orders = yield Order.list(options);
    //const count = yield Order.count();
};
