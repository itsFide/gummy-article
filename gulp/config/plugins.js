import replace from "gulp-replace";
import gulpPlumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import newer from "gulp-newer";
export const plugins = {
  replace: replace,
  plumber: gulpPlumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
};
