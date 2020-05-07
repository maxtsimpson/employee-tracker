var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "songsdb",
    password: "ae92r4afe"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

const exitApp = () => { 
  con.destroy()
}
  
const getSQLquery = function (artist) {
    return `SELECT * FROM songs
    inner join albums
    on (albums.releaseYear = songs.year
    and songs.artist = albums.artist)
    where songs.artist = "${artist}"`;
}
con.query(getSQLquery("Madonna"),function (err, result) {
    if (err) throw err;
    console.table(result)
    exitApp()
});

