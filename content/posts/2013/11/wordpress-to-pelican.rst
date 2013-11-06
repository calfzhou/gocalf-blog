博客从WordPress迁移到Pelican
############################
:date: 2013-11-06 21:15
:modified: 2013-11-06 21:30
:author: Calf
:category: 建站
:tags: Pelican, WordPress, Static Blog
:slug: wordpress-to-pelican
:summary: 经过一段时间的整理，现在正式把GoCalf博客从WordPress迁移到Pelican了。

经过一段时间的整理，现在正式把\ `GoCalf博客`_\ 从\ `WordPress`_\ 迁移到\ `Pelican`_\ 了，简单记录一下，还有一些未完成的事情等着以后再慢慢搞。

.. more

WordPress vs. 静态博客
======================

最开始的动机只是想寻找一个最适合自己的个人wiki系统，之前把一些备忘信息用\ `TiddlyWiki`_\ 保存在U盘上，这样在任何地方，用任何操作系统的电脑都可以查看和编辑。但是后来懒到每次都懒的把U盘拿过来插上，所以并没有发挥太大的作用。后来开始用\ `DropBox`_\ ，其他很多东西都移到DropBox里了，这个却一直没有动。现在\ `OneNote`_\ 和\ `Evernote`_\ 和\ `有道云笔记`_\ 同时在用，却没有一个是我真正想要的。

扯远了。

总之在进行个人wiki的技术选型时，产生了把\ `GoCalf博客`_\ 改成静态博客的念头。

接触\ `WordPress`_\ 很多年了，这个东西确实非常的强大，丰富的插件使得它几乎可以实现任何我想要的功能。但也总会有人说不要过多地依赖插件，它们会让你的博客变得非常的慢。当然插件太多也挺麻烦的，经常想要某个功能，会发现很多很多相关的插件，对于有选择困难的我来说，这实在是太痛苦了。得考虑插件本身实现的功能是否足够强大，得考虑插件是否还在持续地被维护，得考虑各种兼容性问题等等。像我一直使用的代码高亮插件\ `CodeColorer`\ ，在我最早开始用WordPress的时候，觉得这个插件是最好的，但最近两年它都不再更新了。它有一些小的bug，向作者反馈后没有收到任何回音，而我又懒得自己改。但是要换别的插件也很麻烦，因为我特别喜欢使用它独特的标记语法，别的插件都不支持。

让我想要放弃WordPress的另一个原因是，不知道是不是心理作用，每次用WordPress写东西都感觉像是非常复杂的一件事，甚至有点儿害怕用它。就是感觉特别的麻烦，加上服务器放在境外，访问速度也不是很乐观，就更加不方便了。在写的过程中，也总是会担心这样或那样的小错误，最让我头疼的就是HTML特殊字符的转义了，在代码片段或者数学公式中遇到特殊字符，有时候是要转义的，有时候不用转义，有时候打开一篇老文章，不做任何改动再保存，格式就会出问题。

可能是因为它太过强大了。

看了一些静态博客方面的文章，感觉挺好的，用任何一个自己喜欢的文本编辑器按照自己习惯的格式去书写，至少在这个过程中完全不用考虑任何展示方面的事情。

写文章的过程变得很简洁，不需要趴在服务器上去写，不用担心异常断网等情况带来的不便，只需要有一台机器，有一个自己喜欢的编辑器，写完之后用一个简单的命令就可以进行发布。

静态博客还有一个重要的优势是，它几乎不占用什么服务器的运算资源，所有的HTML页面都是在发布前夕在本地生成的，最终在服务器上趴着的只有一个个静态HTML页面，所有的插件都是在发布前在本地进行运算的，不会因为插件众多而拖垮服务器。没有数据库，没有PHP，任何一个可以托管静态页面的地方都可以放下整个博客。

另外博客的备份也变得简单了，没有数据库了，也不用从服务器上把文件都拷贝回来。所有的源文件都在本地，可以用任何喜欢的方式进行备份。我现在利用GitHub进行备份，连修改历史都有了。

不知道是不是冥冥之中注定了要走上静态之路，就在我正试着把WordPress上的文章往静态博客转移的时候，我的WordPress站点出了些奇怪的问题。已有的文章进入编辑模式后看不到任何内容，这时候如果保存一下，那文章就变成白纸了。有一篇文章的内容莫名其妙地丢失了，我记得我只是打开编辑模式看了看，并没有保存，但它真的没有了。感觉像是CKEditor插件出问题了，把它禁用之后，发现还是不行。如果写新的文章，换行什么的都失效了，虽然编辑框里一个个段落都存在，保存之后所有的段落都粘在一起了。再次启用CKEditor之后，发现编辑器并没有相应地发生变化。一切都乱套了。

最后放弃了修复这些问题，让它们全都消失好了。

