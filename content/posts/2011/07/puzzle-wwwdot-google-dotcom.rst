数学趣题 WWWDOT-GOOGLE=DOTCOM
#############################
:date: 2011-07-13 22:49
:modified: 2011-08-03 20:56
:author: Calf
:category: 数学
:tags: Puzzle, Google
:keywords: 智力题, Math Puzzle, WWW DOT GOOGLE DOT COM
:slug: puzzle-wwwdot-google-dotcom
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/07/google_puzzle.png
:summary: 一道关于 Google 的数字游戏题。
:depends: mathjax

以前见到一道关于 Google 的数字游戏题目，要求解开隐秘的等式 ``WWWDOT - GOOGLE = DOTCOM``，每个字母代表十个阿拉伯数字中的一个且各不相同，每个六位数字最高位都不是 0，当然显而易见地，E 和 M 是可以互换的。对于一个程序员，解决这个问题是很容易的，但今天我要讲讲小学生是怎么解决这个问题的。

.. more

把目标等式写成小学生习惯的竖式：

.. math::

    \begin{matrix}
    & W & W & W & D & O & T\\
    - & G & O & O & G & L & E\\
    \hline & D & O & T & C & O & M
    \end{matrix}

先罗嗦一下，对于竖式中的任何一列，X - Y = Z，只有四种情况：

#. 没有被低位借位，也不向高位借位，也就是真正的 X - Y = Z；
#. 没有被低位借位，但向高位借了一位，即 (10+X) - Y = Z，或记做 :math:`X_{+} - Y = Z`；
#. 被低位借位，但不向高位借位，即 (X-1) - Y = Z，或记做 :math:`X^{-} - Y = Z`；
#. 被低位借位，也向高位借位，即 (10+X-1) - Y = Z，或记做 :math:`X^{-}_{+} - Y = Z`。

接下来就找竖式中的特殊情况。先看十位 O - L = O，在上述四种情况中，只有两种是可能的，即 :math:`O^{-}_{+} - L = O\Rightarrow L=9` 和 :math:`O - L = O \Rightarrow L=0`。

然后看千位和万位，被减数都是 W，减数都是 O，但结果却不同，说明在这两位的借位情况肯定不一样，也就只有两种可能，再结合前面提到的十位上的两种情况，可以得到：

#.  :math:`W_{+}-O=T`，:math:`W^{-}_{+}-O=O`，:math:`W^{-}-G=D`

    #.  L = 0，T - E = M，D - G = C；
    #.  L = 9，:math:`T_{+} - E = M`，:math:`D^{-} - G = C`；
#.  :math:`W^{-}-O=T`，W - O = O，W - G = D`

    #.  L = 0，T - E = M，:math:`D_{+} - G = C`；
    #.  L = 9，:math:`T_{+} - E = M`，:math:`D^{-}_{+} - G = C`。

先看情况 1，可以推出：T = O + 1， W = 2 \* O - 9，G + D = W - 1，G < D（因为百位上的减法没有向千位借位）。再根据 W、O、D 都不能为零，因此有 1
<= G < D <= W - 2 <= 7，4 <= G + D + 1 = W = 2 \* O - 9 <=
8，于是 7 <= O <= 8，这样的话：

-  如果 O = 7，那么 G + D = 2 \* O - 10 =
   4，得到 G = 1，D = 3。那如果 L =
   9，就有 C = (D - 1) - G = 1 =
   G，不符合题目。如果 L = 0，则 C =
   2，E + M = T = O + 1 = 8 = (1 + 7) or (2 + 6) or (3 +
   5)，无法给 E、M 找到不重复的数字。
-  因此只能是 O = 8，T = 9，L = 0，又有 G + D = 5，D -
   G = C，可以得到 G、D、C 分别是 1、5、4。于是 E + M = T =
   9，得到 E、M 分别为 3、6 或者 6、3。得到此题的一组解。

用同样的方法分析情况 2，可以得到 W = 2 \* O，T = O - 1，G + D = W，G
> D ，因此有 1 <= D < G <= W - 1 <= 8，3 <= D +
E <= W = 2 \* O <= 9，得到 2 <= O <=
4。但是根据 C 与 D 和 G 的关系不难发现，不论 O、L 取什么值，都无法找到不重复的 C 值。因此第二种情况无解。

.. compound::

    综上，可以得到此问题唯一的一对解：O = 8，T = 9，W = 7，G = 1，D =
    5，L = 0，C = 4，{E, M} = {3, 6}，代入原方程得到：

    .. math::

        \begin{matrix}
        & 7 & 7 & 7 & 5 & 8 & 9\\
        - & 1 & 8 & 8 & 1 & 0 & 3\\
        \hline & 5 & 8 & 9 & 4 & 8 & 6
        \end{matrix}

    或者

    .. math::
        \begin{matrix}
        & 7 & 7 & 7 & 5 & 8 & 9\\
        - & 1 & 8 & 8 & 1 & 0 & 6\\
        \hline & 5 & 8 & 9 & 4 & 8 & 3
        \end{matrix}
