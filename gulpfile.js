var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var inline = require('gulp-inline-source');
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
});

gulp.task('copy-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-htaccess', function() {
  return gulp.src('src/.htaccess')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-background', function() {
  return gulp.src('src/img/background.jpg')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-favicon', function() {
  return gulp.src('src/favicon.ico')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', [ 'copy-html', 'copy-htaccess', 'copy-background', 'copy-favicon' ]);

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
        cssName: 'sprite.css'
      }));

  spriteData.img.pipe(gulp.dest('./dist/'));
  spriteData.css.pipe(gulp.dest('./dist/css/'));
});

gulp.task('inline-css', function() {
    return gulp.src('dist/index.html')
        .pipe(inline())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-sprite', function() {
    return gulp.src(['dist/sprite.png'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('del', function() {
    return del([
        'dist/**/*',
        'dist/.htaccess'
    ]);
});

gulp.task('del-css', function() {
    return del([
        'dist/css'
    ]);
});

gulp.task('minify-html', function() {
    return gulp.src('dist/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['build']);
    gulp.watch('src/scss/**/*', ['build']);
});

gulp.task('build', ['del', 'copy', 'sprite', 'compile-sass', 'inline-css']);

gulp.task('default', ['build', 'browserSync', 'watch']);