静态博客会有一个问题，就是没法直接加入动态的东西。比如评论，比如搜索。搜索暂时没有考虑，对于评论，可以利用社交化评论系统，比如我现在用的\ `Disqus`_\ ，在生成的html页面中嵌入一段JavaScript代码，当浏览器打开这个页面的时候，JavaScript代码会从Disqus服务器上获取相关的评论信息并展示出来。也可以自己做一个简单的评论系统，不过对于垃圾评论满天飞的互联网，要想做好还是很难的。

总的来说，静态博客的好处是，你只需要关注要写的内容本身。

Octopress vs. Pelican
=====================

刚开始接触到的静态博客是\ `Octopress`_\ ，是基于\ `Jekyll`_\ 的，后者是用Ruby写的静态博客系统。据说Octopress与Jekyll的关系就像jQuery与JavaScript的关系一样。

现在Octopress很火的，在\ `Octopress Sites`_\ 中可以看到很多基于Octopress搭建的博客，我也针对一些我需要的特性对它进行了一些勘察。不过很快地，我就把目光转向了基于Python的\ `Pelican`_\ 。

Pelican的使用量相对来说少一些（\ `Pelican Sites`_\ ），选择它的主要原因是我更熟悉Python。Ruby的代码我几乎没有看过，也没有尝试去读或者写，这样如果在使用Octopress过程中，需要做一些修改，或者写一些插件，就会比较困难。但如果使用Pelican，我可以自己修改它的代码，可以自己写插件。后来发现这个选择是对的，我已经对Pelican及其插件做了一些修改，而且已经计划写一些至少自己能用的上的新插件。

Pelican当前的版本是3.3.0，虽然没有和Octopress具体地对比，但它有些功能是我很喜欢的，比如\ `linking to internal content`_\ 用于把不同的文章、或者文章和附件联系起来，而不需要关心它们发布后在什么位置；比如内置了对多语言博客的支持（\ `translations`_\ ）；还有草稿模式等等。

相对的，它的缺点主要是插件还不够丰富，只好用“自己写”来弥补了。另外大多数Pelican主题都不好看，这个问题回头再慢慢解决吧。

现在我的这个博客看起来有点儿像Octopress，是因为我用了\ `Octopress Theme for Pelican`_\ 。这只是暂时的啦，以后有时间了会自己整一个主题。

有一个问题是比较讨厌的，不知道Octopress是否也一样，就是编译速度比较慢。静态博客是要把用标记语言书写的文章转换成HTML页面，用Pelican的时候，几十篇文章就需要几秒钟的时间才能编译完成，如果有上百篇文章，等待过程会让人焦虑的。目前即使只是一篇文章中改变了一个字，编译的时候也会重新编译所有的页面。这一点期待开发团队的改进吧。感觉一个可行的方案是生成一些中间文件，把每篇文章对应的HTML片段单独保存，如果文章内容和相关的参数都没变，这一部分就不用重新生成。最终的HTML页面，是把框架跟内容片段连在一起生成的，这个过程应该会很快。

Markdown vs. reStructuredText
=============================

`Markdown`_\ 和\ `reStructuredText`_\ 都是非常不错的标记语言，也是众多静态博客玩家首选的语言之一二。开始我一直准备用Markdown，GitHub对它的强力支持是很主要的原因。当然Markdown自身确实也有很多的优势，它非常的简洁，书写和阅读都非常舒服。我甚至已经把所有的文章都转成Markdown格式了，但最后还是转投reStructuredText的怀抱。

Markdown很简洁，如果是写文学的东西，用它最合适不过了。但它有点儿太简洁了，如果是写技术文章，它的处理能力就有点儿捉襟见肘了。比如没有原生的表格，没有数学公式的支持，段落嵌套很困难，虽然能直接嵌入HTML代码，但很难做到复杂的嵌套。

reStructuredText则要强大的多，也并没有失去太多的简便性。Python的官方文档就是用它写出来的。很多技术博客或者技术书籍是用它写出来的。

Markdown的扩展性也让人难以忍受，它天生似乎就没打算让别人对它做太多的扩展。它没有一个约定俗成的扩展语法。在Octopress中广泛使用的是Liquid-style Tags，大多数Octopress插件的语法都是基于这个的。我没有仔细研究过，看起来这个是从Ruby那里来的。当然在Pelican里面也有相应的liquid tags插件，但我实在不能忍受liquid tag常用的语法。以Octopress中\ `Image Tag`_\ 插件为例，它的语法是：

.. code-block:: text
    :linenos: none

    {% img [class names] /path/to/image [width] [height] [title text [alt text]] %}

如果去看这个插件的源代码，可以发现它用正则表达式来解析这个语法，相关的代码如下：

.. code-block:: ruby

    if markup =~ /(?<class>\S.*\s+)?(?<src>(?:https?:\/\/|\/|\S+\/)\S+)(?:\s+(?<width>\d+))?(?:\s+(?<height>\d+))?(?<title>\s+.+)?/i
      @img = attributes.reduce({}) { |img, attr| img[attr] = $~[attr].strip if $~[attr]; img }
      if /(?:"|')(?<title>[^"']+)?(?:"|')\s+(?:"|')(?<alt>[^"']+)?(?:"|')/ =~ @img['title']
        ...
      else
        ...
      end
      ...
    end

