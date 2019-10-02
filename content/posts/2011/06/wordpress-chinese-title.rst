解决 WordPress 中文 title 无法显示的问题
########################################
:date: 2011-06-30 22:50
:modified: 2011-08-03 20:10
:author: Calf
:category: 建站
:tags: WordPress Theme
:keywords: Cufon, LightWord, WordPress, 中文, 字体
:slug: wordpress-chinese-title
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/07/hanzi.png
:summary: 如果在 WordPress 主题中使用了 Cufón，中文标题有可能无法显示，这时候只能忍痛割爱，关掉 Cufón。

博客刚刚开张，就遇到了第一个问题，中文标题无法显示。

建好 WordPress 之后，系统自动发了一篇名为 Hello
world! 的文章（为程序员量身定制的么？），当时一切正常。但当我发了一篇中文标题的文章后，总觉得怪怪的，原来中文标题没有显示出来。于是查看网页源码，又 Google 了一下，发现是 Cufon 造成的。

.. more

Cufon（应该写做 Cufón）是通过 JavaScript 在网页中进行文字渲染的，可通过以下两个链接了解它：

-  http://en.wikipedia.org/wiki/Scalable_Inman_Flash_Replacement
-  http://cufon.shoqolate.com/generate/

关键问题是 Cufon 对中文字体的支持不是很理想（不是做不到，只是中文字体包实在太大了）。目前的 work
around 就是暂时禁用 Cufon。我现在使用的主题是大名鼎鼎的 LightWord，它使用了 Cufon。不过在它的配置项中有关于 Cufon 的设置，非常方便，在后台进入 Appearance->LightWord
Settings，在 General settings 中就可以看到 Cufon
settings，改为 Disabled 即可。

关闭 Cufon 之后，明显感觉到英文标题没有以前好看了，不过为了能显示中文，只好先忍痛割爱了。当然如果愿意，也可以准备一个中文字体，在上面提到的第二个链接中可以自行创建。在 WordPress 的安装目录 ``./wp-content/themes/lightword/js/`` 中可以看到相关 JavaScript，比如 LightWord 主题使用的是 vera 字体，在目录中可以看到 ``vera.font.js`` 和 ``vera\_extra.font.js`` 两个文件。
