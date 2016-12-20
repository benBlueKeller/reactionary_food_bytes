var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var node_modulesG = process.env.HOME + '/AppData/Roaming/npm/node_modules'
var jsGlob = 'src/js/*.{js,jsx}';
var jsFiles = ['src/js/app.jsx'];



// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsGlob)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function() {
  return gulp.src(node_modulesG + '/react/dist/react.js')
    .pipe(newer('vendor/react.js'))
    .pipe(gulp.dest('vendor'));
});
gulp.task('copy-react-dom', function() {
  return gulp.src(node_modulesG + '/react-dom/dist/react-dom.js')
    .pipe(newer('vendor/react-dom.js'))
    .pipe(gulp.dest('vendor'));
});

// Copy assets/js/vendor/* to assets/js
gulp.task('concat-js-vendor', ['copy-react', 'copy-react-dom'], function() {
  return gulp
    .src([
      'vendor/react.js',
      'vendor/react-dom.js'
    ])
    .pipe(concat('vendor-bundle.js'))
    .pipe(gulp.dest('public'));
});


// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run eslint before concatenating
gulp.task('concat', ['eslint'], function() {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel({
      compact: false
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'));
});

// Watch JS/JSX files
gulp.task('watch', function() {
  gulp.watch('assets/js/src/**/*.{js,jsx}', ['concat']);
  //gulp.watch('assets/sass/**/*.scss', ['sass']);
});

// BrowserSync
gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', ['concat-js-vendor', 'concat'])
gulp.task('default', []);