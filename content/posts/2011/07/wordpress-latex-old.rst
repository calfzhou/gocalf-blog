为你的WordPress站点添加LaTeX支持
################################
:date: 2011-07-02 23:55
:modified: 2011-08-03 22:20
:author: Calf
:category: 建站
:tags: WordPress LaTeX, WordPress Plugin
:keywords: LaTeX, MimeTex
:slug: wordpress-latex-old
:lang: zh
:featured_image: http://www.gocalf.com/blog/images/2011/07/wordpress_latex.png
:summary: 如果你的博客跟我们这个一样，也是用WordPress系统搭建的；如果你跟我一样，也希望可以在Blog中用LaTeX书写数学公式，那么这篇文章或许对你有所帮助。

注：本文是通过Google
Reader从已故的博客\ `钟磬居`_\ （链接已失效）中恢复出来的（原文地址\ http://www.zhongqingju.com/?p=604\ ）。目前在GoCalf博客中效力的LaTeX插件是\ `Zhiqiang`_\ 开发的\ `LaTeX for WordPress`_\ 。相关内容请见：\ `WordPress数学公式插件LaTeX`_\ 。

======== 分隔符 ========

- 关键词：WordPress，Blog，LaTeX，插件；
- 适用人群：了解LaTex，需要在WordPress搭建的Blog内用LaTeX书写数学公式的人；
- 平台：WordPress 2.x。

如果你的博客跟我们这个一样，也是用WordPress系统搭建的；如果你跟我一样，也希望可以在Blog中用LaTeX书写数学公式，那么这篇文章或许对你有所帮助。

我们这个博客没有内建的对LaTeX的支持，为了能够在文章中显示数学公式，有三种方法可以使用：

#. 利用LaTeX软件或在线服务（如\ `mimetex`_\ ，\ `LaTeX Equation Editor`_\ ）生成公式的图片，将图片上传到自己的站点或者PicasaWeb，然后在文章中插入该图片；
#. 为自己的站点安装LaTeX的相关软件，使其可以解析LaTeX并生成图片；
#. 利用插件（\ `dahnielson\_mimetex`_\ ），动态地向公开的服务发出请求，获取公式图片并显示。

.. more

如果你一年也写不了一两个数学公式，那么用第一种方法最方便了，避免了在服务器上安装各种各样的软件或插件。但如果需要频繁写公式，那这个方法显然太麻烦，每个公式要到生成一张图片，上传，插入；修改公式的时候还要再重复一遍。

第二个方法比较可靠的，但也相当麻烦（对于我这种新手来说）。需要在服务器上安装LaTeX和ImageMagick这两个软件，然后\ `下载wp-latexrender插件`_\ 并安装，进行一系列配置之后，你的站点就可以解析LaTeX并生成图片了。如果你的服务器上已经装了这两个软件，那就不用等了，直接用吧，要不然的话还是看看下一个方法。

第三个方法是用\ `dahnielson\_mimetex`_\ 插件，它会向指定的服务器发送请求，获取公式所对应的图片。可惜插件默认使用的服务失效了，如果你的站点可以执行cgi程序，那么可以访问\ `这里`_\ 了解如何安装cgi
mimetex。如果你的站点没法执行cgi程序，那么可以试一试我现在使用的方法：

wordpress.com的用户都可以在博客中使用一对\ ``$``\ 来书写LaTeX，在\ http://support.wordpress.com/latex/\ 中有介绍。我的方法就是修改dahnielson\_mimetex，让其调用wordpress.com的LaTeX服务来生成图片。由于后者比mimetex多了一些控制图片颜色和大小的参数，因此要在dahnielson\_mimetex中做出相应的修改。

首先下载\ `dahnielson\_mimetex v1.2`_\ ，将其安装到博客上，然后对其进行如下的编辑。

一共只有五处简单的修改，第一处是修改description，把新加的参数写进去，以免日后忘记：

.. code-block:: diff
    :linenos: none

    5,7c5,7
    < Description: Use &lt;tex&gt;&lt;/text&gt; tags to embed LaTeX math in posts, see the <a href="http://www.forkosh.com/mimetex.html">mimeTeX manual</a> for details.
    < Version: 1.2
    < Author: Anders Dahnielson
    ---
    > Description: Use &lt;tex bg="000000~ffffff" fg="000000~ffffff" sz="-4~4" escaped="true|false"&gt;&lt;/tex&gt; tags to embed LaTeX math in posts.
    > Version: 1.2.1
    > Author: Anders Dahnielson; Modified by calf (April 12, 2009)

这个插件最初的语法只是\ ``<tex></text>``\ ，我给它添加了四个参数：

bg
    设定图片的背景色，格式为六个十六进制字符，范围000000到ffffff，默认值为ffffff即白色
fg
    设定图片的前景色，格式为六个十六进制字符，范围000000到ffffff，默认值为000000即黑色
sz
    设定图片的大小，格式为整数，范围-4到4，默认值为0即正常大小
escaped
    设定公式中的<、>、&等符号是否是html转义的（即用&lt;、&gt;、&amp;表示），可取值为true或false，默认值为false即未转义的

第二处修改是正则表达式，在dahnielson\_mimetex类的parse函数中，修改过的正则表达式可以匹配刚刚提到的四个参数：

