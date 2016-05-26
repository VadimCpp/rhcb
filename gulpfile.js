var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('copy-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', [ 'copy-html', 'compile-sass' ]);

gulp.task('default', [ 'build' ]);
