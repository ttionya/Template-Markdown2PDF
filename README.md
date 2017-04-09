# Template-Markdown2PDF
将Markdown转换为PDF的模板。

## 说明

[remarkable](https://github.com/jonschlinkert/remarkable) 同样是一个将 Markdown 转换为 HTML 的库，[markdown-pdf](https://github.com/alanshaw/markdown-pdf) 基于它将 Markdown 转换为 PDF。

`markdown-pdf` 既提供了使用 `remarkable` 前的预处理接口，也可以更方便地使用外部 CSS 文件，甚至还原生支持 Gulp。这里没有使用它的原因是不知为什么，转换出的 PDF 文件里的链接的地址会被显示出来。