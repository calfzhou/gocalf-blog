WordPress数学公式插件LaTeX
##########################
:date: 2011-07-02 22:32
:modified: 2011-08-03 20:19
:author: Calf
:category: 建站
:tags: LaTeX, Plugin, WordPress, WordPress Plugin, 插件
:slug: latex-wordpress
:summary: 为WordPress添加数学公式。

几年前在我与几个同学一起维护的博客\ `钟磬居`_\ （链接已失效）中，我们使用了\ `dahnielson\_mimetex`_\ （链接已失效）来渲染LaTeX公式（原博文备份至：\ `为你的WordPress站点添加LaTeX支持`_\ ）。

当时提到三种在博客文章中显示LaTex公式的方法：

#. 利用LaTeX软件或在线服务（如\ `mimetex`_\ ，\ `LaTeX Equation Editor`_\ ）生成公式的图片，将图片上传到自己的站点或者PicasaWeb，然后在文章中插入该图片；
#. 为自己的站点安装LaTeX的相关软件，使其可以解析LaTeX并生成图片；
#. 利用插件（\ `dahnielson\_mimetex`_\ ），动态地向公开的服务发出请求，获取公式图片并显示。

这次还是采用第三种方法，只是改用了更为方便强大的插件：\ `Zhiqiang`_\ 开发的\ `LaTeX for WordPress`_\ （参见其博文：\ `在博客上写数学公式的插件LaTeX for WordPress`_\ ）。

.. more

`LaTeX for WordPress`_\ 的使用非常简单，这里就直接从其\ `主页`_\ 上抄袭过来：

    You can type the formula in LaTeX, in title, posts, pages and comments:
    
    -   ``\(\alpha+\beta\geq\gamma\)`` or ``$$\alpha+\beta\geq\gamma$$`` add an inline formula
    -   ``\[\alpha+\beta\geq\gamma\]`` or ``$$!\alpha+\beta\geq\gamma$$`` add an latex equation in math mode (it will be displayed centerly in a single line).
    -   ``$$\alpha+\beta\geq\gamma!$$`` display the source of the latex formula. Just add a ``!`` before the second ``$$``.


上面的公式显示为： :math:`\alpha+\beta\geq\gamma`

一个例子：

.. code-block:: latex

    $$\begin{array}{rcl}
    p & = & \frac{1}{5}+\frac{2}{5}\times\left(\frac{1}{5}+\frac{2}{5}\times\left(\cdots\right)\right) \\
    & = & \frac{1}{5}\times\sum_{i=0}^\infty \left(\frac{2}{5}\right)^i \\
    & = & \frac{1}{5}\times\frac{1}{1-\frac{2}{5}} \\
    & = & \frac{1}{5}\times\frac{5}{3} \\
    & = & \frac{1}{3}
    \end{array}$$

.. math::

    \begin{array}{rcl}
    p & = & \frac{1}{5}+\frac{2}{5}\times\left(\frac{1}{5}+\frac{2}{5}\times\left(\cdots\right)\right) \\
    & = & \frac{1}{5}\times\sum_{i=0}^\infty \left(\frac{2}{5}\right)^i \\
    & = & \frac{1}{5}\times\frac{1}{1-\frac{2}{5}} \\
    & = & \frac{1}{5}\times\frac{5}{3} \\
    & = & \frac{1}{3}
    \end{array}

另外这个插件默认并且推荐使用\ `MathJax`_\ 来渲染公式。\ `MathJax`_\ 是一个开源的基于JavaScript的公式渲染引擎。它使用CSS和网页中的字体来显示公式，而不是图片或者Flash。这带来的好处是公式内的文字是可以选取的，而且在缩放网页的时候，公式的字体也可同时被缩放。而且利用它的JavaScript还可以很方便地对整个公式进行缩放和拷贝。可以在MathJax网站上查看（\ http://www.mathjax.org/demos/copy-and-paste/\ ）如何把MathJax渲染出来的公式复制到Mathematica、Microsoft
Word、MathType和Wikipeida中。这里简单概括一下：

-  Mathematica：复制公式的MathML源代码（右键点击公式，选择Format->MathML，然后点击Show
   Source，在弹出的代码窗口中全选复制），在Mathematica中粘贴，软件将会自动识别出这是一个公式。
-  Microsoft
   Word：将公式的MathML源代码粘贴到Word中，然后在粘贴选择器（Paste
   Options）中选取仅保留文本（Paste Text Only）。
-  MathType：将公式的TeX源代码（在右键菜单中选择Format->TeX）粘贴到MathType中即可。
-  Wikipedia：将公式的TeX源码粘贴到Wikipedia编辑窗口中，放在\ ``<math></math>``\ 内即可。

如果是在Google
Reader中查看公式的文章，MathJax无法被载入，这种情况下插件还会提供图片格式的公式以便阅读。

另外插件提供了方便的后台设置，在博客后台可以直接修改公式图片和MathJax的服务器地址，可以设置打开或者关闭MathJax。

如果怕公开的LaTeX公式图片服务器或者MathJax服务器访问速度慢、被封、关闭等情况，也可以自己搭建相关的服务，然后在插件的设置中修改服务器地址即可。

.. _钟磬居: http://www.zhongqingju.com
.. _dahnielson\_mimetex: http://en.dahnielson.com/2006/09/mimetex-plugin.html
.. _为你的WordPress站点添加LaTeX支持: {filename}wordpress-latex-old.rst
.. _mimetex: http://www.forkosh.com/mimetex.html
.. _LaTeX Equation Editor: http://www.codecogs.com/components/equationeditor/equationeditor.php
.. _Zhiqiang: http://zhiqiang.org/
.. _LaTeX for WordPress: http://wordpress.org/extend/plugins/latex/
.. _在博客上写数学公式的插件LaTeX for WordPress: http://zhiqiang.org/blog/it/latex-for-wordpress.html
.. _主页: http://wordpress.org/extend/plugins/latex/
.. _MathJax: http://www.mathjax.org/
