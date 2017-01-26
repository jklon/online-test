// gulpfile.js 
var gulp = require('gulp'),
  bundle = require('gulp-bundle-assets');
var minify = require('gulp-minify');
 
gulp.task('bundle', function() {
  return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('./app/assets/'));
});

gulp.task('compress', function() {
  gulp.src('./app/assets/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./app/assets/'))
});