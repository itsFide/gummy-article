import fileinclude from "gulp-file-include";
import ignore from "gulp-ignore";
import webpHTMLConvertor from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import rename from "gulp-rename";
export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, "images/"))
    // .pipe(webpHTMLConvertor())
    // .pipe(
    //   versionNumber({
    //     value: "%DT%",
    //     append: {
    //       key: "_v",
    //       cover: 0,
    //       to: ["css", "js"],
    //     },
    //     output: {
    //       file: "gulp/version.json",
    //     },
    //   })
    // )
    .pipe(ignore.exclude("**/components/**"))
    .pipe(ignore.exclude("**/templates/**"))
    .pipe(rename({ dirname: "" }))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
