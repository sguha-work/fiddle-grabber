// to run this code use phantomjs fetchData.js
var counter=-1;
var url = [];
var startRender;
var page;
var rootDirectoryName = "fiddles";
var newFiddleObjects = [];

var  fiddleFetch = {};
fiddleFetch.url = [];

var getURLArrayFromCSV = (function() {
	var csvArray = require('csv-array');
	csv.parseCSV("test.csv", function(data){
		for(var index = 0; index<data.length; index++) {
			var tempObject = {};
			if(typeof data[index].url != "undefined" && data[index].url.trim() != "") {
				tempObject.url = data[index].url.trim();
				if(typeof data[index].title == "undefined" || data[index].title.trim()=="") {
					tempObject.title = "Untitled_" + index;
				} else {
					tempObject.title = data[index].title;
				}
				fiddleFetch.url.push(tempObject);
			} else {
				continue;
			}
		}
	}, true);
});

(function() {
	var indexOfCsvFile = 2;console.log("hello");
	process.argv.forEach(function (val, index, array) {
	  if(index == 2) {
	  	fiddleFetch.csvFileName = val;
	  }
	});
})();

(function() {
	if(typeof fiddleFetch.csvFileName != "undefined" && fiddleFetch.csvFileName.trim() != "") {
		getURLArrayFromCSV();
	} else {
		console.log("CSV file name not provided");
		phantom.exit();
	}
})();

(function() {
	var fs = require('fs');
	var csvFileName = getCSVFileNameFromArgument();
	var categoryData = fiddleDataFileContent.ChildCategoryData;
	fs.makeDirectory(rootDirectoryName);
	url = fiddleDataFileContent.FiddlesData;
})();

page = require('webpage').create();
startRender = (function() {
	counter += 1;
	if(counter >= url.length) {
		var fs = require('fs');
		var fiddleDataFileContent = JSON.parse(fs.read("fiddleData_new.js"));
		fiddleDataFileContent.FiddlesData = newFiddleObjects;
		fs.write("NewFiddles.js", JSON.stringify(fiddleDataFileContent), 'w');
		phantom.exit();
	}
	
	if(counter>newFiddleObjects.length) {
		counter -= 1;
	}
	console.log("****** "+counter+" "+url[counter].fiddle_url+" *****");
	page.open(url[counter].fiddle_url, function(status) {
		if(status=='success') {
			createLocalFiles();
		} else {
			console.log("piklu");
		}
	});	
});
var createLocalFiles = (function() {console.log("****** "+counter+" *****");
	
    if(1) {
        if(page.injectJs('jquery.js')) {
             var fs = require('fs');
             var value = page.evaluate(function() {
				    var html = $('#id_code_html').text();
				    var js   = $('#id_code_js').text();
				
				    var css  = $('#id_code_css').text();
				    var resources = [];
				    $("a.filename").each(function() {
				    	resources.push($(this).attr('href'));
				    });	
				    var options = {};
				    options.description = $('#id_description').text();
				    options.title = $("#id_title").val();
				    return {html:html, js:js, css:css, resources:resources, options:options};
				
			});
            var fiddleId = url[counter].fiddle_id;
            var categoryIdArray = [];
            var fiddleDataFileContent = JSON.parse(fs.read("fiddleData_new.js"));
			//var categoryData = fiddleDataFileContent.ChildCategoryData;
			for(var index in fiddleDataFileContent.FiddleToCategory) {
				if(fiddleDataFileContent.FiddleToCategory[index].fiddle_id == fiddleId) {
					categoryIdArray.push(fiddleDataFileContent.FiddleToCategory[index].category_id);
				}
			}
			var categoryNameArray = [];
			for(var index in categoryIdArray) {
				var catName = "";
				var visName = "";
				for(var index2 in fiddleDataFileContent.ChildCategoryData) {
					if(fiddleDataFileContent.ChildCategoryData[index2].cat_id == categoryIdArray[index]) {
						catName = (fiddleDataFileContent.ChildCategoryData[index2].cat_name).split(" ").join("-").split("/").join("-").split("%").join("-").split(",").join("-");
						visName = fiddleDataFileContent.ChildCategoryData[index2].visualization_type.split(",")[0];
						break;
					}
				}
				categoryNameArray.push({
					cat_name : catName,
					vis_name : visName
				});
			}
			for(var index in categoryNameArray) {
				if(categoryNameArray[index].cat_name!="Chart" && categoryNameArray[index].cat_name!="Gauge" && categoryNameArray[index].cat_name!="Map") {
					var rootFolderName = categoryNameArray[index].vis_name + "/"+categoryNameArray[index].cat_name;
					var folderName = rootDirectoryName+"/"+rootFolderName + "/" + url[counter].fiddle_description.split(" ").join("-").split("/").join("-").split("%").join("-").split(",").join("-");
					// if(!fs.exists(folderName)) {
					// 	fs.makeDirectory(folderName);
					// } else {
						folderName+="_"+counter;
						fs.makeDirectory(folderName);
					// }
					fs.write(folderName + "/" + "demo.html", value.html, 'w'); 
					fs.write(folderName + "/" + "demo.css", value.css, 'w'); 
					fs.write(folderName + "/" + "demo.js", '$(window).load(function(){'+value.js+'});', 'w'); 
					var fiddleNewLink = "http://jsfiddle.net/gh/get/jquery/1.9.1/"+githubUserId+"/"+githubRepoId+"/tree/master/"+folderName+"/"; 
					fs.write(folderName + "/" + "url.js", url[counter].fiddle_url+'\n'+fiddleNewLink, 'w');  
					var detailsContent = "---\nname: "+value.options.title+"\ndescription: "+value.options.description+"\nresources: \n";
					for(var index in value.resources) {
						detailsContent += '  - '+value.resources[index]+'\n';
					}
					detailsContent += '...';
					fs.write(folderName+"/"+"demo.details", detailsContent, 'w');  	
					var newFiddleObject = {fiddle_id:counter,fiddle_prev_link:url[counter].fiddle_url, fiddle_new_link:fiddleNewLink};
					newFiddleObjects.push(newFiddleObject);				
				}
			}
			console.log("****file write done****");
            
			
        }
    }
    

});


setInterval(function(){
	startRender();	
},60000);
