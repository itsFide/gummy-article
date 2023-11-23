import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    html: `${buildFolder}/`,
    files: `${buildFolder}/files`,
    images: `${buildFolder}/images`,
    fonts: `${buildFolder}/fonts`,
  },
  src: {
    /* ЕСЛИ ВСЕ СТРАНИЦЫ И КОМПОНЕНТЫ БУДУТ ИМПОРТИРОВАТЬ В ОДИН ФАЙЛ */
    // scss: `${srcFolder}/scss/style.scss`,
    scss: `${srcFolder}/scss/*.scss`,
    js: `${srcFolder}/js/*.js`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg}`,
    svg: `${srcFolder}/images/**/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
    fonts: `${buildFolder}/fonts/*.*`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,ico,gif,svg}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
