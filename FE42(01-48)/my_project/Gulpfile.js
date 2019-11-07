// JavaScript Document
'use strict'

const  gulp = require("gulp"),
		   less = require("gulp-less"),
		   browserSync = require('browser-sync'),
		   concat = require('gulp-concat'),
		   uglify = require('gulp-uglify'),
		   cssnano = require('gulp-cssnano'),
		   rename = require('gulp-rename'),
		   del = require('del'),
		   imagemin = require('gulp-imagemin'),
		   pngquant = require('imagemin-pngquant'),
		   cache = require('gulp-cache'),
		   autoprefixer = require('gulp-autoprefixer'),
		   spritesmith = require('gulp.spritesmith');


	
	
gulp.task('hello', gulp.series(function() {
    console.log('Привет');
}));

gulp.task('less', gulp.series(function() {
  return gulp.src('app/less/**/*.less')
    .pipe(less())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8' , 'ie 7'], {cascade:true}))
    .pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}));
}));

gulp.task('browser-sync', function(){
		browserSync({
			server:{
				baseDir:'app'
				},
			notify:false
			});
	});

gulp.task('scripts' , gulp.series(function(){
		return gulp.src([
		 'app/libs/jquery/dist/jquery.min.js',
		 'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
	}));
	
gulp.task('css-libs', gulp.series('less', function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css'));
	}));

gulp.task('img', gulp.series(function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            imterlaced: true,
            progressive: true,
            svgPlugin: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
}));
	

gulp.task('default', gulp.series('less','browser-sync', 'css-libs', 'scripts'));
	
gulp.task('watch', gulp.series('less','browser-sync', 'css-libs', 'scripts',  function(){
	gulp.watch('app/less/**/*.less', gulp.task('less'));
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	}));

/*gulp.task('clean', gulp.series(function(){
	return del.sync('dist');
	}));*/
	
	gulp.task('clear', gulp.series(function(){
		return cache.clearAll();
		}));
	
gulp.task('build', gulp.series('less', 'img', 'scripts', function(){
	var buildCss = gulp.src(['app/css/main.css' , 'app/css/libs.min.css'])
	.pipe(gulp.dest('dist/css'));
	
	var buildJs = gulp.src('app/js/**/*.js')
	.pipe(gulp.dest('dist/js'));
	
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
	}));
	
	/*
gulp.task('sprite', gulp.series(function(){
	var spriteData =
	gulp.src('app/img/sprite/*.png').pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css',
	}));
			return spriteData.pipe(gulp.dest('app/img/sprite'));
	}));
*/

