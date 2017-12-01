const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const uglify = require('gulp-uglifyes');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const minifyCss     = require('gulp-clean-css');
const pug           = require('gulp-pug');

const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const prod = gutil.env.env === 'prod' ? true : false;

const watchList = [
    './src/js/**/*', 
    './src/scss/**/*',
    './src/pug/**/*'
];
const taskList = [
    'javascript', 
    'styles',
    'template'
];

gulp.task('default', function() {
    gulp.watch(watchList, taskList);
});

gulp.task('javascript', () =>
    gulp.src('src/js/scripts.js')
        .pipe(webpack(webpackConfig))
        .pipe(rename('bundle.js'))
        .pipe(gulpIf(prod, uglify({
            mangle: true,
            ecma: 6
        })))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('styles', () =>
    gulp.src('./src/scss/main.scss')
        .pipe(gulpIf(prod, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpIf(prod,minifyCss()))
        .pipe(gulpIf(prod, sourcemaps.write('.')))
        /* .pipe(rename('styles.css')) */
        .pipe(gulp.dest('./dist/css'))

);

gulp.task('template', () =>
    gulp.src('./src/pug/**/*')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
);