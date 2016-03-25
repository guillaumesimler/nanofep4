## Website Performance Optimization portfolio project

Authors
----

##### of game engine & origin file

The udacity team, under the lead of Cameron Pittman, especially the [Github contribution team](https://github.com/udacity/frontend-nanodegree-mobile-portfolio/graphs/contributors)


##### of current version
Guillaume Simler, a Udacity Frontend Nanodegree, more information and contact details on my [Github profile](https://github.com/guillaumesimler)

Aim of the project
----
##### Current version

The aim of this project is to train the Website Performance Optimization, the 4th project of the Udacity Front End Dev Nanodegree

##### Initial description

Your **challenge**, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

The original README can be found [here](https://github.com/udacity/frontend-nanodegree-mobile-portfolio/blob/master/README.md)


Latest Updates (more details on [Github](https://github.com/guillaumesimler/nanofep4/commits/master))
----
2016 03 21: Optimize main page

Repo folder structure
----
You will find the following structure on the repository
* **"src"** will contain the development directory
* **"dir"** will contain the productive directory
* **"PageInsight ..."*** contains the screenshots of the PageInsight measurements


Use of grunt
----
Grunt was widely used in this project. A complete readme of my generic Gruntfiles can be read on its [own Github repository](https://github.com/guillaumesimler/gruntmaster)

###### Used modules
	
**A word of caution: order of use**
You need to run the point (1) first, the point (6) last. The points (2)-(5) can be run in any order.


###### **Make Directory & Clean**

_Used modules_ 
* grunt-contrib-clean
* grunt-mkdir

_Aim:_ clean some folders (if existing) and create the productive folders ('/dir/*') the other packages won't but need 

```JSON
clean: {
 	dev: {
      src: ['dir/images'],
 	}
},

mkdir: {
	all: {
		options: {
		create: ['dir/js', 'dir/css', 'dir/images']
		}
	}
}
```

###### **Minify the javascripts**

_Used module_ 
* grunt-contrib-uglify

_Aim:_ Minify the source javascript (src/js/*) into new files in the productive system (dir/js/*) 

```JSON
uglify: {
	my_target: {
		files: [{
			expand: true,
				cwd: 'src/js/',
				src: '**/*.js',
				dest: 'dir/js/'
		}]
	}
},
````

###### **Minify the CSS**

_Used module_ 
* grunt-contrib-cssmin

_Aim:_ Minify the source css (src/css/*) into new files in the productive system (dir/css/*) 

```JSON
cssmin: {
	target: {
		files: [{
			expand: true,
			cwd: 'src/css/',
			src: ['*.css', '!*.min.css'],
			dest: 'dir/css/',
			ext: '.css'
		}]
	}
},
```

###### **Compress the images**

_Used module_ 
* grunt-contrib-imagemin

_Aim:_ Compress the source images (src/images/*) into new files in the productive system (dir/images/*) 

```JSON
imagemin: {
	dynamic: {
		files: [{
			expand: true,
			cwd: 'src/images/',
			src: ['**/*.{png,jpg,gif,JPG,GIF,PNG}'],
			dest: 'dir/images/'
		}]
	}
},
```

###### **Inline CSS and JS**

!!!_Important:_ The productive HTML file could need editing!!!

_Used module_ 
* grunt-inline-css

_Aim:_  Inline the CSS and JS into HTML

```JSON
inlinecss: {
	main: {
		options: {
		},
	files: {
		'dir/index.html': 'src/index.html'
		}
	}
},
```

###### **Minify HTML**

!!!_Important:_ Needs to run last !!!

_Used module_ 
* grunt-contrib-htmlmin

_Aim:_ Compress the images from the (src/images/*) into new files in the productive system (dir/images/*) 


```JSON
htmlmin: {
	dist: {
		options: {
			removeComments: true,
			collapseWhitespace: true
		},
	files: {
		'dir/index.html': 'dir/index.html' 
		}
	}
}, 
```


Known bugs, improvements and major changes
----
The known bugs are published [here](https://github.com/guillaumesimler/nanofep4/issues). Should you find a unknown bug, please be so kind to update the issue. 

The improvements and major changes will be discussed on the [Github wiki](#)


Used repository 
----
* the [forked project](https://github.com/udacity/frontend-nanodegree-mobile-portfolio) (_git remote **origin**_)
* the [working project](https://github.com/guillaumesimler/nanofep4) (_git remote **github**_)


License
----
The **original file** had no license at the time of the forking (2016-02-16 11:11 CET), please check the [github page](https://github.com/udacity/frontend-nanodegree-arcade-game) for any changes

The **current version** follows the [_MIT License_](https://github.com/guillaumesimler/nanofep4/blob/master/LICENSE.txt) 