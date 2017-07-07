const gulp = require('gulp')
const del = require('del')
const print = require('gulp-print')
const babel = require('gulp-babel')
const path = require('path')
const fs = require('fs')

const packagesPath = 'packages'
const srcPath = '/src/**/*+(js|jsx)'
const destPath = '/build'

function getFolders(dir) {
  return fs
  .readdirSync(dir)
  .filter(file => fs.statSync(path.join(dir, file)).isDirectory())
}

gulp.task('build:packages', (done) => {
  const folders = getFolders(packagesPath)

  folders.map(folder =>
    gulp.src(path.join(packagesPath, folder, srcPath))
    .pipe(babel({
      presets: ['env', 'react'],
      plugins: [
        'transform-runtime',
        'transform-object-rest-spread',
        'transform-decorators-legacy',
        'transform-class-properties',
      ],
    }))
    .pipe(gulp.dest(path.join(packagesPath, folder, destPath)))
  )
  done()
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

