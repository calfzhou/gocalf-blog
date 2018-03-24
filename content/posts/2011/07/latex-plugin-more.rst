关于LaTeX插件再啰嗦几句
#######################
:date: 2011-07-11 23:43
:modified: 2011-08-03 20:52
:author: Calf
:category: 建站
:tags: WordPress LaTeX, WordPress Plugin
:keywords: MathJax, LaTeX for WordPress, LaTeX
:slug: latex-plugin-more
:lang: zh_cn
:featured_image: http://www.gocalf.com/blog/images/2011/07/tex.png
:summary: 对LaTeX for WordPress插件做了一点小小的改动，修复了在启用MathJax时无法显示公式源码的问题。还将公式的shortcode限定为latex。
:depends: mathjax

.. role:: php(code)
    :language: php

在\ `WordPress数学公式插件LaTeX`_\ 中推荐了Zhiqiang同学的WordPress插件\ `LaTeX for WordPress`_\ ，这个插件可以方便地以MathJax或者图片方式展示文章中的LaTeX公式，效果美观，使用方便。

不过由于使用习惯不同，我在使用这个插件的过程中也遇到了一些问题，于是对这个插件做了一点小小的修改，记录在此。

这次修改主要要解决两个问题：

#. 在启用MathJax的情况下，修复\ ``$$...!$$``\ 无法显示公式源码的问题。
#. 限制公式的修饰符为\ ``[latex]``\ 和\ ``[/latex]``\ 。

.. more

根据\ `LaTeX for WordPress`_\ 主页上的说明，如果不想对公式进行渲染，只显示公式的源码，需要在第二个\ ``$$``\ 前面加\ ``!``\ 。但在实际使用中发现开启了MathJax的时候无法实现这一效果。仔细看了一下MathJax的文档，原来虽然插件把\ ``$$a^2+b^2+c^2!$$``\ 这样的代码转换成了\ ``\(a^2+b^2+c^2!\)``\ ，但后者又被MathJax的JavaScript给渲染成\ :math:`a^2+b^2+c^2`\ 了。而要解决这个问题也很简单，只要给页面的body标签添加一个tex2jax\_ignore的class，就可以阻止MathJax的处理（参见\ `The tex2jax Preprocessor`_\ ）。

以我现在使用的LightWord主题为例，修改/wp-content/themes/lightword/header.php，把\ :php:`<body <?php body\_class(); ?>>`\ 改成\ :php:`<body <?php body\_class('tex2jax\_ignore'); ?>>`\ 即可。

至于公式的修饰符，插件支持\ ``\(...\)``\ 、\ ``\[...\]``\ 、\ ``$$...$$``\ 、\ ``[latex]...[/latex]``\ 、\ ``[tex]...[/tex]``\ ，但我还是担心这样的代码在一些程序源代码中也很容易出现（比如正则表达式），所以还是决定只用latex作为标记。这个修改很简单，只要对/wp-content/plugins/latex/latex.php（v3.1）做如下改动即可：

.. code-block:: diff
    :linenos: none

    108c108,109
    < $regex = '#\$\$(.*?)\$\$#si';
    ---
    > //$regex = '#\$\$(.*?)\$\$#si';
    > $regex = '#\[latex\](.*?)\[/latex\]#si';
    110c111
    < $toParse = str_replace(array("\(", "\)", "\[", "\]", "[latex]", "[tex]", "[/latex]", "[/tex]"), array("$$", " $$", "$$!", " $$", "$$", " $$", "$$", " $$"), $toParse);
    ---
    > //$toParse = str_replace(array("\(", "\)", "\[", "\]", "[latex]", "[/latex]", "[tex]", "[/tex]"), array("$$", " $$", "$$!", " $$", "$$", " $$", "$$", " $$"), $toParse);

这样修改之后，依旧支持插件原本的inline、single
line以及显示源码的处理。要在单独的一行中显示公式，就在\ ``[latex]``\ 后面加\ ``!``\ ；如果要显示公式源码，就在\ ``[/latex]``\ 前面加\ ``!``\ 。

当然也期待Zhiqiang进一步完善插件，给用户提供更方便的设置选项。

.. _WordPress数学公式插件LaTeX: {filename}latex-wordpress.rst
.. _LaTeX for WordPress: http://wordpress.org/extend/plugins/latex/
.. _The tex2jax Preprocessor: http://www.mathjax.org/docs/1.1/options/tex2jax.html
