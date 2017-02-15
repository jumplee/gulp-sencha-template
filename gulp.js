var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var wrap = require("gulp-wrap");
var declare = require('gulp-declare');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var include = require('gulp-html-tag-include');
//执行代码
var exec = require('child_process').exec;
gulp.task('default', ['compile_template']);
gulp.task('tpl',['compile_template']);


var paths={
	 //不能以"./"开头否则gulp-watch会不能正常检查出文件的增加和减少
	tpl:['resources/tpl/*/*','resources/tpl/*']
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
      //加入include标签
      .pipe(include())
      //去除单引号和空格
      .pipe(replace('\'','\\\''))
      .pipe(replace(/(\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))|/g,''))
      //.pipe(replace(/(^>\s*)|(\s*<$)/g,''))
      //拼接成一个大的字符串
      .pipe(wrap("'<%= contents %>'"))
      //声明变量
      .pipe(declare({
        namespace: '_.tpl',
        noRedeclare: true // 避免变量名重复
      }))
      //连接成一个文件
      .pipe(concat('tpl.js'))
      .pipe(gulp.dest('./resources/js'))
      .on('end', done);
});
//livereload 不实用，直接在chrome中开发更好使
gulp.task('watch_bak', function() {
    watch(paths.tpl,function(){
        gulp.start('compile_template');
    });
    livereload = require('livereload');
    server = livereload.createServer();
    server.watch(__dirname +'/app');
});
//检测tpl自动更新
gulp.task('watch', function() {
    watch(paths.tpl,function(){
        gulp.start('compile_template');
    });
});

//没有测试通过，发现自带compass watch挺方便的不用了
var compass = require('gulp-compass');
gulp.task('compass', function() {
    gulp.src('./resources/theme/theme2.scss')
        .pipe(compass({
            css: './resources/theme/stylesheets',
            sass: './resources/theme/theme2.scss'
        }))
        .pipe(gulp.dest('./resources/css'));
});
gulp.task('sass', function() {
	sassCmd.compile();
});
gulp.task('watch_tpl', function() {
    watch(paths.tpl,function(){
        gulp.start('compile_template');
    });
});
gulp.task('server', function(next) {
    connect.server({
        root: './shareWeb',
        livereload: true
    });
});
//jsDoc 不支持sencha 使用jsDuck，放弃
//var jsdoc = require("gulp-jsdoc");
//gulp.task('doc', function(next) {
//    gulp.src("./D/fun.js")
//        .pipe(jsdoc('./document'))
//});


