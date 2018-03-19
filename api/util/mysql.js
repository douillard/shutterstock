require('dotenv').config();
import mysql from 'mysql2';

const state = {
    pool: null,
    mode: null,
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host    : process.env.MYSQL_HOST,
        user    : process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    })
    state.mode = mode
    done()
}

exports.get = function() { return state.pool }

exports.fixtures = function(data) {
    var pool = state.pool
    if (!pool) return done(new Error('Missing database connection.'))

    var names = Object.keys(data.tables)
    async.each(names, function(name, cb) {
        async.each(data.tables[name], function(row, cb) {
            var keys = Object.keys(row)
                , values = keys.map(function(key) { return "'" + row[key] + "'" })

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done)
}

exports.drop = function(tables, done) {
    var pool = state.pool
    if (!pool) return done(new Error('Missing database connection.'))

    async.each(tables, function(name, cb) {
        pool.query('DELETE * FROM ' + name, cb)
    }, done)
}



    /*
async function dude () {
    // get the client
    const  mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({host:'mariadb', user: 'root', database: 'Chinook'});
    // query database
    //const [rows, fields] = await connection.execute('SELECT * FROM `tracks` LIMIT 5');
    return await connection.execute('SELECT * FROM `tracks` LIMIT 5');


}
*/

