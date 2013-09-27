Title: 关于安装MathJax后占用文件过多的问题
Date: 2011-07-28 22:39
Author: Calf
Category: 建站
Tags: BlueHost, LaTeX, MathJax, Web Font, 建站
Slug: mathjax-numerous-files
Summary: MathJax在安装目录下有三万多个文件，百分之九十九以上都是由图片字体`mathjax/fonts/HTML-CSS/TeX/png`贡献的，这些图片是为不支持的Web Font的浏览器准备的。如果太多的文件影响到服务器空间，可以按照本文的方法删掉以节省空间，减少文件总数。

在[WordPress数学公式插件LaTeX][]中介绍了GoCalf博客中使用的LaTeX插件，是Zhiqiang开发的[LaTeX
for
WordPress][]插件。这个插件利用MathJax来渲染LaTeX公式，效果非常好，后来我在自己的空间里安装了MathJax引擎。可是前两天发现我的空间里竟然有五万多个文件，几乎就要收到BlueHost的警告了，查看了一下文件分布，发现光MathJax就有三万多个文件！怎么能减少文件数目呢？<!--more-->

对MathJax的安装路径扫描了一下，发现[cci]mathjax/fonts/HTML-CSS/TeX/png[/cci]下面有无数的小文件，都是图片，每个图片是一个字符。非常奇怪，MathJax不是用JavaScript、CSS和Web
Font来显示公式么，怎么会有这么多图片格式的字符。

带着这个疑问到MathJax官方网站上看了看，果然找到了这样一个FAQ：[The
MathJax font folder is too big. Is there any way to compress it?][]

原来这些图片格式的字符是为了让那些古老的不支持Web
Font的浏览器也可以正常地显示LaTeX公式，好吧，可怕的向下兼容。在MathJax将其改进之前，我决定先删掉这些图片。先要关闭这种图片字体的功能，直接修改插件的源代码[cci]blog/wp-content/plugins/latex/latex.php[/cci]，找到关于MathJax配置的代码，修改为：

    [ccen_php highlight="6"]
    function add_latex_mathjax_code(){
        echo '<script type="text/x-mathjax-config">
            MathJax.Hub.Config({
                "HTML-CSS": {
                    scale: 85,
                    imageFont: null
                }
            });</script>
            <script type="text/javascript" src="'.get_option("mathjax_server").'"></script>';
    }[/ccen_php]

其中第6行就是新添加的内容（还有第5行末尾的逗号），这样MathJax就不会再使用图片字体，然后把上面提到的那个目录整个删掉就可以了。当然TeX目录下还有其他几个文件夹，如eot、otf和svg，这些可不要删，要不然在什么浏览器上都无法显示公式了。

试了一下，至少IE6+、Chrome、FireFox、Safari（包括iPhone、iPad版）都可以正常显示公式。

呼，一下子清理掉三万多文件，不错。

  [WordPress数学公式插件LaTeX]: http://www.gocalf.com/blog/latex-wordpress.html
    "WordPress数学公式插件LaTeX"
  [LaTeX for WordPress]: http://wordpress.org/extend/plugins/latex/
    "LaTeX for WordPress"
  [The MathJax font folder is too big. Is there any way to compress
  it?]: http://www.mathjax.org/resources/faqs/#fonts-too-big
    "The MathJax font folder is too big. Is there any way to compress it?"
