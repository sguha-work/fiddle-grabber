# fiddle-grabber
	This is a console program to crawl JSFiddles

## Dependencies
This package got only two dependencies of "phantomjs" and "fs".

## Usage Guide
### Installing

The installation is just a command

```
 npm install fiddle-grabber
```

After installing the package you have to use it as follows. See the next sections.

### How to run
```	
phantomjs node_modules/fiddle-grabber.js <csv-file-name>.csv
```
The output of above command will be something like this
```
			node_modules
			|_fiddles
			  |_<website>
			  	|_<website>.html
			  	|_files
			  	  |_demo.html
			  	  |_demo.js
			  	  |_demo.css
			  	  |_demo.details
			  	  |_url.txt
```			  	  
#### Description of the created files and folders
```
fiddles - The root folder holding all the sub folders
<website> - top most folder of each link crawled
<website>.html - A complete ready to run html file holding all of the coding,If ajax call is there then may not work if not executed from any host
files - This folder holds the piece of files
demo.html - The html script of the fiddle
demo.js - The javascript coding of the fiddle
demo.css - The styles of the fiddle
demo.details - Holds title, description, external resources of the fiddle
url.txt - The URL of the fiddle
```
### Preparing the csv file holding the jsfiddle.net links
	
	A sample csv data is here
```
url,title
http://jsfiddle.net/abcd/wxyz/1/,
http://jsfiddle.net/vbfg/qwqs/2/,
http://jsfiddle.net/zxcd/kjlg/1/,
```	
 Mind that the first row should always hold "url" on first coloumn and "title" on second coloumn.
 From 2nd row the URL field is mandatory you may provide the title or not. This title will be used as the folder name holding the crawled files inside "fiddles" folder. If title not provided then "untitled<indec>"
 will be the folder name. If the URL doesnot contain a valid link then the url will be ignored.


##If any issue found feel free to drop a mail at sguha1988.life@gmail.com

