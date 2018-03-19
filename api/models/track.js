const mysql = require('mysql2/promise');

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
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
