
// const gulp = require('gulp');
// const babel = require('gulp-babel');

// gulp.task('default', () => {
//   gulp.src('app_dev/**/*.js')
//       .pipe(babel())
//       .pipe(gulp.dest('app'))
// })

// gulp.watch('app_dev/**/*.js', ['default'])


// const { src, dest } = require('gulp');
// const babel = require('gulp-babel');
// let uglify = require('gulp-uglify');

// exports.default = function() {
//   return src('app/public/2.js')
//     .pipe(babel())
//     .pipe(dest('output/'));
// }

// var gulp = require('gulp'),
//     babel = require('gulp-babel'),
//     uglify = require('gulp-uglify');


//创建一个名为js的任务
// gulp.task('js', function(){
//     // 首先取得app/static/scripts下的所有为.js的文件（**/的意思是包含所有子文件夹)
//     return gulp.src('app/public/2.js')
//         //将ES6代码转译为可执行的JS代码
//         .pipe(babel())
//         //js压缩
//         .pipe(uglify())
//         //将转译压缩后的文件输出到dist/static/scripts下（假如没有dist目录则自动生成dist目录）
//         .pipe(gulp.dest('output'))
// })
// gulp.task('default', ['js']);