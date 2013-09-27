Title: 关于LaTeX插件再啰嗦几句
Date: 2011-07-11 23:43
Author: Calf
Category: 建站
Tags: LaTeX, PHP, Plugin, WordPress, WordPress Plugin
Slug: latex-plugin-more

在[WordPress数学公式插件LaTeX][]中推荐了Zhiqiang同学的WordPress插件LaTeX
for
WordPress，这个插件可以方便地以MathJax或者图片方式展示文章中的[latex]\\LaTeX[/latex]公式，效果美观，使用方便。

不过由于使用习惯不同，我在使用这个插件的过程中也遇到了一些问题，于是对这个插件做了一点小小的修改，记录在此。

这次修改主要要解决两个问题：

1.  在启用MathJax的情况下，修复\$\$...!\$\$无法显示公式源码的问题。
2.  限制公式的修饰符为[<!-- -->latex]和[/latex]

<!--more-->

根据[LaTeX for
WordPress][]主页上的说明，如果不想对公式进行渲染，只显示公式的源码，需要在第二个\$\$前面加!。但在实际使用中发现开启了MathJax的时候无法实现这一效果。仔细看了一下MathJax的文档，原来虽然插件把[cci]\$\$a\^2+b\^2+c\^2!\$\$[/cci]这样的代码转换成了[cci]\\(a\^2+b\^2+c\^2!\\)[/cci]，但后者又被MathJax的JavaScript给渲染成[latex]a\^2+b\^2+c\^2[/latex]了。而要解决这个问题也很简单，只要给页面的body标签添加一个tex2jax\_ignore的class，就可以阻止MathJax的处理（参见[The
tex2jax Preprocessor][]）。

以我现在使用的LightWord主题为例，修改/wp-content/themes/lightword/header.php，把[cce\_php]\<body
\<?php body\_class(); ?\>\>[/cce\_php]改成[cce\_php]\<body \<?php
body\_class('tex2jax\_ignore'); ?\>\>[/cce\_php]即可。

至于公式的修饰符，插件支持\\(...\\)、\\[...\\]、\$\$...\$\$、[<!-- -->latex]...[/latex]、[tex]...[/tex]。虽然Zhiqiang推荐使用LaTeX的自有标记\\(
...\\)，但我还是担心这样的代码在一些程序源代码中也很容易出现（比如正则表达式），所以还是决定只用latex作为标记。这个修改很简单，只要对/wp-content/plugins/latex/latex.php（v3.1）做如下改动即可：

    [cce_diff]108c108,109
    < $regex = '#\$\$(.*?)\$\$#si';
    ---
    > //$regex = '#\$\$(.*?)\$\$#si';
    > $regex = '#\[latex\](.*?)\[/latex\]#si';
    110c111
    < $toParse = str_replace(array("\(", "\)", "\[", "\]", "[latex]", "[tex]", "[/latex]", "[/tex]"), array("$$", " $$", "$$!", " $$", "$$", " $$", "$$", " $$"), $toParse);
    ---
    > //$toParse = str_replace(array("\(", "\)", "\[", "\]", "[latex]", "[/latex]", "[tex]", "[/tex]"), array("$$", " $$", "$$!", " $$", "$$", " $$", "$$", " $$"), $toParse);
    [/cce_diff]

这样修改之后，依旧支持插件原本的inline、single
line以及显示源码的处理。要在单独的一行中显示公式，就在[<!-- -->latex]后面加!；如果要显示公式源码，就在[/latex]前面加!。

当然也期待Zhiqiang进一步完善插件，给用户提供更方便的设置选项。

  [WordPress数学公式插件LaTeX]: http://www.gocalf.com/blog/latex-wordpress.html
    "WordPress数学公式插件LaTeX"
  [LaTeX for WordPress]: http://wordpress.org/extend/plugins/latex/
    "LaTeX for WordPress"
  [The tex2jax Preprocessor]: http://www.mathjax.org/docs/1.1/options/tex2jax.html
    "The tex2jax Preprocessor"
