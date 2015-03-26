// Gulp Configuration Script
// 
// Author: Nabil Cheikh <ncheikh@gmail.com>

// Requirements
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload')
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

// Set Production
var production = process.env.NODE_ENV === 'production';

// Bundles all scripts 
function scripts(watch) { 
	var bundler, rebundle;
	
	bundler = browserify('./src/index.js', {

		basedir: __dirname,
		debug: !production,
		cache: {}, // required for watchify
		packageCache: {}, // required for watchify
		fullPaths: watch // required to be true only for watchify
	});
	
	if(watch) {
		bundler = watchify(bundler)
			.on('update', function(){
      		rebundle();
    	});
	}
 
	bundler.transform(reactify);
 
	rebundle = function() {
		
		var stream = bundler.bundle();
		stream = stream.pipe(source('bundle.js'));
		return stream.pipe(gulp.dest('../js/'));
	};
 
	bundler.on('update', rebundle);

	return rebundle();
}

// Bundles Shell
function shell(watch) { 
	var bundler, rebundle;
	
	bundler = browserify('./shell/shell.pkg', {

		basedir: __dirname,
		debug: !production,
		cache: {}, // required for watchify
		packageCache: {}, // required for watchify
		fullPaths: watch // required to be true only for watchify
	});
	
	if(watch) {
		bundler = watchify(bundler)
			.on('update', function(){
      		rebundle();
    	});
	}
 
	bundler.transform(reactify);
 
	rebundle = function() {
		
		var stream = bundler.bundle();
		stream = stream.pipe(source('shell.bundle.js'));
		return stream.pipe(gulp.dest('../static/js/build'));
	};
 
	bundler.on('update', rebundle);

	return rebundle();
}

// Gulp Tasks
gulp.task('scripts', function() {
	// Runs scripts once
	return scripts(false);
});
 
gulp.task('watchScripts', function() {
	// Runs scripts and watches for changes
	return scripts(true);
});

// Gulp Tasks
gulp.task('shell', function() {
	// Runs scripts once
	return shell(false);
});
 
gulp.task('watch_shell', function() {
	// Runs scripts and watches for changes
	return shell(true);
});

gulp.task('compress', function() {
	// Compresses and uglifies
  	gulp.src('../js/bundle.js')
  		.pipe(uglify({compress: true, mangle: true}))
    	.pipe(gulp.dest('../js/prod/'))
});