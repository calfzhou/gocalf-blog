Excel从右向左查找
#################
:date: 2013-04-03 18:09
:modified: 2013-04-03 18:09
:author: Calf
:category: 有用知识
:tags: Excel, Excel字符串查找, Excel技巧, Find from Right, rfind
:slug: excel-find-from-right
:summary: 今天看一个小问题，是前几天遇到的，就是要在Excel里面实现从右向左查找。比如给定字符串“abc,defg,hi,jkl”，需要找到最右一个逗号的位置（即12），或者最右一个逗号右边的部分（即“jkl”）。

发现我已经有几乎整整一年没更新博客了。在Google
Reader都快要关闭的时代，个人博客还有多少存在的意义呢。

今天看一个小问题，是前几天遇到的，就是要在Excel里面实现从右向左查找。比如给定字符串“abc,defg,hi,jkl”，需要找到最右一个逗号的位置（即12），或者最右一个逗号右边的部分（即“jkl”）。

.. more

Excel里面字符串查找用的\ `FIND`_\ 函数，只能从左向右（可以指定起始位置）地进行字符串查找。如果想要找到最右边的待查字符串，就要稍微费点儿劲儿了。为了方便起见，下面称待查字符串为分隔符。

如果分隔符的个数是已知且确定的（比如IP地址中的小数点），可以通过多个FIND函数嵌套来实现。但这个其实是\ ***从左到右查找第n个***\ 。如果分隔符的个数不确定，这个方法就不太合适的。

我的处理方法是这样的，假设单元格A1存放着包含分隔符的完整字符串（如上面提到的“abc,defg,hi,jkl”），那么查找最右一个逗号的公式为：

.. code-block:: text
    :linenos: none

    =FIND(CHAR(1),SUBSTITUTE(A1,",",CHAR(1),LEN(A1)-LEN(SUBSTITUTE(A1,",",""))))

这个公式的结果显然是12。

看起来很复杂，其实一步步拆解开并不是太难，基本的原理是这样的：

#. ``SUBSTITUTE(A1,",","")``：把原字符串中的逗号全部删除（替换成空字符串），得到临时字符串text1；
#. ``LEN(A1)-LEN(text1)``：用原字符串的长度减去text1的长度，即可知道原字符串中总共有多少个逗号，num2；
#. ``SUBSTITUTE(A1,",",CHAR(1),num2)``：利用SUBSTITUE函数，把原字符串中的最后一个逗号替换成特殊字符CHAR(1)，得到临时字符串text3；
#. ``FIND(CHAR(1),text3)``：在text3中查找特殊字符CHAR(1)，其位置就是原字符串中最后一个逗号的位置pos。

真是一个奇妙的方法。

找到位置后，要取出左边或者右边的内容就很简单了，公式分别是（用pos代替那个复杂的FIND函数）：``=LEFT(A1,pos-1)``，``=RIGHT(A1,LEN(A1)-pos)``。

补充：

上面那个公式只是适用于单个字符的查找，如果分隔符是多个字符，就需要稍微修改一下。假设单元格B1里面存放着分隔符本身，那么公式可以修改为：

.. code-block:: text
    :linenos: none

    =FIND(CHAR(1),SUBSTITUTE(A1,B1,CHAR(1),(LEN(A1)-LEN(SUBSTITUTE(A1,B1,"")))/LEN(B1)))

唯一的变化就是上述的第2步，原字符串的长度减去text1的长度后，要除以分隔符本身的长度，才是分隔符的个数。

在这种情况下，取（最右分隔符）右边的子串的公式也要相应地修改为：``=RIGHT(A1,LEN(A1)+1-LEN(B1)-pos)``。

.. _FIND: http://office.microsoft.com/en-au/excel-help/find-findb-functions-HP010342526.aspx
