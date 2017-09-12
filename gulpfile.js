// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

// Compile Our Sass
gulp.task('sass-dist', function() {
    gulp.src('source/sass/todo.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cssnano())
            .pipe(gulp.dest('dist/css'));
});

gulp.task('sass-dev', function() {
    gulp.src('source/sass/todo.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename({suffix: '.dev'}))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts-dist', function() {
    gulp.src([
            'source/js/form-builder-admin.js',
        ])
        .pipe(concat('form-builder-admin.dev.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('form-builder-admin.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    gulp.src([
            'source/js/form-builder-front.js',
        ])
        .pipe(concat('form-builder-front.dev.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('form-builder-front.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('source/js/*.js', ['scripts-dist']);
    gulp.watch('source/sass/**/*.scss', ['sass-dist', 'sass-dev']);
});

// Default Task
gulp.task('default', ['sass-dist', 'sass-dev', 'scripts-dist', 'watch']);