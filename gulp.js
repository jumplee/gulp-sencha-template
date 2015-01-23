var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var wrap = require("gulp-wrap");
var declare = require('gulp-declare');
var watch = require('gulp-watch');
var connect = require('gulp-connect');


gulp.task('default', ['compile_template']);



var paths={
	 //不能以"./"开头否则gulp-watch会不能正常检查出文件的增加和减少
	tpl:'resources/tpl/*.html'
}
/*
 var cmd = require('run-cmd');
var sassCmd = cmd.build('compass')
  .flag('compile', 'compile') // creates a function all(), which will generate -a when called.
  .flag('watch', 'watch') // crates a function list(), which will generate -l when called.
  .default('watch');
*/

gulp.task('compile_template', function(done) {
  gulp.src(paths.tpl)
    .pipe(replace('\'','\\\''))
    .pipe(replace(/(\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))/g,''))
    .pipe(wrap("'<%= contents %>'"))
    .pipe(declare({
      namespace: 'MPDL.tpl',
      noRedeclare: true // 避免变量名重复
    }))
   .pipe(concat('tpl.js'))
    .pipe(gulp.dest('./resources/js'))
    .on('end', done);
});

gulp.task('watch', function() {
    watch(paths.tpl,function(){
        gulp.start('compile_template');
    });
    livereload = require('livereload');
    server = livereload.createServer();
    server.watch(__dirname +'/app');
});
	
gulp.task('sass', function() {
	sassCmd.compile('./resources/sass/theme.scss');
});
gulp.task('watch1', function() {
    watch(paths.tpl,function(){
        gulp.start('compile_template');
    });
});
gulp.task('server', function(next) {
    connect.server({
        root: '.'
    });
});

