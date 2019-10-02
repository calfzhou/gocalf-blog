关于安装 MathJax 后占用文件过多的问题
#####################################
:date: 2011-07-28 22:39
:modified: 2011-08-03 22:26
:author: Calf
:category: 建站
:tags: MathJax
:keywords: LaTeX, Web Font, Hosting
:slug: mathjax-numerous-files
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/07/mathjax.png
:summary: MathJax 在安装目录下有三万多个文件，百分之九十九以上都是由图片字体 ``mathjax/fonts/HTML-CSS/TeX/png`` 贡献的，这些图片是为不支持的 Web Font 的浏览器准备的。如果太多的文件影响到服务器空间，可以按照本文的方法删掉以节省空间，减少文件总数。

在 `WordPress 数学公式插件 LaTeX`_ 中介绍了 GoCalf 博客中使用的 LaTeX 插件，是 Zhiqiang 开发的 `LaTeX for WordPress`_ 插件。这个插件利用 MathJax 来渲染 LaTeX 公式，效果非常好，后来我在自己的空间里安装了 MathJax 引擎。可是前两天发现我的空间里竟然有五万多个文件，几乎就要收到 BlueHost 的警告了，查看了一下文件分布，发现光 MathJax 就有三万多个文件！怎么能减少文件数目呢？

.. more

对 MathJax 的安装路径扫描了一下，发现 ``mathjax/fonts/HTML-CSS/TeX/png`` 下面有无数的小文件，都是图片，每个图片是一个字符。非常奇怪，MathJax 不是用 JavaScript、CSS 和 Web
Font 来显示公式么，怎么会有这么多图片格式的字符。

带着这个疑问到 MathJax 官方网站上看了看，果然找到了这样一个 FAQ：`The MathJax font folder is too big. Is there any way to compress it?`_

原来这些图片格式的字符是为了让那些古老的不支持 Web
Font 的浏览器也可以正常地显示 LaTeX 公式，好吧，可怕的向下兼容。在 MathJax 将其改进之前，我决定先删掉这些图片。先要关闭这种图片字体的功能，直接修改插件的源代码 ``blog/wp-content/plugins/latex/latex.php``，找到关于 MathJax 配置的代码，修改为：

.. code-block:: html+php
    :hl_lines: 6

    function add_latex_mathjax_code(){
        echo '<script type="text/x-mathjax-config">
            MathJax.Hub.Config({
                "HTML-CSS": {
                    scale: 85,
                    imageFont: null
                }
            });</script>
            <script type="text/javascript" src="'.get_option("mathjax_server").'"></script>';
    }

其中第 6 行就是新添加的内容（还有第 5 行末尾的逗号），这样 MathJax 就不会再使用图片字体，然后把上面提到的那个目录整个删掉就可以了。当然 TeX 目录下还有其他几个文件夹，如 eot、otf 和 svg，这些可不要删，要不然在什么浏览器上都无法显示公式了。

试了一下，至少 IE6+、Chrome、FireFox、Safari（包括 iPhone、iPad 版）都可以正常显示公式。

呼，一下子清理掉三万多文件，不错。

.. _WordPress 数学公式插件 LaTeX: {filename}latex-wordpress.rst
.. _LaTeX for WordPress: http://wordpress.org/extend/plugins/latex/
.. _The MathJax font folder is too big. Is there any way to compress it?: http://www.mathjax.org/resources/faqs/#fonts-too-big
