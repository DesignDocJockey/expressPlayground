const gulp = require('gulp');
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