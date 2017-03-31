// var fse = require('fs-extra'),
//     parse = require("./src/_parseNewPlaylist"),
//     path = require('path'),
//     download = require("./src/_downloadPlaylist");

// // find the path to the txt rss file ,and give it to parse
// var content = "./firstRss.txt";
// var playlist = parsePlaylist(content);

// console.log(" recieved playlist: " + playlist);



// // make sure a folder for the coursePath exists (if doesnt, open it).
// // since the playlist title is a valid name for a folder, we can join for a final path.
// var playlistPath = path.join(playlist.title);
// fse.ensureDirSync(playlistPath);


// TESTING A MODULE 
var content = "./firstRss.txt";
var playlist = parsePlaylist(content);
