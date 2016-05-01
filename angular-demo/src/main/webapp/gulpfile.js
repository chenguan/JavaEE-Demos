/**
 * Created by halapro on 2016/4/4.
 */
var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify');

gulp.task('minify', function() {
    return gulp.src('js/src/minimal/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});