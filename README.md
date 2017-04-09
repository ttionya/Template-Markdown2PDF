# Template-Markdown2PDF
将 Markdown 转换为 PDF 的模板。


## 环境

+ Node.js >= 4
+ NPM（通常与 Node.js 一起安装）


## 使用方法

1、使用 `npm i` 下载依赖

**注意：** 需要从 Github 下载 `Phantom.js`，由于众所周知的网络问题，可以将[淘宝镜像站](https://npm.taobao.org/mirrors/phantomjs)的相关文件下载至 `/tmp/phantomjs`，删除 `node_modules` 文件夹后重新执行 `npm i`。

2、将需要转换的 `.md` 或 `.markdown` 文件放在 `src` 文件夹中

3、执行 `npm run build` 将 markdown 转换为 pdf，文件生成在 `dist` 文件夹中


## 修改样式

依赖 [Highlight.js](https://highlightjs.org/)，可以在[这里](https://github.com/isagalaev/highlight.js/blob/master/src/styles)找到官方提供的所有样式。


## 已知缺陷

1. PDF 无法选择文字，因为 Phantom.js 生成 PDF 是将内容生成在一个位图上
2. PDF 看起来有点模糊，没有正常 PDF 清楚
3. 整个分页类似于分割一张图，所以会出现正常情况不会出现的分页情况
4. 可能出现标点出现在单独一行的情况
5. 加粗效果不明显
6. 当链接中出现右括号，会被立即关闭，出现链接不全的情况
7. 标识存在 `.` 号的列表元素，比如 `ol`，会出现左侧无法对齐的情况
8. 语法支持不全，比如 `checkbox` 不支持等


## 说明

[remarkable](https://github.com/jonschlinkert/remarkable) 同样是一个将 Markdown 转换为 HTML 的库，[markdown-pdf](https://github.com/alanshaw/markdown-pdf) 基于它将 Markdown 转换为 PDF。

`markdown-pdf` 既提供了使用 `remarkable` 前的预处理接口，也可以更方便地使用外部 CSS 文件，甚至还原生支持 Gulp。这里没有使用它的原因是不知为什么，转换出的 PDF 文件里的链接的地址会被显示出来。


## LICENSE

MIT