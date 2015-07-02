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

### The output

The output of above command will be something like this

```
			fiddles
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
<website>.html - A complete ready to run html file holding all of the coding,If Ajax call is there then may not work if not executed from any host
files - This folder holds the piece of files
demo.html - The html script of the fiddle
demo.js - The JavaScript coding of the fiddle
demo.css - The styles of the fiddle
demo.details - Holds title, description, external resources of the fiddle
url.txt - The URL of the fiddle
```
### Preparing the csv file holding the jsfiddle.net links
	
	A sample csv data is here
```
URL,title
Http://jsfiddle.net/abcd/wxyz/1/,
Http://jsfiddle.net/vbfg/qwqs/2/,
Http://jsfiddle.net/zxcd/kjlg/1/,
```	
 Mind that the first row should always hold "URL" on first column and "title" on second column.
 From 2nd row the URL field is mandatory you may provide the title or not. This title will be used as the folder name holding the crawled files inside "fiddles" folder. If title not provided then "untitled<index>"
 will be the folder name. If the URL doesn't contain a valid link then the URL will be ignored.

### Example
Following example is shown based on a sample csv file which holds above 3 sample fiddle links.
```
	phantomjs node_modules/fiddle-grabber.js test.csv	    
```
When the program is running you may see a screen like following which will show the progress
	![Image of Yaktocat](http://i.imgur.com/f9PzfJz.png)

The script takes 15-20 seconds to crawl every link. And here is the output.

```
			fiddles
			  |_untitled1
			  	|_untitled1.html
			  	|_files
			  	  |_demo.html
			  	  |_demo.js
			  	  |_demo.css
			  	  |_demo.details
			  	  |_url.txt
			  |_untitled2
			  	|_untitled2.html
			  	|_files
			  	  |_demo.html
			  	  |_demo.js
			  	  |_demo.css
			  	  |_demo.details
			  	  |_url.txt
			  :
			  :
			  :	  			  
			  	  
```
### Most prominent issue

```
 Still now the program can't crawl the libraries on which the jsfiddle is dependent.
 If you fiddle got dependencies on jquery for say then that info will not be crawled.
 The standalone HTML file also will not hold the library info. 
 If the libraries are added as external resources in the fiddle then that will be
 crawled.
```

##If any issue found feel free to drop a mail at sguha1988.life@gmail.com
