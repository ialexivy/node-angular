const gulp = require("gulp"),
    concat = require("gulp-concat"),
    cleanCSS = require("gulp-clean-css"),
    templateCache = require("gulp-angular-templatecache"),
    sass = require("gulp-sass"),
    nodemon = require('gulp-nodemon');


const TEMPLATE_HEADER = "(function(angular){'use strict';angular.module('nodeApp').run(runConfig);runConfig.$inject=['$templateCache'];function runConfig($templateCache){";
const TEMPLATE_FOOTER = "}})(angular);";
const jsFiles = ['*.js', 'src/**/*.js'];
////////////////////////////////////////////////////////////////////////////////
//////////
//////////     SOURCES
//////////  
////////////////////////////////////////////////////////////////////////////////

// css source file: .scss files
const css = { in: "./scss/" + "Style.scss",
    out: "./public/" + "css/",
    watch: "./scss/**/*",
    sassOpts: {
        outputStyle: "compressed",
        precision: 8,
        errLogToConsole: true,
        includePaths: ["bower_components/bootstrap-sass/assets/stylesheets"]
    }
};

const paths = {
    webroot: "./public/",
    vendorStyles: [
        "bower_components/bootstrap/dist/css/bootstrap.min.css",
    ],
    scripts: [
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/bootstrap/dist/js/bootstrap.min.js",
        "bower_components/angular/angular.min.js",
        "bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "bower_components/angular-resource/angular-resource.min.js",
    ]
};
paths.concatJSVendorDest = paths.webroot + "js/vendor.min.js";
paths.concatCssDest = paths.webroot + "css/vendor.min.css";
paths.concatHTMLDest = paths.webroot + "html/";
paths.concatJSAppDest = paths.webroot + "js/app.min.js";

// CSS
gulp.task("vendor-css", [ /*'clean-styles'*/ ], function() {
    gulp.src(paths.vendorStyles)
        .pipe(cleanCSS({
            keepBreaks: false,
            keepSpecialComments: 0
        }))
        .pipe(concat(paths.concatCssDest))
        .pipe(gulp.dest("."));
});

// JS
gulp.task("vendor-scripts", [ /*'clean-libs'*/ ], function() {
    gulp.src(paths.scripts)
        .pipe(concat(paths.concatJSVendorDest))
        .pipe(gulp.dest("."));
});


// TEMPLATES
gulp.task("templates", [ /*'clean-templates'*/ ], function() {
    gulp.src(["templates/**/*.html", "app/partials/*.html"])
        .pipe(templateCache({
            templateHeader: TEMPLATE_HEADER,
            templateFooter: TEMPLATE_FOOTER
        }))
        .pipe(gulp.dest(paths.concatHTMLDest));
});

// SCSS
gulp.task("app-css", [], function() {
    gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});

// ANGULAR APP
gulp.task("app", [ /*'clean-code'*/ ], function() {
    gulp.src(["app/**/*module*.js", "app/**/*.js", "!app/**/*.min.js"])
        .pipe(concat(paths.concatJSAppDest))
        .pipe(gulp.dest("."));
});

gulp.task("watch", ["app", "templates", "app-css", ], function() {
    gulp.watch("templates/**/*.html", ["templates"]);
    gulp.watch("app/**/*.js", ["app"]);
    gulp.watch("./scss/**/*.scss", ["app-css"]);
});

gulp.task('test', function() {
    gulp.src('tests/*.js', {
            read: false
        })
        .pipe(gulpMocha({
            reporter: 'nyan'
        }));
});

gulp.task('serve', ["vendor-css", "vendor-scripts", "app-css", "app", "templates"], function() {
    var options = {
        script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting....');
        });
});

gulp.task("default", ["vendor-css", "vendor-scripts", "app-css", "app", "templates"], function() {});