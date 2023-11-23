import concat from "gulp-concat";
import uglify from "gulp-uglify";
export const minjs = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(uglify())
    .pipe(concat("app.min.js"))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
