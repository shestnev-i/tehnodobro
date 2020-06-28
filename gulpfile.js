let prj_folder = require("path").basename(__dirname);
let src_folder = "#src";

let path = {
    build: {
        html: prj_folder + "/",
        css: prj_folder + "/assets/css/",
        js: prj_folder + "/assets/js/",
        img: prj_folder + "/assets/img/",
    },
    src: {
        html: [src_folder + "/*.html", "!" + src_folder + "/_*.html"],
        basecss: src_folder + "/sass/*.css",
        css: src_folder + "/sass/style.sass",
        basejs: src_folder + "/js/*.js",
        js: src_folder + "/js/scripts.js",
        img: src_folder + "/img/**/*.{jpg,png,gif,ico,webp,svg}",
    },
    watch: {
        html: src_folder + "/**/*.html",
        css: src_folder + "/sass/*.sass",
        js: src_folder + "/js/**/scripts.js",
        img: src_folder + "/img/**/*.{jpg,png,gif,ico,webp}",
    },
    clean: "./" + prj_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + prj_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude({}))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function basecss() {
    return src(path.src.basecss)
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 7 versions "],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function basejs() {
    return src(path.src.basejs)
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                interlaced: true,
                optimizationLevel: 3,
                svgoPlugins: [{ removeViewBox: false }]
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(basejs, js, basecss, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.basejs = basejs;
exports.basecss = basecss;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;