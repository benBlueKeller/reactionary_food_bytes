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

var jsGlob = 'src/js/*.{js,jsx}'

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

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run eslint before concatenating
gulp.task('concat', [/*'copy-react', 'copy-react-dom', */'eslint'], function() {
  return gulp.src(['vendor/react.js', 'vendor/react-dom.js', jsGlob])
    .pipe(sourcemaps.init())
    .pipe(babel({
      only: [
        'src/js',
      ],
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

gulp.task('default', []);