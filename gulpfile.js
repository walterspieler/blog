var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var $    = require('gulp-load-plugins')();
var watchify = require("watchify");
var gutil = require("gulp-util");
var wiredep = require('wiredep').stream;
var ts = require("gulp-typescript");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var tsProject = ts.createProject("tsconfig.json");

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['app/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('bower', function () {
  gulp.src('./index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('.'));
});

function bundle() {
  return watchedBrowserify
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest("dist"));
}

gulp.task("typescript", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("app"));
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['bower', 'sass'], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
