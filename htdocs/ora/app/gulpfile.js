// include gulp
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var util = require('gulp-util');
var fs = require('fs');
var path = require('path');

// include plug-ins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var sourcemapsPath = '../../public/sourcemaps';

//Environment
var isDev = !util.env.build;

// function to get directories in a directory
function getDirs(dir) {
	return fs.readdirSync(dir)
		.filter(function(file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
}

// sass task
gulp.task('sass', function() {

	gulp.src('./sass/*.scss')
		.pipe(gulpIf(isDev, sourcemaps.init()))
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths : ['./sass']
		}).on('error', sass.logError))
		.pipe(autoprefixer({remove: false, browsers: ["last 100 versions"]}))
		.pipe(gulpIf(isDev, sourcemaps.write('../../public/sourcemaps')))
		.pipe(gulp.dest('../public/css'));

});

// javascript lint task
gulp.task('lint', function(){
	return gulp.src(['./js/dev/**/*.js','!./js/dev/vendor/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// javascript task
gulp.task('javascript', ['lint'], function(){

	var scriptsPath = './js/dev';
	var scriptDest = '../public/javascript';
	var dirs = getDirs(scriptsPath);

	var tasks = dirs.map(function(folder) {

		return gulp.src(path.join(scriptsPath, folder, '/**/*.js'))
			.pipe(gulpIf(isDev, sourcemaps.init()))
			.pipe(concat(folder + '.js'))
			.pipe(gulp.dest(scriptDest))
			.pipe(uglify())
			.pipe(rename(folder + '.min.js'))
			.pipe(gulpIf(isDev, sourcemaps.write(sourcemapsPath)))
			.pipe(gulp.dest(scriptDest));

	});

	var root = gulp.src(path.join(scriptsPath, '/*.js'))
		.pipe(gulpIf(isDev, sourcemaps.init()))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(scriptDest))
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulpIf(isDev, sourcemaps.write()))
		.pipe(gulp.dest(scriptDest));

	return merge(tasks, root);

});

// reload task
gulp.task('reload', function() {

	browserSync.reload();

});

// watch task
gulp.task('watch', function() {

	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch(['./js/dev/**/*.js'], ['javascript']);
	gulp.watch(['../public/css/*.css', '../public/javascript/**/*.js'], ['reload']);

});

// browsersync task
gulp.task('browser-sync', function() {

	browserSync({
		port: 7001,
		server: "../public",
		// proxy: {
  //           target: "127.0.0.1:8182"
  //       },
		notify: false,
		open: false,
		ui: {
			port: 7002
		}
	});

});

// build task
gulp.task('build', ['sass', 'javascript'], function() {

	gulp.src(['./sass/*.css', '!./node_modules/**/*']).pipe(gulp.dest('../public/css'));
	gulp.src(['./js/mini/*.min.js', '!./node_modules/**/*']).pipe(gulp.dest('../public/javascript/mini'));
	//gulp.src(['./**/*.php', '!./node_modules/**/*', '!./build/**/*']).pipe(gulp.dest('./build'));
	gulp.src(['./fonts/**/*', '!./node_modules/**/*', '!./build/**/*']).pipe(gulp.dest('../public/fonts'));
	gulp.src(['./**/*.jpg', './**/*.jpeg', './**/*.png', './**/*.ico', './**/*.svg', '!./node_modules/**/*', '!./build/**/*']).pipe(gulp.dest('../public'));

});

// default task
gulp.task('default', ['sass', 'javascript', 'watch', 'browser-sync']);
