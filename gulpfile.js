"use strict";


const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    marked = require('marked'),
    renderer = new marked.Renderer();


renderer.heading = function (text, level) {
    const REG_HREF = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
    let id = text.replace(REG_HREF, '')
        .replace('&#39', '\\')
        .replace('&amp;', '&')
        .replace('&quot;', '"')
        .replace('&lt;', '<')
        .replace('&gt;', '>')
        .replace(/\s/g, '-')
        .replace(/[!@#$&*()+=[\]`~{}|;':",./<>?]/g, '')
        .toLowerCase();

    return '<h' + level + ' id="' + encodeURIComponent(id) + '">'
        + text
        + '</h' + level + '>';
};


// build
gulp.task('build', () => {
    return gulp.src(['src/*.md', 'src/*.markdown'])

        /*
         * Auto TOC
         *
         * 自动生成 TOC，若不需要，注释 doctoc 的代码
         *
         * 默认自动生成在文档顶部，可以在文档中添加
         * <!-- START doctoc -->
         * <!-- END doctoc -->
         * 指定需要生成的地方
         *
         */
        .pipe($.doctoc({
            title: "目录",
            depth: 3,
            mode: "github.com",
            notitle: false
        }))

        // Get rid of the HTML character entities from the anchor values.
        // .pipe($.replace(/&x27e[89]/g, ''))

        /*
         * 执行 marked
         * 
         */
        .pipe($.markdown({
            renderer: renderer
        }))

        .pipe(gulp.dest('dist'));
});

// default
gulp.task('default', ['build']);