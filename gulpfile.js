const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const clean = require('gulp-clean')
// const concat = require('gulp-concat')
// const uglify = require('gulp-uglify')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
// https://getinstance.info/articles/tools/9-gulp-plugins/
// https://github.com/gimm/gulp-live-server

const paths = {
  srcCSS: 'src/stylesheets/**/*.css',
  srcJS: 'src/scripts/**/*.js',
  srcSASS: 'src/stylesheets/sass/*.sass',
  srcImages: 'src/**/*.{gif,jpg,png,svg,ico}',
  distCSS: './public/',
  dist: './public',
  distSASS: './public/css/',
  distJS: './public/scripts/'
}

// examples!!!
// gulp.task('vendor', function() {
//   return gulp.src('vendor/*.js')
//     .pipe(concat('vendor.js'))
//     .pipe(gulp.dest('build/vendor.js'))
// });
gulp.task('clean', () => {
  return gulp.src(paths.dist, { read: false })
    .pipe(clean())
})
gulp.task('nodemon', cb => {
  let started = false
  return nodemon({
    script: './bin/www',
    ext: 'js njk'
  }).on('start', () => {
    if (!started) {
      cb()
      started = true
    }
  })
})
gulp.task('browser-sync', gulp.series('nodemon', () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    port: 5000
  })
})
)
gulp.task('sass', () => {
  return gulp.src(paths.srcSASS)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.distSASS))
})

gulp.task('watch', () => {
  gulp.watch(paths.srcSASS, gulp.series('sass'))
  gulp.watch(paths.srcImages, gulp.series('cp-images'))
  gulp.watch(paths.srcCSS, gulp.series('cp-css'))
  gulp.watch(paths.srcJS, gulp.series('cp-js'))
})
gulp.task('cp-css', () => {
  return gulp.src(paths.srcCSS)
    .pipe(gulp.dest(paths.dist))
})
gulp.task('cp-js', () => {
  return gulp.src(paths.srcJS)
    .pipe(gulp.dest(paths.distJS))
})
gulp.task('cp-images', () => {
  return gulp.src([paths.srcImages])
    .pipe(gulp.dest(paths.dist))
})

gulp.task('cp-all', gulp.parallel('cp-js', 'cp-css', 'cp-images'))

gulp.task('dev', gulp.parallel('cp-all', 'browser-sync', 'watch'))

if (process.env.NODE_ENV === 'prod') {
  // exports.build = series(
  //   clean,
  //   parallel(
  //     cssTranspile,
  //     series(jsTranspile, jsBundle)
  //   ),
  //   parallel(cssMinify, jsMinify),
  //   publish
  // )
} else {
  // exports.build = series(transpile, livereload)
}
