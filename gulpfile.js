// gulpfile.js 
var gulp = require('gulp'),
  bundle = require('gulp-bundle-assets');
 
gulp.task('bundle', function() {
  return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('./app/assets/'));
});