.. code-block:: diff
    :linenos: none

    32c32,33
    < $regex = '#<tex>(.*?)</tex>#si';
    ---
    > $regex = '#<tex(?:s|bg=["']([w]+)["']|fg=["']([w]+)["']|'.
    > 'sz=["']([0-9+-]+)["']|escaped=["'](true|false)?["'])*>(.*?)</tex>#si';

第三处修改是提取公式文本和参数，也就是对上面正则表达式的匹配结果做处理：

.. code-block:: diff
    :linenos: none

    38,40c39,50
    < $formula_text = $match[1];
    < $formula_hash = md5($formula_text);
    < $formula_filename = 'tex_'.$formula_hash.'.gif';
    ---
    > $formula_bg = $match[1];
    > if (!$formula_bg) $formula_bg = 'ffffff';
    > $formula_fg = $match[2];
    > if (!$formula_fg) $formula_fg = '000000';
    > $formula_sz = $match[3];
    > if (!$formula_sz) $formula_sz = '0';
    > $escaped = $match[4];
    > $formula_text = $match[5];
    > if ($escaped == 'true') $formula_text = htmlspecialchars_decode($formula_text);
    > $formula_text_html = htmlspecialchars($formula_text);
    > $formula_hash = md5($formula_text.'_'.$formula_bg.'_'.$formula_fg.'_'.$formula_sz.'_1.2.1');
    > $formula_filename = 'tex_'.$formula_hash.'.png';

这里我添加了一个变量\ ``$formula_text_html``\ ，用来记录html转义过的公式内容，稍后会看到这样做的目的。

第四处是设置LaTeX服务地址，原先forkosh.dreamhost.com的服务已经不能用了（很简短的公式还行，稍微复杂的公式都没法得到想要的结果），改成l.wordpress.com的服务：

.. code-block:: diff
    :linenos: none

    49c59,61
    < $mimetex_host = curl_init('http://www.forkosh.dreamhost.com/cgi-bin/mimetexpublic.cgi?formdata='.urlencode($formula_text));
    ---
    > $req_url = 'http://l.wordpress.com/latex.php?latex='.urlencode($formula_text).
    > '&bg='.urlencode($formula_bg).'&fg='.urlencode($formula_fg).'&s='.urlencode($formula_sz);
    > $mimetex_host = curl_init($req_url);

最后一处修改是展示获取到的图片。我给img标签加了class属性，便于修改样式。添加了title属性，当鼠标放在图片上时，可以看到公式内容。注意这里alt和title都是用html转义后的公式内容，这样可以避免公式中的一些特殊字符把html结构搞乱：

.. code-block:: diff
    :linenos: none

    58c70
    < return "<img src="$cache_formula_url" alt="$formula_text" />";
    ---
    > return "<img class="mimetex" src="$cache_formula_url" alt="$formula_text_html" title="$formula_text_html" />";

- 下载\ `修改前的插件 <{filename}/assets/2011/07/dahnielson_mimetex_v12.zip>`_\ （MD5：61aa23a9907c8fb777ef61c186070878）；
- 下载\ `修改后的插件 <{filename}/assets/2011/07/dahnielson_mimetex_v121.zip>`_\ （MD5：3d17d45b6f2375d9ded05988bfa470c0）。

修改好后就可以使用了，如果是第一次用这个插件，别忘了给你的站点开一个有写权限的cache目录（/wp-content/cache/）。

试用一下吧，在文章中输入这样的内容：

.. code-block:: latex
    :linenos: none

    <tex fg="0000ff" sz="2">\begin{array}{rcl}
    p & = & \frac{1}{5}+\frac{2}{5}\times\left(\frac{1}{5}+\frac{2}{5}\times\left(\frac{1}{5}+\frac{2}{5}\times\left(\cdots\right)\right)\right) \\
    & = & \frac{1}{5}\times\sum_{i=0}^\infty \left(\frac{2}{5}\right)^i \\
    & = & \frac{1}{5}\times\frac{1}{1-\frac{2}{5}} \\
    & = & \frac{1}{5}\times\frac{5}{3} \\
    & = & \frac{1}{3}
    \end{array}</tex>

可以得到图片：

.. image:: {filename}/images/2011/07/0313Freq.gif
    :alt: 0313Freq.gif

.. _钟磬居: http://www.zhongqingju.com
.. _Zhiqiang: http://zhiqiang.org/
.. _LaTeX for WordPress: http://wordpress.org/extend/plugins/latex/
.. _WordPress数学公式插件LaTeX: {filename}latex-wordpress.rst
.. _mimetex: http://www.forkosh.com/mimetex.html
.. _LaTeX Equation Editor: http://www.codecogs.com/components/equationeditor/equationeditor.php
.. _dahnielson\_mimetex: http://en.dahnielson.com/2006/09/mimetex-plugin.html
.. _下载wp-latexrender插件: http://sixthform.info/steve/wordpress/wp-content/uploads/wp-latexrender.zip
.. _这里: http://www.forkosh.com/mimetex.html
.. _dahnielson\_mimetex v1.2: http://en.dahnielson.com/2006/09/mimetex-plugin.html
