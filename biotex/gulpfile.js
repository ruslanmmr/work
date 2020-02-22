var gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    autoprefixer = require("gulp-autoprefixer"),
    pug = require("gulp-pug"),
    sass = require("gulp-sass"),
    mincss = require("gulp-clean-css"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    favicons = require("gulp-favicons"),
    replace = require("gulp-replace"),
    newer = require("gulp-newer"),
    plumber = require("gulp-plumber"),
    debug = require("gulp-debug"),
    watch = require("gulp-watch"),
    clean = require("gulp-clean"),
    rsync = require('gulp-rsync'),
    imagemin = require('gulp-imagemin'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

let $images = ["./src/img/**/*.{jpg,jpeg,png,gif}", "!./src/img/favicons/*.{jpg,jpeg,png,gif}"],
    $pug = ["./src/views/**/*.pug", "!./src/views/blocks/*.pug", "!./src/views/layout/*.pug"],
    $pug_all = "./src/views/**/*.pug",
    $scripts = "./src/js/common.js",
    $styles = "./src/styles/**/*.scss",
    $favicons = "./src/img/favicons/*.{jpg,jpeg,png,gif}",
    $other = ["./src/**/*", "!./src/img/**/*.{jpg,jpeg,png,gif}", "!./src/js/**/*", "!./src/styles/**/*", "!./src/views/**/*"];

gulp.task("pug", function () {
  return gulp.src($pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(replace("../public/", "../"))
    .pipe(gulp.dest("./public/"))
    .pipe(debug({
      "title": "html"
    }))
    .on("end", browsersync.reload);
});

gulp.task("scripts", function () {
  return gulp.src($scripts)
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'common.js',
      },
      performance: {
        hints: false,
        maxEntrypointSize: 1000,
        maxAssetSize: 1000
      },
      module: {
        rules: [{
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
          presets: [
                [
                    "@babel/preset-env",
                    {
                      targets: {
                          node: "8.10"
                      }
                    }
                ]
            ]
          }
        }]
      }
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("./public/js/"))
    .pipe(debug({"title": "scripts"}))
    .on("end", browsersync.reload);
});

gulp.task("scripts-production", function () {
  return gulp.src($scripts)
    .pipe(sourcemaps.init())
    .pipe(webpackStream({
      mode: 'production',
      output: {
        filename: 'common.js',
      },
      performance: {
        hints: false,
        maxEntrypointSize: 1000,
        maxAssetSize: 1000
      },
      module: {
        rules: [{
          loader: 'babel-loader',
          options: {
            presets: [["@babel/preset-env",{targets: {node:"8.10"}}]]
          }
        }]
      }
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write("./maps/"))
    .pipe(gulp.dest("./public/js/"))
    .pipe(debug({"title": "scripts"}))
    .on("end", browsersync.reload);
});

gulp.task("styles", function () {
  return gulp.src($styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 1 version","> 1%"]
    }))
    .pipe(mincss({
      level: 1
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(replace("../../public/", "../"))
    .pipe(plumber.stop())
    .pipe(sourcemaps.write("./maps/"))
    .pipe(gulp.dest("./public/styles/"))
    .on("end", browsersync.reload);
});

gulp.task("images", function () {
  return gulp.src($images)
    .pipe(newer("./public/img/"))
    .pipe(imagemin())
    .pipe(gulp.dest("./public/img/"))
    .pipe(debug({
      "title": "images"
    }))
    .on("end", browsersync.reload);
});

gulp.task("favicons", function () {
  return gulp.src($favicons)
    .pipe(favicons({
      icons: {
        appleIcon: true,
        favicons: true,
        online: false,
        appleStartup: false,
        android: false,
        firefox: false,
        yandex: false,
        windows: false,
        coast: false
      }
    }))
    .pipe(gulp.dest("./public/img/favicons/"))
    .pipe(debug({
      "title": "favicons"
    }));
});

gulp.task("other", function () {
  return gulp.src($other)
    .pipe(gulp.dest("./public/"))
    .on("end", browsersync.reload);
});

gulp.task("clean", function () {
  return gulp.src("./public/*", {
      read: false
    })
    .pipe(clean())
    .pipe(debug({
      "title": "clean"
    }));
});

gulp.task("serve", function () {
  return new Promise((res, rej) => {
    browsersync.init({
      server: "./public/",
      tunnel: false,
      port: 9000
    });
    res();
  });
});

gulp.task("watch", function () {
  return new Promise((res, rej) => {
    watch($pug_all, gulp.series("pug"));
    watch($styles, gulp.series("styles"));
    watch($scripts, gulp.series("scripts"));
    watch($images, gulp.series("images"));
    watch($favicons, gulp.series("favicons"));
    watch($other, gulp.series("other"));
    res();
  });
});

gulp.task("transfer", function () {
  return gulp.src('./public/**')
    .pipe(rsync({
      root: './public/',
      hostname: '',
      destination: '',
      archive: true,
      silent: false,
      compress: true
  }));
});

// gulp
gulp.task("default", gulp.series("clean",
  gulp.parallel("pug", "styles", "scripts", "images", "favicons", "other"),
  gulp.parallel("watch", "serve")
));

