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

After installing the package you can use it from console as follows
```
 phantomjs node_modules/fiddle-grabber.js <csv-file-name>.csv
   
```
### How to run

	phantomjs node_modules/fiddle-grabber.js <csv-file-name>.csv

	The out put of above command will be something like this
	node_modules
	|_fiddles
	  |_<website1>
	  	|_<website>.html
	  	|_filse
	  	  |_demo.html
	  	  |_demo.js
	  	  |_demo.css
	  	  |_demo.details
	  	  |_url.txt


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

