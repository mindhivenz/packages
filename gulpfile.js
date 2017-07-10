const gulp = require('gulp')
const del = require('del')
const print = require('gulp-print')
const babel = require('gulp-babel')
const path = require('path')
const fs = require('fs')
const forEach = require('gulp-foreach')

const packagesPath = 'packages'
const srcPattern = '/src/**/*+(js|jsx)'
const destPath = '/build'

function getSubFolders(dir) {
  return fs
  .readdirSync(dir)
  .filter(file => fs.statSync(path.join(dir, file)).isDirectory())
}
const packageFolders = getSubFolders(packagesPath)

const babelTransform = babel({
  presets: ['env', 'react'],
  plugins: [
    'transform-runtime',
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties',
  ],
})

const dest = {
  on: (e, data) => {
    console.log(e, data)
    if (e === 'end') {
      return () => { console.log('END!!!') }
    }
    return () => {}
  },
  once: (data) => {
    console.log('once', data)
  },
  emit: (data) => {
    console.log('emit', data)
  },
  write: (data) => {
    console.log('write')
  },
}
packageFolders.forEach((packageFolder) => {

  gulp.task(`build-${packageFolder}`, () =>
    // gulp.src(path.join(packagesPath, packageFolder, srcPattern))
    gulp.src(path.join(packagesPath, packageFolder, srcPattern), {passthrough: true})
      .pipe(babelTransform)
      .pipe(
        gulp.dest(path.join(packagesPath, packageFolder, destPath)
      ))
  )

})


// gulp.task('build:packages', (done) => {
//   packageFolders.forEach(packageFolder =>
//     gulp.src(path.join(packagesPath, packageFolder, srcPattern))
//     .pipe(print())
//     .pipe(babelTransform)
//     .pipe(gulp.dest(path.join(packagesPath, packageFolder, destPath)))
//     .pipe(print())
//   )
//   done()
// })

// packageFolders.forEach((packageFolder) => {
//
//   gulp.task(`build:package:${packageFolder}`, () =>
//     gulp.src(path.join(packagesPath, packageFolder, srcPattern))
//     .pipe(babelTransform)
//     .pipe(gulp.dest(path.join(packagesPath, packageFolder, destPath)))
//   )
//
// })
//
// gulp.task('build:packages:test',
//   gulp.series(packageFolders.map(packageFolder => `build:package:${packageFolder}`))
// )
// const buildPackage = packageFolder =>
//   gulp.src(path.join(packagesPath, packageFolder, srcPattern))
//   .pipe(babelTransform)
//   .pipe(gulp.dest(path.join(packagesPath, packageFolder, destPath)))
//
// gulp.task('build:packages', (done) => {
//   gulp.src(packagesPath)
//   .pipe(
//     forEach((stream, file) => stream
//     .pipe(buildPackage(file.name))
//   ))
// })

function defaultTask(done) {
  // place code for your default task here
  // done()
}


gulp.task('clean:node', () =>
  del([
    'node_modules',
    'packages/*/node_modules',
  ], { dryRun: true })
)

gulp.task('clean:build', () =>
  del([
    'packages/*/build',
  ])
)

gulp.task('clean:all',
  gulp.parallel('clean:node', 'clean:build')
)

gulp.task('build-packages',
  gulp.series(
    gulp.parallel(
        packageFolders.map(packageFolder =>
          `build-${packageFolder}`
        )
    )
  )
)

gulp.task('build',
  gulp.series(
    'clean:build',
    'build-packages'
  )
)


gulp.task('default', defaultTask)

