var fse = require('fs-extra'),
    parsePlaylist = require("./src/_parseNewPlaylist"),
    path = require('path'),
    async = require('async');
// download = require("./src/_downloadPlaylist");

async.waterfall([
    getPlaylist,
    createFolder,
    downloadPlaylist
], function (err, result) {
    // Last callback, runs after all above ends.
    // End of script.
    console.log("Playlist download complete!");
    return;
});

// getPlaylist: Take txt file, parse to playlist object.
// Receive: -
// Return:playlist - a playlist object redy to download.
function getPlaylist(cb) {
    var pathToFile = "./firstRss.txt";
    var playlist = parsePlaylist(pathToFile, function (playlist) {
        // setTimeout(function (playlist) {
        //             console.log("well wait 3 sec..");
        //                 console.log(" recieved playlist outside if: " + JSON.stringify(playlist, null, 3));

        cb(null, playlist);
    });
    // }, 3000);

    // async.until(
    //     function () { return (!(typeof playlist === 'undefined') || (typeof playlist === 'object')) },
    //     function (cbe) {
    //         setTimeout(function () {
    //             console.log("well wait a sec..");
    //             cbe();
    //         }, 1000);

    //     },
    //     function (err) {
    //         console.log(" recieved playlist inside if: " + JSON.stringify(playlist, null, 3));
    //         cb(null, playlist);
    //     }
    // );
    // while (!(!(typeof playlist.title === 'undefined') || (typeof playlist.title === 'string'))) {
    //   console.log("waiting for playlist...playlist is: "+JSON.stringify(playlist, null, 3));  
    // }

}


// createFolder: Take playlist object and create a folder for it.
// Receive:playlist
// Return:playlist
function createFolder(playlist, cb) {
    // make sure a folder for the coursePath exists (if doesnt, open it).
    // since the playlist title is a valid name for a folder, we can join for a final path.
    var playlistPath = path.join(playlist.title);
    console.log("Creating new folder at: " + playlistPath);
    fse.ensureDirSync(playlistPath);
    cb(null, playlist);
}

// downloadPlaylist: Take playlist and download it into the new folder.
// Receive:playlist
// Return: -
function downloadPlaylist(playlist, cb) {
    cb();
}


