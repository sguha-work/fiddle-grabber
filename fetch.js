// to run this code use phantomjs fetchData.js
var counter = -1;
var url = [];
var page;
var rootDirectoryName = "fiddles";
var newFiddleObjects = [];

var fiddleFetch = {};
fiddleFetch.url = [];
page = require('webpage').create();

var createLocalFiles = (function(urlObject) {console.log("hello "+JSON.stringify(urlObject));
    console.log("****** Start creating local files ******");
    var fs = require('fs');
    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function() {
    	var value = page.evaluate(function() {
	        var html = $('#id_code_html').text();
	        var js = $('#id_code_js').text();

	        var css = $('#id_code_css').text;
	        var resources = [];
	        $(".filename").each(function() {
	        	resources.push($(this).attr("href"));
	        });
	        var options = {};
	        options.description = $('#id_description').text();
	        options.title = $("#id_title").val();
	        return {
	            html: html,
	            js: js,
	            css: css,
	            resources: resources,
	            options: options
	        };

	    });
		fs.makeDirectory(rootDirectoryName+"/"+urlObject.title);
		fs.makeDirectory(rootDirectoryName+"/"+urlObject.title+"/"+"files");
		counter+=1;	    
	    console.log("****** File write done ******");
    });
    
    // for (var index in categoryNameArray) {
    //     if (categoryNameArray[index].cat_name != "Chart" && categoryNameArray[index].cat_name != "Gauge" && categoryNameArray[index].cat_name != "Map") {
    //         var rootFolderName = categoryNameArray[index].vis_name + "/" + categoryNameArray[index].cat_name;
    //         var folderName = rootDirectoryName + "/" + rootFolderName + "/" + url[counter].fiddle_description.split(" ").join("-").split("/").join("-").split("%").join("-").split(",").join("-");
    //         // if(!fs.exists(folderName)) {
    //         // 	fs.makeDirectory(folderName);
    //         // } else {
    //         folderName += "_" + counter;
    //         fs.makeDirectory(folderName);
    //         // }
    //         fs.write(folderName + "/" + "demo.html", value.html, 'w');
    //         fs.write(folderName + "/" + "demo.css", value.css, 'w');
    //         fs.write(folderName + "/" + "demo.js", '$(window).load(function(){' + value.js + '});', 'w');
    //         var fiddleNewLink = "http://jsfiddle.net/gh/get/jquery/1.9.1/" + githubUserId + "/" + githubRepoId + "/tree/master/" + folderName + "/";
    //         fs.write(folderName + "/" + "url.js", url[counter].fiddle_url + '\n' + fiddleNewLink, 'w');
    //         var detailsContent = "---\nname: " + value.options.title + "\ndescription: " + value.options.description + "\nresources: \n";
    //         for (var index in value.resources) {
    //             detailsContent += '  - ' + value.resources[index] + '\n';
    //         }
    //         detailsContent += '...';
    //         fs.write(folderName + "/" + "demo.details", detailsContent, 'w');
    //         var newFiddleObject = {
    //             fiddle_id: counter,
    //             fiddle_prev_link: url[counter].fiddle_url,
    //             fiddle_new_link: fiddleNewLink
    //         };
    //         newFiddleObjects.push(newFiddleObject);
    //     }
    // }
    
});

var startRender = (function() {
    counter += 1;
    if (counter >= fiddleFetch.url.length) {
        var fs = require('fs');
        var fiddleDataFileContent = JSON.parse(fs.read("fiddleData_new.js"));
        fiddleDataFileContent.FiddlesData = newFiddleObjects;
        fs.write("NewFiddles.js", JSON.stringify(fiddleDataFileContent), 'w');
        phantom.exit();
    }

    if (counter > newFiddleObjects.length) {
        counter -= 1;
    }
    console.log("****** " + (counter+1) + " Openning link " + fiddleFetch.url[counter].url + " *****");
    page.open(fiddleFetch.url[counter].url, function(status) {
        if (status == 'success') {
            createLocalFiles(fiddleFetch.url[counter]);
        } else {
            console.log("****** Link cannot be opened may be broken or slow internet connectivity, will retry now ******");
        }
    });
});


var startRenderInterval = (function() {
	startRender();
    setInterval(function() {
        startRender();
    }, 15000)
});

// creating root folder
(function(){
	var fs = require('fs');
	fs.makeDirectory(rootDirectoryName);
})();

// parse the csv to get the url array
var getURLArrayFromCSV = (function(fileContent) {
    var fileContentArray = fileContent.split("\n");
    for (var index = 1; index < fileContentArray.length; index++) {
        var lineArray = fileContentArray[index].split(",");
        if (typeof lineArray[0] != "undefined" && lineArray[0].trim().length != 0) {
            var tempObject = {};
            tempObject.url = lineArray[0];
            if (typeof lineArray[1] != "undefined" && lineArray[1].trim().length != 0) {
                tempObject.title = lineArray[1];
            } else {
                tempObject.title = "untitled" + index;
            }
            fiddleFetch.url.push(tempObject);
        } else {
            continue;
        }
    }
    startRenderInterval();
});

// set the csv file name
(function(process) {
    var indexOfCsvFile = 1;
    var system = require('system');
    fiddleFetch.csvFileName = system.args[indexOfCsvFile];
})();

// if csv file name not provided exiting the program
(function() {
    if (typeof fiddleFetch.csvFileName != "undefined" && fiddleFetch.csvFileName.trim() != "") {
        var fs = require('fs');
        var fileContent = fs.read(fiddleFetch.csvFileName);
        if (typeof fileContent == "undefined" || fileContent.trim().length == 0) {
            console.log("Invalid file content.");
            phantom.exit();
        } else {
            getURLArrayFromCSV(fileContent);
        }
    } else {
        console.log("CSV file name not provided");
        phantom.exit();
    }
})();

