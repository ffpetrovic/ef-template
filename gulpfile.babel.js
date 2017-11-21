const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gutil = require('gulp-util');
const rename = require('gulp-rename');

const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const uglify = require('gulp-uglify');

const prod = gutil.env.env === 'prod' ? true : false;

gulp.task('default', function() {
    gulp.watch(['./src/js/**/*'], ['javascript']);
});

gulp.task('javascript', () =>
    gulp.src('src/js/scripts.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulpIf(prod, uglify()))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('styles', () =>
    console.log('Test')
);