const gulp = require('gulp'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence');
const bs = require('browser-sync').create();

// 把静态资源移动到 dist
gulp.task('move',['clean'],function(){
    return gulp.src(['src/static/image/*','./framework/vendor/**','src/static/fonts/*','./src/static/style/*.css'])
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('clean', function(){
    return gulp.src('./dist/')
    .pipe(clean({force: true}));
});

//gulp-run-sequence

gulp.task('cleanAssets', function() {
    return gulp.src('/Users/Flowke/oneDrive/Project/Personal-Blog/public/assets')
        .pipe(clean({force: true}));
});

gulp.task('toDist', ['cleanAssets'], ()=>{

    gulp.src('./dist/assets/**')
    .pipe(gulp.dest('/Users/Flowke/oneDrive/Project/Personal-Blog/public/assets'));

    gulp.src('./dist/index.html')
    .pipe(gulp.dest('/Users/Flowke/oneDrive/Project/Personal-Blog'));
});


gulp.task('watch',() => {
    gulp.watch('dist/**',['toDist']);
});

gulp.task('bs', ()=>{
    bs.init({
        files:["**"],
        proxy: 'blog.com:9000',
        port: 4000,
        tunnel: true
    })
})
