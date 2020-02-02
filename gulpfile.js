const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const clean = require('gulp-clean')
// const concat = require('gulp-concat')
// const uglify = require('gulp-uglify')
const nodemon = require('gulp-nodemon')
const rename = require('gulp-rename')
const browserSync = require('browser-sync')
const ifEnv = require('gulp-if-env')
// const notify = require('gulp-notify')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
// https://getinstance.info/articles/tools/9-gulp-plugins/
// https://github.com/gimm/gulp-live-server
// https://alferov.github.io/awesome-gulp/

// https://gist.github.com/renarsvilnis/ab8581049a3efe4d03d8
// todo https://github.com/gulp-community/gulp-cached
// todo https://www.npmjs.com/package/gulp-uglify
// todo https://www.npmjs.com/package/browserify
// todo https://www.npmjs.com/package/gulp-size
// todo https://github.com/hughsk/gulp-duration

const paths = {
  srcCSS: 'src/stylesheets/**/*.css',
  srcJS: 'src/scripts/**/*.js',
  srcSASS: 'src/stylesheets/sass/*.sass',
  srcImages: 'src/**/*.{gif,jpg,png,svg,ico}',
  distCSS: './public/',
  dist: './public/',
  distSASS: './public/css/',
  distJS: './public/scripts/',
}

gulp.task('clean', () => {
  return gulp.src(paths.dist + '*', { read: false })
    .pipe(clean())
})

gulp.task('nodemon', cb => {
  let called = false
  return nodemon({
    script: './app',
    ext: 'js .njk',
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'public/',
    ],
  })
    .on('start', () => {
      if (!called) {
        called = true
        setTimeout(() => {
          cb()
        }, 400)
      }
    })
    .on('restart', () => {
      console.log('restarted!')
      browserSync.reload()
    })
})
// the old one, idk why some guides tell me to run brwoserSync like this
// gulp.task('browser-sync', gulp.series('nodemon', (cb) => {
//   browserSync({
//     proxy: 'http://localhost:3000',
//     files: ['public/**/*.*'],
//     port: 5000,
//     notify: true,
//   }, cb)
// }))
gulp.task('browser-sync', (cb) => {
  browserSync({
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    port: 5000,
    notify: true,
  }, cb)
})

gulp.task('sass', () => {
  return gulp.src(paths.srcSASS)
    .pipe(ifEnv('dev', sourcemaps.init()))
    .pipe(sass({
      // style: 'expanded',
      style: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(gulp.dest(paths.distSASS))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    // .pipe(livereload(server))
    .pipe(ifEnv('dev', sourcemaps.init()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.distSASS))
    // .pipe(notify({ message: 'Sass task complete' }))
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
gulp.task('watch', () => {
  gulp.watch(paths.srcSASS, gulp.series('sass'))
  gulp.watch(paths.srcImages, gulp.series('cp-images'))
  gulp.watch(paths.srcCSS, gulp.series('cp-css'))
  gulp.watch(paths.srcJS, gulp.series('cp-js'))
})

gulp.task('set-dev-node-env', (cb) => {
  // process.env.NODE_ENV = 'dev'
  ifEnv.set('dev')
  cb()
})
gulp.task('set-prod-node-env', (cb) => {
  // process.env.NODE_ENV = 'prod'
  ifEnv.set('prod')
  cb()
})

gulp.task('cp-all', gulp.parallel('cp-js', 'cp-css', 'cp-images', 'sass'))
// gulp.task('dev', gulp.series('set-dev-node-env', gulp.parallel('cp-all', 'browser-sync', 'watch')))
gulp.task('dev', gulp.series('set-dev-node-env', 'nodemon', 'browser-sync', gulp.parallel('cp-all', 'watch')))
gulp.task('prod', gulp.series('clean', 'set-prod-node-env', gulp.parallel('cp-all')))
gulp.task('default', gulp.series('dev'))
