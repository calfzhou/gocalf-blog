Sandbox
#######
:date: 2011-07-10 23:30
:author: Calf
:slug: sandbox

什么情况

[wptabs]

[wptabtitle]First tab[/wptabtitle]

[wptabcontent]so, how about this sentense. well,

actually we don't need tabcont tag here.

Noooo.... We still need tabcont tag. without it, BRs will be removed.

v\_v[/wptabcontent]

[wptabtitle]Second tab[/wptabtitle]

[wptabcontent]But the content must be in a new line.

dasd x[/wptabcontent]

[/wptabs]

what?

It's ok now.

cool.

[latex]key\_i={r\_i}^{1/w\_i}[/latex]

asdasdasd

 

NumberOfOccurrences(Q, Doc1) = NumberOfOccurrences(Q, Doc1) = 3

After applying weighting:

NumberOfOccurrences(Q, Doc1) = NumberOfOccurrences(A1, Doc1) \* 10 / 10
+ NumberOfOccurrences(A2, Doc1) \* 6 / 10 = 1 \* 10 / 10 + 2 \* 6 / 10 =
2.2

NumberOfOccurrences(Q, Doc2) = NumberOfOccurrences(A1, Doc2) \* 10 / 10
+ NumberOfOccurrences(A2, Doc2) \* 6 / 10 = 2 \* 10 / 10 + 1 \* 6 / 10 =
2.6

基于这个想法，我们来看看这个算法是什么样子的：

[wptabs]

[wptabtitle]Python[/wptabtitle]

::

    [wptabcontent][ccne_python]def Rand3(): x = -1
      while not 0 <= x < 3:
        x = Rand5()
      return x[/ccne_python][/wptabcontent]

[wptabtitle]C++[/wptabtitle]

::

    [wptabcontent][ccne_cpp]int Rand3()
    {
        int x;
        do
        {
            x = Rand5();
        } while (x >= 3);
        return x;
    }[/ccne_cpp][/wptabcontent]
    [/wptabs]

怎么回事？

::

    [ccne_cpp]int Rand3()
    {
        int x;
        do
        {
            x = Rand5();
        } while (x >= 3);
        return x;
    }[/ccne_cpp]

算法很简单，x是我们最终要输出的数字，只要它不在[0,
3)范围内，就不断地调用Rand5来更新它。直观地看，算法输出的数字只有0、1、2这三个，而且对任何一个都没有偏袒，那么显然每个数字的概率都是1/3，那让我们来严格地计算一下。

[wptabs]

[wptabtitle]First tab[/wptabtitle]

[wptabcontent]so, how about this sentense. well,

actually we don't need tabcont tag here.

Noooo.... We still need tabcont tag. without it, BRs will be removed.

First tab content, blah blah

haad

ak

xl

dglsjglsd gl

v\_v[/wptabcontent]

[wptabtitle]Second tab[/wptabtitle]

[wptabcontent]But the content must be in a new line.

Another tab, asdlasdla alsdjalsd ala

a

s

d

dasd x[/wptabcontent]

[/wptabs]

hi, this is "sand box", try something.

.. raw:: html

   <table class="table1">

.. raw:: html

   <tbody>

.. raw:: html

   <tr>

.. raw:: html

   <th>

ID

.. raw:: html

   </th>

.. raw:: html

   <th>

Name

.. raw:: html

   </th>

.. raw:: html

   <th>

Info

.. raw:: html

   </th>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td>

1

.. raw:: html

   </td>

.. raw:: html

   <td>

s

.. raw:: html

   </td>

.. raw:: html

   <td>

asd asdaf a

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td>

2

.. raw:: html

   </td>

.. raw:: html

   <td>

g

.. raw:: html

   </td>

.. raw:: html

   <td>

uko tsdrts

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td>

3

.. raw:: html

   </td>

.. raw:: html

   <td>

z

.. raw:: html

   </td>

.. raw:: html

   <td>

d sdf s asdfa

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

 

 

 
