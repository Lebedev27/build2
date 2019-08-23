global.$ = {
    gulp: require('gulp'),
    del: require('del'),
    fs: require('fs'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')(),
    prettify: require('gulp-html-prettify'),
    panini: require('panini')
};

$.gulp.task('clean', function () {
    return $.del([
        'app/build'
    ]);
});

$.gulp.task('compile-scss', () => {
    return $.gulp.src('./app/template/scss/**/*.scss')
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.sass({
            includePaths: ['./app/template/scss/**/*.scss'],
            outputStyle: 'expanded'
        }).on('error', $.gp.sass.logError))
        .pipe($.gp.sourcemaps.write())
        .pipe($.gp.autoprefixer({
            browsers: ['last 4 version']
        }))
        .pipe($.gulp.dest('./app/template/css/'))
        .pipe($.browserSync.reload({
            stream: true
        }));
});


$.gulp.task('compile-html', () => {
    return $.gulp.src('./app/template/html/pages/**/*.html')
        .pipe($.panini({
            root: './app/template/html/pages/',
            layouts: './app/template/html/layouts/',
            partials: './app/template/html/includes/',
            helpers: './app/template/html/helpers/',
            data: './app/template/html/data/'
        }))
        .pipe($.prettify({indent_char: ' ', indent_size: 2}))
        .pipe($.gulp.dest('./app'))
        .on('end', $.browserSync.reload);
});

$.gulp.task('compile-html:reset', (done) => {
    $.panini.refresh();
    done();
});

$.gulp.task('template', function () {
    return $.gulp.src('./template/**/*')
        .pipe($.gulp.dest('./app/build/template/'))
        .pipe($.browserSync.reload({
            stream: true
        }));
});
$.gulp.task('html', function () {
    return $.gulp.src('app/*.html')
        .pipe($.gulp.dest('app/build/'))
});
$.gulp.task('js', function () {
    return $.gulp.src('app/template/js/*.js')
        .pipe($.gulp.dest('app/build/template/js/'))
});
$.gulp.task('css', function () {
    return $.gulp.src('app/template/css/*.css')
        .pipe($.gulp.dest('app/build/template/css/'))
});
$.gulp.task('fonts', function () {
    return $.gulp.src('app/template/fonts/*')
        .pipe($.gulp.dest('app/build/template/fonts/'))
});
$.gulp.task('img', function () {
    return $.gulp.src('app/template/img/*')
        .pipe($.gulp.dest('app/build/template/img/'))
});
$.gulp.task('libs', function () {
    return $.gulp.src('app/template/libs/**')
        .pipe($.gulp.dest('app/build/template/libs/'))
});
$.gulp.task('watch', function () {
    $.gulp.watch('./app/template/scss/**/*.scss', $.gulp.series('compile-scss'));
    $.gulp.watch('./app/template/html/pages/*.html', $.gulp.series('compile-html'));
    $.gulp.watch('./app/template/html/{layouts,includes,helpers,data}/**/*', $.gulp.series('compile-html:reset', 'compile-html'));
    $.gulp.watch('./app/template/**/*', $.gulp.series('template'));
});
$.gulp.task('serve', function () {
    $.browserSync.init({
        server: './app'
    });
});
$.gulp.task('default', $.gulp.series(
    'clean',
    'template',
    'compile-html',
    'compile-scss',
    'html',
    'js',
    'css',
    'fonts',
    'img',
    'libs',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
