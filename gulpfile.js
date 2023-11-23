import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { copyFiles } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { fontStyle, ttfToWoff, otfTottf } from "./gulp/tasks/fonts.js";
import { minscss } from "./gulp/tasks/other_tasks/minify-css.js";
import { minjs } from "./gulp/tasks/other_tasks/minify-js.js";
import { toZip } from "./gulp/tasks/zip.js";

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

function watcher() {
  gulp.watch(path.watch.files, copyFiles);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}
// УБРАТЬ FONTSTYLE, ЕСЛИ НЕ НУЖНЫ ПОДПИСИ К ШРИФТАМ В SCSS ФАЙЛЕ
// УБРАТЬ FONTSTASKS, ЕСЛИ ШРИФТЫ ПОДГРУЖАЮТСЯ ИЗ CDN
const fontsTasks = gulp.series(ttfToWoff, ttfToWoff);
const minTasks = gulp.parallel(
  fontsTasks,
  copyFiles,
  html,
  minscss,
  minjs,
  images
);
const mainTasks = gulp.parallel(fontsTasks, copyFiles, html, scss, js, images);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, minTasks);
const zip = gulp.series(toZip);

export { dev };
export { build };
export { zip };

gulp.task("default", dev);
