import express        from 'express';
import bodyParser     from 'body-parser';
import compression    from 'compression';
import morgan         from 'morgan';


module.exports = function(app) {

    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode < 400
        }, stream: process.stderr
    }));

    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode >= 400
        }, stream: process.stdout
    }));

    // Compression middleware (should be placed before express.static)
    app.use(compression({ threshold: 512 }));

    /*
    app.use(cors({
        origin: ['http://localhost:8080', 'https://reboil-demo.herokuapp.com'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    }));
    */

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

};
