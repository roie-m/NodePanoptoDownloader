var Downloader = require('mt-files-downloader'),
	path = require('path'),
	async = require('async');

var handleEvents = require('mt-files-downloader/examples/_handleEvents');
var printStats = require('mt-files-downloader/examples/_printStats');

var registerDlEvents = function (num, dl) {
	handleEvents(dl, num);
	printStats(dl, num);
};

// Start Downloads:
function _downloadPlaylist(playlist) {
	var videos = playlist.videos;
	var title = playlist.title;
	async.forEach(videos, function (video, callback) {
		var downloader = new Downloader();

		// var fileUrl1 = parsed.feed.entries[0].guid;
		var videoName = video.name;
		var videoSource = video.source;
		var fileSavePath = path.join(title,videoName+ '.mp4');


		console.log('File will be downloaded FROM: ' + videoSource + '\nTO: ' + fileSavePath);

		var dl = downloader.download(videoSource, fileSavePath).start();

		registerDlEvents(videoName, dl); //replaced num with name in the printing function for description.

	}, function (err) {
		if (err) console.error(err.message);
		// Downloads Done!
		console.log("Downloads Complete!!!")
	});

};
module.exports = _downloadPlaylist;