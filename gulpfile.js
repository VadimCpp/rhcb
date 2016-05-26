var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');

gulp.task('copy-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sprite', function() {
  var spriteData =
    gulp.src('./src/img/materials/*.png')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
      }));

  spriteData.img.pipe(gulp.dest('./dist/img/')); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest('./dist/css/')); // путь, куда сохраняем стили
});

gulp.task('build', [ 'copy-html', 'compile-sass' ]);

gulp.task('default', [ 'build' ]);
