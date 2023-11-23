import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import groupMediaQuery from "gulp-group-css-media-queries";
const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(sass())
    .pipe(groupMediaQuery())
    .pipe(
      autoPrefixer({
        grid: true,
        overrideBrowsersList: ["last 3 versions"],
        cascade: true,
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "../images/"))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
};
