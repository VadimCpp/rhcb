var gulp = require('gulp');

gulp.task('copy-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [ 'copy-html' ]);

gulp.task('default', [ 'build' ]);
