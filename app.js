var rssParser = require("rss-parser"), 
    fse = require('fs-extra'), 
    path  = require('path');

var content = "firstRss.txt";
rssParser.parseFile(content, function(err, parsed) {
  console.log(JSON.stringify(parsed, null, 3));
  var courseTitle = parsed.feed.title;
  console.log("Course Title is:" + courseTitle);
  var coursePath = path.join(courseTitle);
  coursePath = coursePath.slice(8); //slice 'courseNumber:' from beginning of name
  coursePath = coursePath.replace('"',''); // delete '"' if in string
    console.log("Course Path is:" + coursePath);

    fse.ensureDirSync(coursePath)


  
})
