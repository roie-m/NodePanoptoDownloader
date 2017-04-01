var Downloader = require('mt-files-downloader'),
        path  = require('path');



var handleEvents = require('mt-files-downloader/examples/_handleEvents');
var printStats = require('mt-files-downloader/examples/_printStats');

var registerDlEvents = function(num, dl) {
	handleEvents(dl, num);
	printStats(dl, num);
};

// Start Downloads:

var downloader = new Downloader();

var fileUrl1 = parsed.feed.entries[0].guid;
var fileSavePath1 = path.join(coursePath, 'mtFileDlTest1.mp4');


console.log('First file will be downloaded from '+ fileUrl1 +' to '+ fileSavePath1);

var dl1 = downloader.download(fileUrl1, fileSavePath1)
		  .start();



registerDlEvents(1, dl1);
