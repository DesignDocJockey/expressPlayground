const gulp = require('gulp');
const gulpMocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');


gulp.task('default', () => {
    nodemon({
                script:"server.js",
                ext: "js",
                env: {
                    PORT: 8000
                },
                ignore: ['./node_modules/**']
            })
    .on('restart', () => {
        console.log('process restarted');
    });
});

gulp.task('test', ()=> {
    gulp.src('./tests/*.js', {read: false})
        .pipe(gulpMocha({reporter:'nyan'}));
});