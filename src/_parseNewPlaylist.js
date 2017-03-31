// This module receives a path (string) to a .txt file, and returns a new parsed js playlist object.
var follow = require('catch-redirect-url'),
    path = require('path'),
    async = require('async');




var parsePlaylist = function (pathToFile) {
    var pathToFile = pathToFile.toString();
    // console.log("this is pathToFile: " + pathToFile + ", which is a : " + typeof pathToFile);
    async.waterfall([
        parseRSSFile,
        setPlaylistTitle,
        extractVideos,
        followURLs
    ], function (err, result) {
        // Last callback,runs after all above ends.
        // returns the final playlist object.
        var finalPlaylist = result;
        console.log("This is the final playlist object: " + JSON.stringify(finalPlaylist, null, 3));
        return finalPlaylist;
    });

    // parseFile: Parse the file from RSS TXT to a JS object.
    // Recieve: pathToFile - a path to the txt file (string).
    // Return: parsedRss - a js object.
    function parseRSSFile(cb) {
        var rssParser = require("rss-parser");
        // var absPath = path.join(pathToFile);
        rssParser.parseFile(pathToFile, function (err, parsedRss) {

            cb(null, parsedRss);

        });
    }

    // setPlaylistTitle: Creates a new playlist object, and sets its title after formatting.
    // Receive: parsedRss
    // Return: parsedRss - same object , playlist - the new object.
    function setPlaylistTitle(parsedRss, cb) {
        // console.log("On to Title!, this is the received parsed object:"+JSON.stringify(parsedRss, null, 3));
        var playlist = {};
        var preformattedTitle = parsedRss.feed.title;
        // console.log("raw course title is: " + preformattedTitle);
        var validTitle = preformattedTitle.slice(8); //slice 'courseNumberS:' from beginning of name
        validTitle = validTitle.replace('"', ''); // delete '"' if in string
        // console.log("valid course title is: " + validTitle);

        playlist.title = validTitle;
        // console.log("current playlist object (with valid title): " +JSON.stringify(playlist, null, 3));

        cb(null, parsedRss, playlist);
    }

    // exractVideos: Takes the playlist object, and adds to it the array of videos, each with name and unfollowed source for download.
    // Receive: parsedRss - same object , playlist - the new object.
    // Return: playlist - final structure with names, URLs that are not followed.
    function extractVideos(parsedRss, playlist, cb) {
        // for each Entry in array parsedRss.feed.entries take guid and title and put in playlist.
        var entries = parsedRss.feed.entries;
        playlist.videos = []; // an empty array to hold the parsed entries.
        // console.log("the following should be the array of entries from the rss: " + JSON.stringify(entries, null, 3));
        entries.forEach(function (entry) {
            playlist.videos.push({ name: entry.title, source: entry.guid });
        });

        // console.log("this is how a playlist object should look like: " + JSON.stringify(playlist, null, 3));
        cb(null, playlist);
    }

    // followURLs: Take the playlist object, and for each video replace initial source with final source for download.
    // Receive: playlist - final structure with names, but not final URLs
    // Return: playlist - final playlist including correct download source URLs.
    function followURLs(playlist, cb) {
        var videos = playlist.videos;
        async.each(videos, function (video, eachcb) {
            //async, for each video from playlist, replace source with final source.
            // var src = video.source;
            follow(video['source'], function (finalURL) {
                video['source'] = finalURL;
                // console.log("here should be a final url: " + video['source']);
                // console.log("almost final playlist - with final URLs: " + JSON.stringify(playlist, null, 3));

                eachcb();
            });

        }, function (err) {
            // if i had thrown any errors, this is where there would ifs taking care of messages
            // console.log("if i had thrown any errors, this is where there would ifs taking care of messages");
            // all of the videos have been parsed
            // console.log("this should be the final playlist - with final URLs: " + JSON.stringify(playlist, null, 3));
            cb(null, playlist); // exiting the function, returning the final playlist object.

        });

        // cb(null, playlist); END OF followURLs
    }


};

module.exports = parsePlaylist;