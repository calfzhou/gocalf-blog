让页面中嵌入的SVG图片可以缩放
#############################
:date: 2013-11-19 21:52
:modified: 2013-11-19 21:52
:author: Calf
:category: 建站
:tags: HTML, SVG
:keywords: Scalable Vector Graphics, Auto Scale
:slug: scale-embedded-svg
:lang: zh
:featured_image: http://www.gocalf.com/blog/images/2013/11/scale_svg.png
:summary: 在HTMl页面中用<object>标签嵌入的SVG图片如何能跟随窗口大小自动缩放呢？

以前不知道出于什么原因，一直仅仅钟爱于PNG图片，对矢量图完全没有兴趣。最近突然觉得矢量图才是王道啊。

我目前主要使用\ `SVG（Scalable Vector Graphics）`_\ 格式的矢量图，而且把以前的一些位图附件也用SVG重绘了。

随即发现一个问题，位图会随着页面宽度的变窄而自动缩小，但是SVG图片却并没有变化，页面宽度变窄后，它们就害羞似的藏起一半脸来。怎么让SVG图片也能随着页面宽度变化而自动缩放呢？

.. more

这里主要针对已经以\ ``.svg``\ 扩展名保存的SVG图片文件。把这种格式的图片嵌入到HTML页面中主要有\ `三种方法`_\ ，即用\ ``<embed>``\ 、\ ``<object>``\ 或者\ ``<iframe>``\ 标签，具体的语法分别是：

.. code-block:: html
    :linenos: none

    <embed src="path-to-image.svg" type="image/svg+xml" />
    <object data="path-to-image.svg" type="image/svg+xml"></object>
    <iframe src="path-to-image.svg"></iframe>

当然，对于大多数浏览器，你也可以直接用\ ``<img>``\ 标签，即：

.. code-block:: html
    :linenos: none

    <img src="path-to-image.svg" alt="some text"/>

如果用\ ``<img>``\ 标签，那事情就简单了，它跟其他\ ``<img>``\ 标签里的位图一样，都可以在CSS的控制下随着页面而缩放，当然跟位图不同的是，它在缩放的时候不会有锯齿出现。

通常情况下，还是推荐使用\ ``<object>``\ 标签来嵌入SVG图片，\ `reStructuredText`_\ 中默认的\ `figure directive`_\ 和\ `image directive`_\ 在遇到SVG图片时也是使用\ ``<object>``\ 标签的。

用\ ``<object>``\ 标签的时候，SVG图片似乎就不会随着该标签的宽度和高度设置而有任何缩放，比如下面这张图。

.. figure:: {filename}/images/2013/11/svg_demo.svg
    :alt: svg_demo

    不会随着页面宽度而缩放的SVG图片

在询问了万能的Google之后，发现了解决的办法。原来如果SVG的根结点如果设置了\ ``width``\ 和\ ``height``\ 属性，图片就不会自动缩放，所要做的就是去掉这两个属性（在\ `Inkscape`_\ 中删除它们会使得它们被修改为\ ``100%``\ ），然后根据图片中内容所占用的区域，设置\ ``viewBox``\ 。有人说还要设置\ ``preserveAspectRatio``\ ，不过我还没有仔细研究这个属性的具体影响，反正目前看起来加不加都行。

.. code-block:: text
    :linenos: none

    preserveAspectRatio="xMinYMin meet"
    viewBox="0 0 {width} {height}"

把其中的\ ``{width}``\ 和\ ``{height}``\ 用实际的数值替换掉就可以了。

用这个方法处理一下上面那张图，可以看到它填满整个正文区宽度了：

.. figure:: {filename}/images/2013/11/svg_demo_scale.svg
    :alt: svg_demo_scale

    会随着页面宽度而缩放的SVG图片

好像还有点儿不太对劲儿，一般的位图嵌入页面后，如果页面足够宽，它也只是按照它自身的宽度和高度展示，但上面这张矢量图却总是占满全部宽度，有时候它有点儿太大了。

解决的办法很简单，给这个\ ``<object>``\ 标签添加一个\ ``width``\ 属性，指定好默认的宽度就可以了。\ `reStructuredText`_\ 中的\ `figure directive`_\ 和\ `image directive`_\ 都可以非常方便地指定图片的宽度（或高度）。添加之后的效果如下：

.. figure:: {filename}/images/2013/11/svg_demo_scale.svg
    :alt: svg_demo_scale
    :width: 491

    会随着页面宽度而缩放，但是又不会变得过大的SVG图片

看起来好像跟第一张图片一样啊。

关键的区别在于，我们可以通过CSS来指定矢量图的最大宽度，让它不要超出页面（或者父级区块）的范围，比如：

.. code-block:: css
    :linenos: none

    object[type="image/svg+xml"] {
        max-width: 100%;
    }

你可以试着改变浏览器窗口大小来查看效果。当窗口很窄的时候，第三张图会跟着缩小，但第一张图不会。

.. _SVG（Scalable Vector Graphics）: http://www.w3.org/Graphics/SVG/
.. _三种方法: http://www.w3schools.com/svg/svg_inhtml.asp
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
.. _figure directive: http://docutils.sourceforge.net/docs/ref/rst/directives.html#figure
.. _image directive: http://docutils.sourceforge.net/docs/ref/rst/directives.html#image
.. _Inkscape: http://inkscape.org/
