const mysql = require('mysql2/promise');

const config = {
    host:'mariadb',
    user: 'root',
    password: 'password',
    database: 'Chinook'
}

exports.getAll = async function () {

    try {
        // create the connection to database
        const connection = await mysql.createConnection(config);

        const sql = `
            SELECT 
                t.Name, t.Bytes, t.Milliseconds, plt.PlaylistCount 
            FROM Track t 
            LEFT JOIN ( 
                SELECT TrackId, COUNT(PlaylistId) PlaylistCount 
                FROM PlaylistTrack GROUP BY TrackId
            ) plt ON t.TrackId = plt.TrackId`;

        const [rows] = await connection.execute(sql);

        return rows;

    } catch (err) {
        return err.message;
    }

}
