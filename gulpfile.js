"use strict";


const process = require('process'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    highlight = require('highlight.js'),
    marked = require('marked'),
    renderer = new marked.Renderer();


// 重写 marked heading 部分
renderer.heading = (text, level) => {
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
         * 还是不要开启比较好，因为生成的 PDF 是无法正常跳转的
         */
        // .pipe($.doctoc({
        //     title: "目录",
        //     depth: 3,
        //     mode: "github.com",
        //     notitle: false
        // }))

        // Get rid of the HTML character entities from the anchor values.
        // .pipe($.replace(/&x27e[89]/g, ''))

        /*
         * 执行 marked
         *
         */
        .pipe($.markdown({
            renderer: renderer,
            highlight: code => highlight.highlightAuto(code).value
        }))

        /*
         * HTML 前插入 css 文件
         *
         * 反向
         *
         */
        .pipe($.insert.prepend('<link rel="stylesheet" href="assets/highlight.css">\n'))
        .pipe($.insert.prepend('<link rel="stylesheet" href="assets/pdf.css">\n'))
        .pipe(gulp.dest('dist'))
        /*
         * HTML 转换为 PDF
         *
         */
        .pipe($.htmlPdf({
            format: 'A4',
            base: 'file://' + __dirname + '/', // 资源相对路径
            border: {
                top: '9mm',
                right: '11.5mm',
                bottom: '9mm',
                left: '11.5mm'
            }

        }))


        .pipe(gulp.dest('dist'));
});

// default
gulp.task('default', ['build']);