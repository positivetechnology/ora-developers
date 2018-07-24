// include gulp
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const util = require('gulp-util');
const fs = require('fs');
const path = require('path');

// include plug-ins
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const babel = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');

//Environment
const isDev = !util.env.build;

//Bundler for ES6
let bundler = null;

// sass task
gulp.task('sass', () => {

	gulp.src('./sass/*.scss')
		.pipe(gulpIf(isDev, sourcemaps.init()))
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths : ['./sass']
		}).on('error', sass.logError))
		.pipe(autoprefixer({remove: false, browsers: ["last 100 versions"]}))
		.pipe(gulpIf(isDev, sourcemaps.write('./sourcemaps')))
		.pipe(gulp.dest('./sass'));

});

// javascript lint task
gulp.task('lint', () => {
	return gulp.src(['./js/dev/**/*.js','!./js/dev/vendor/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// javascript task
gulp.task('javascript', ['lint'], () => {

	let scriptsPath = './js/dev';
	let scriptDest = './js/mini';
  //Create bundle
  if (bundler === null) {
    bundler = browserify(path.join(scriptsPath, 'main.js'), {debug: isDev}).transform(babel);
  }

	let vendor = gulp.src(path.join(scriptsPath, 'vendor', '/**/*.js'))
              			.pipe(gulpIf(isDev, sourcemaps.init()))
              			.pipe(concat('vendor.js'))
              			.pipe(gulp.dest(scriptDest))
              			.pipe(uglify())
              			.pipe(rename('vendor.min.js'))
              			.pipe(gulpIf(isDev, sourcemaps.write('./sourcemaps')))
              			.pipe(gulp.dest(scriptDest));

  let app = bundler.bundle()
                    .on('error', (err) => {
                      console.error(err);
                      this.emit('end');
                    })
                    .pipe(source('main.js'))
                    .pipe(gulp.dest(scriptDest))
                    .pipe(buffer())
                    .pipe(gulpIf(isDev, sourcemaps.init({loadMaps: true})))
                    .pipe(uglify())
                    .pipe(rename('main.min.js'))
                    .pipe(gulpIf(isDev, sourcemaps.write('./sourcemaps')))
                    .pipe(gulp.dest(scriptDest));

	return merge(vendor, app);

});

// reload task
gulp.task('reload', () => {

	browserSync.reload();

});

// watch task
gulp.task('watch', () => {

	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./js/dev/**/*.js', ['javascript']);
	gulp.watch(['./sass/**/*.css', './js/mini/**/*.js'], ['reload']);

});

// browsersync task
gulp.task('browser-sync', () => {

	browserSync({
		port: 7001,
		proxy: {
            target: "127.0.0.1:8182"
        },
		notify: false,
		open: false,
		ui: {
			port: 7002
		}
	});

});

// build task
gulp.task('build', ['sass', 'javascript'], () => {

	gulp.src(['./sass/*.css', '!./node_modules/**/*']).pipe(gulp.dest('./build/sass'));
	gulp.src(['./js/mini/*.min.js', '!./node_modules/**/*']).pipe(gulp.dest('./build/js/mini'));
	gulp.src(['./**/*.php', '!./node_modules/**/*', '!./build/**/*']).pipe(gulp.dest('./build'));
	gulp.src(['./fonts/**/*', '!./node_modules/**/*', '!./build/**/*']).pipe(gulp.dest('./build/fonts'));
	gulp.src(['./**/*.jpg', './**/*.jpeg', './**/*.png', './**/*.ico', './**/*.svg', '!./node_modules/**/*', '!./build/**/*']).pipe(gulp.dest('./build'));

});

// default task
gulp.task('default', ['sass', 'javascript', 'watch', 'browser-sync']);
