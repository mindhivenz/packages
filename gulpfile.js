const gulp = require('gulp')
const del = require('del')
const print = require('gulp-print')
const babel = require('gulp-babel')
const path = require('path')
const fs = require('fs')
const Q = require('q')
const glob = require('glob')

const packagesPath = 'packages'
const srcPattern = '/src/**/*+(js|jsx)'
const destPath = '/build'

function getSubFolders(dir) {
  return fs
  .readdirSync(dir)
  .filter(file => fs.statSync(path.join(dir, file)).isDirectory())
}

const babelTransform = babel({
  presets: ['env', 'react'],
  plugins: [
    'transform-runtime',
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties',
  ],
})

const packageFolders = getSubFolders(packagesPath)

gulp.task('build:packages', (done) => {
  packageFolders.map(packageFolder =>
    gulp.src(path.join(packagesPath, packageFolder, srcPattern))
    .pipe(babelTransform)
    .pipe(gulp.dest(path.join(packagesPath, packageFolder, destPath)))
  )
  done()
})

gulp.task('testing', () => {
  const promises = []

  glob.sync('/js/features/*').forEach(function(filePath) {
    if (fs.statSync(filePath).isDirectory()) {
      const defer = Q.defer()
      const pipeline = gulp.src(filePath + '/**/*.js')
      .pipe(uglify())
      .pipe(concat(path.basename(filePath) + '.min.js'))
      .pipe(gulp.dest(filePath))
      pipeline.on('end', function() {
        defer.resolve()
      })
      promises.push(defer.promise)
    }
  })

  return Q.all(promises)
})

function defaultTask(done) {
  // place code for your default task here
  // done()
}


gulp.task('clean:node', (done) => {
  del([
    'node_modules',
    'packages/*/node_modules',
  ], { dryRun: true })
  done()
})

gulp.task('clean:build', (done) => {
  del([
    'packages/*/build',
  ])
  done()
})

gulp.task('clean:all',
  gulp.parallel('clean:node', 'clean:build')
)

gulp.task('build', (done) => {
  gulp.src([
    'packages/*/src/**/*+(js|jsx)',
  ])
  .pipe(print())
  .pipe(babel({
    presets: ['env', 'react'],
    plugins: [
      'transform-runtime',
      'transform-object-rest-spread',
      'transform-decorators-legacy',
      'transform-class-properties',
    ],
  }))
  .pipe(gulp.dest('xxx'))
  done()
})


gulp.task('default', defaultTask)

