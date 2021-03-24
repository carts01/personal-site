var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var ghpages = require("gh-pages");
var uglify = require("gulp-uglify");
const webpack = require("webpack-stream");

sass.compiler = require("node-sass");

//Converts sass files to regular css files and pipes to dist folder
gulp.task("sass", function() {
  return gulp
    .src("src/css/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

//Minifies js files and pipes to dist folder
gulp.task("scripts", function() {
  return gulp
    .src("src/js/*.js")
    .pipe(
      webpack({
        output: {
          filename: "app.js"
        }
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

//Takes html file from src folder and pipes to dist folder
gulp.task("html", function() {
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

//Takes fonts from src folder and pipes to dist folder
gulp.task("fonts", async function() {
  return gulp.src("src/fonts/*").pipe(gulp.dest("dist/fonts"));
});

//Minifies images and pipes them to dist folder
gulp.task("images", async function() {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

//Watchs for all tasks, and updates in the browser
gulp.task("watch", async function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp
    .watch("src/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
  gulp.watch("src/css/style.scss", gulp.series(gulp.parallel("sass")));
  gulp.watch("src/fonts/*", gulp.series("fonts"));
  gulp.watch("src/images/*", gulp.series("images"));
  gulp.watch("src/js/*.js", gulp.series("scripts"));
});

//Default task called by running 'gulp' in command line - runs all tasks and watches for them
gulp.task(
  "default",
  gulp.series(
    gulp.parallel("html", "sass", "scripts", "fonts", "images", "watch")
  )
);