复杂的正则表达式隐含着太多未知的危机。可怕之处在于每个参数都不是命名的，依靠位置（或者顺序）来识别每个参数值的含义。但是绝大多数参数又都是可以省略的，这种情况下只能借助参数可能的内容格式来进行识别。如果参数个数比较多，参数值的格式要求比较松，那识别起来将会非常的麻烦。

reStructuredText没有这样的问题，它有明确的扩展方式，通过role和directive，分别是行内和区块扩展。directive的格式非常清晰，匿名或者是必备的参数、可选的命名的参数、内容段落等等。

另外reStructuredText直接提供了众多的role和directive，比如LaTeX公式，甚至可以直接通过选项来控制是否使用MathJax来渲染LaTeX公式。在改用reStructuredText后，发现之前启用的很多插件都没有必要了，reStructuredText已经提供了支持。

reStructuredText的段落嵌套非常的强大，而Markdown似乎忘记了这一点。

当然Markdown也有比reStructuredText强大的地方，最明显的就是Markdown行内格式的嵌套非常方便。用\ `***`\ 包围起来的文字会同时有粗体和斜体效果。reStructuredText到目前还不太支持role的嵌套，想要做出同时粗体和斜体的文字，或者粗体的链接，都是比较困难或者麻烦的。还有其他一些小的细节，我就不具体说了。

总的来说，Markdown更简洁，更适合于书写纯文字的东西；reStructuredText更强大，适合于书写复杂的技术文章。

革命尚未成功
============

新版的博客已经上线了，但仍然有一些工作需要进行。

-   MathJax插件：reStructuredText内置了对LaTeX公式的支持，行内公式用\ `math role`_\ 实现，区块公式用\ `math directive`_\ 实现，而且通过\ `--math-output`_\ 配置可以让它用MathJax进行渲染。但是MathJax是要在浏览器里执行JavaScript的，如果无法执行JavaScript（比如在RSS中）就没法正常显示了。之前在WordPress中，利用插件先生成图片，如果无法执行JavaScript就会直接显示图片。所以这里也需要一个类似的插件，在编译的时候生成图片备用。
-   Graphviz插件：Pelican中似乎没有直接能用的graphviz directive，需要去找一个或者写一个插件。在编译的时候调用dot命令生成好图片就可以了。
-   Chart插件：有时候提供一些数据的展示，图表是非常必需的。之前都是先用Excel或这Mathematica之类的软件画好，再把图片放上去。如果有插件直接把数据通过JavaScript展示出来就更好了。准备写个插件，调用\ `NVD3`_\ 进行绘图。
-   Featured Image：WordPress自带了这个，而且大多数主题都支持它，就是每篇文章有一张特色图片。这个需要去考察一下看看有没有现成的插件，当然主题也需要能够支持它。
-   系列文章插件：系列文章是个很好的东西，把一系列非常相关的文章按照时间组织在一起。之前就一直在用，Pelican倒是也有一个相关的插件，但还不完全是我想要的。等有空的时候再研究研究。
-   主题：对CSS的把控力几乎为零，所以主题的制作还是很让人头疼的一件事情。我会继续寻找一个更好的主题，或者如果有精力，会考虑自己做一个主题。

.. _GoCalf博客: http://www.gocalf.com/blog
.. _WordPress: http://wordpress.org/
.. _Pelican: http://blog.getpelican.com/
.. _Octopress: http://octopress.org/
.. _Markdown: http://daringfireball.net/projects/markdown/
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
.. _TiddlyWiki: http://tiddlywiki.com/
.. _DropBox: https://www.dropbox.com/
.. _OneNote: http://office.microsoft.com/en-us/onenote/
.. _Evernote: https://evernote.com/
.. _有道云笔记: http://note.youdao.com/
.. _CodeColorer: http://wordpress.org/plugins/codecolorer/
.. _Disqus: http://disqus.com/
.. _Jekyll: http://jekyllrb.com/
.. _Octopress Sites: https://github.com/imathis/octopress/wiki/Octopress-Sites
.. _Pelican Sites: https://github.com/getpelican/pelican/wiki/Powered-by-Pelican
.. _linking to internal content: http://docs.getpelican.com/en/latest/getting_started.html#linking-to-internal-content
.. _translations: http://docs.getpelican.com/en/latest/getting_started.html#translations
.. _Octopress Theme for Pelican: http://docs.getpelican.com/en/latest/getting_started.html#translations
.. _Image Tag: http://octopress.org/docs/plugins/image-tag/
.. _math directive: http://docutils.sourceforge.net/docs/ref/rst/directives.html#math
.. _math role: http://docutils.sourceforge.net/docs/ref/rst/roles.html#math
.. _--math-output: http://docutils.sourceforge.net/docs/user/config.html#math-output
.. _NVD3: http://nvd3.org/
