var fse = require('fs-extra'),
    parsePlaylist = require("./src/_parseNewPlaylist"),
    path = require('path'),
    async = require('async'),
    download = require("./src/_downloadPlaylist");

async.waterfall([
    getPlaylist,
    createFolder,
    downloadPlaylist
], function (err, result) {
    // Last callback, runs after all above ends.
    // End of script.
});

// getPlaylist: Take txt file, parse to playlist object.
// Receive: a callback(playlist) to run when gets the final playlist.
// Return:playlist - a playlist object redy to download.
function getPlaylist(cb) {
    var pathToFile = "./0.txt";
    var playlist = parsePlaylist(pathToFile, function (playlist) {
        cb(null, playlist);
    });
}


// createFolder: Take playlist object and create a folder for it.
// Receive:playlist
// Return:playlist
function createFolder(playlist, cb) {
    // make sure a folder for the coursePath exists (if doesnt, open it).
    // since the playlist title is a valid name for a folder, we can join for a final path.
    var playlistPath = path.join(playlist.title);
    console.log("Creating new folder: " + playlistPath);
    fse.ensureDirSync(playlistPath);
    cb(null, playlist);
}

// downloadPlaylist: Take playlist and download it into the new folder.
// Receive:playlist
// Return: -
function downloadPlaylist(playlist, cb) {
    download(playlist);
    cb();
}


