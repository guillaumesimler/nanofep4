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


How to install
----
The best way is to [clone the github repository](https://github.com/guillaumesimler/nanofep4.git)

How to use
----
Please use 
* **dir**/index.html to have a look at the webpage optimization
* **dir**/view/pizza.html to see the webapp optimization

Repo folder structure
----
You will find the following structure on the repository
* **"src"** will contain the development directory
* **"dir"** will contain the productive directory
* **"PageInsight ..."*** contains the screenshots of the PageInsight measurements

Optimization done on dir/view/js/main
----

###### **Generic changes**

* replaced _document.querySelector("#id")_ by the faster [API _document.getElementById("id")_](https://jsperf.com/getelementbyid-vs-queryselector/11)

Example: Replacing
```javascript
	document.querySelector("#movingPizzas1").appendChild(elem);
```

by

```javascript
	document.getElementById("movingPizzas1").appendChild(elem);
```

* replaced _document.querySelectorall(".class")_ by the faster [document.getElementsByClassName("class")_](hhttps://jsperf.com/getelementsbyclassname-vs-queryselectorall/25)

Example: Replacing
```javascript
	var items = document.querySelectorAll('.mover');
```
by

```javascript
	var items = document.getElementsByClassName('mover');
```

* pulled the _variable declaration out of the loops_ to avoid repetitive variable creation, especially if it is linked with a DOM Selection 

Example: Replacing
```javascript
 	for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
		document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
	}
```
by
```javascript
	var randomPizzas = document.querySelectorAll(".randomPizzaContainer");
 
 	for (var i = 0; i < randomPizzas.length; i++) {
	    randomPizzas[i].style.width = newwidth +'%';
	}
```

###### **Specific changes**

* "_Slimfast the pizzas_" -->  work on _document.addEventListener('DOMContentLoaded, ...)_

The number of pizzas can be calculate "dynamically" instead of using the fix value of 200. In case of the window size of 1500 px, you'd need 48 pizzas (-76%)
```javascript
for (var i = 0; i < 200; i++)
```
vs 
```javascript
var nbPizza = Math.ceil((window.innerHeight / s )) * cols;
for (var i = 0; i < nbPizza; i++) 
```

Moreover by changing the picture to a pizza-73-png (73x100px), you can save 39px (from 49px) and probably more if you reduce quality (still at 100%)
```javascript
	elem.src = "images/pizza.png";
```
vs 
```javascript
	elem.src = "images/pizza-73.png";
```
With thess two steps **you can reduce the weight of pizzas by ~95%**

* add requestframeAnimation

Make sure frames are fired in transforming 
```javascript
window.addEventListener('scroll', updatePositions);
```
in
```javascript
window.addEventListener('scroll', function () {
 	window.requestAnimationFrame(updatePositions)
});
```
and 

```javascript
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
      document.querySelector("#movingPizzas1").appendChild(elem);
    }
	updatePositions();
	window.requestAnimationFrame(updatePositions);
  });
```
in

```javascript
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
      document.querySelector("#movingPizzas1").appendChild(elem);
    }
    window.requestAnimationFrame(updatePositions);
  });
```


* Improve pizza resizing (Sliding)

Replace the heavy version (with additonal function dermineDx())
```javascript
function changePizzaSizes(size) {
	for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
		var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
		var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
		document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
	}
}
```
by
```javascript
function changePizzaSizes(size) {
    var newwidth = 100 / (5-size);
    var randomPizzas = document.getElementsByClassName("randomPizzaContainer");

    for (var i = 0; i < randomPizzas.length; i++) {
    	randomPizzas[i].style.width = newwidth +'%';
    }
}
```
* Allow CSS.3 accelaration

Add _will-change_ and _transform: translateZ(0)_ as well as _backface-visibility:hidden_ and extending the webkits by using [this website](http://autoprefixer.github.io/)
```css
.mover {
  position: fixed;
  width: 256px;
  z-index: -1;
  will-change: transform;
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;

}

.randomPizzaContainer {
  float: left;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
```



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