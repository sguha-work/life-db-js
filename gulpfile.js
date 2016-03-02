var gulp = require('gulp'); 
var uglify = require('gulp-uglify');


gulp.task('default', function() {
  return gulp.src('life-db.js')
    .pipe(uglify())
    .pipe(gulp.dest('production'));
});