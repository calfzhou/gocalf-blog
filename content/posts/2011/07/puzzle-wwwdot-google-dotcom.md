Title: 数学趣题WWWDOT-GOOGLE=DOTCOM
Date: 2011-07-13 22:49
Author: Calf
Category: 数学
Tags: Algorithm, Google, Math, Puzzle, 智力题
Slug: puzzle-wwwdot-google-dotcom

以前见到一道关于Google的数字游戏题目，要求解开隐秘的等式[cci]WWWDOT -
GOOGLE =
DOTCOM[/cci]，每个字母代表十个阿拉伯数字中的一个且各不相同，每个六位数字最高位都不是0，当然显而易见地，E和M是可以互换的。对于一个程序员，解决这个问题是很容易的，但今天我要讲讲小学生是怎么解决这个问题的。<!--more-->

把目标等式写成小学生习惯的竖式：

[latex]\\begin{matrix} & W & W & W & D & O & T\\\\ - & G & O & O & G & L
& E\\\\ \\hline & D & O & T & C & O & M\\end{matrix}[/latex]

先罗嗦一下，对于竖式中的任何一列，[cci]X - Y = Z[/cci]，只有四种情况：

1.  没有被低位借位，也不向高位借位，也就是真正的[latex]X - Y =
    Z[/latex]；
2.  没有被低位借位，但向高位借了一位，即[latex](10+X) - Y =
    Z[/latex]，或记做[latex]X\_{+} - Y = Z[/latex]；
3.  被低位借位，但不向高位借位，即[latex](X-1) - Y =
    Z[/latex]，或记做[latex]X\^{-} - Y = Z[/latex]；
4.  被低位借位，也向高位借位，即[latex](10+X-1) - Y =
    Z[/latex]，或记做[latex]X\^{-}\_{+} - Y = Z[/latex]。

接下来就找竖式中的特殊情况。先看十位[cci]O - L =
O[/cci]，在上述四种情况中，只有两种是可能的，即[latex]O\_{+}\^{-} - L =
O \\Rightarrow L=9[/latex]和[latex]O - L = O \\Rightarrow L=0[/latex]。

然后看千位和万位，被减数都是W，减数都是O，但结果却不同，说明在这两位的借位情况肯定不一样，也就只有两种可能，再结合前面提到的十位上的两种情况，可以得到：

1.  [latex]W\_{+}-O=T[/latex]，[latex]W\^{-}\_{+}-O=O[/latex]，[latex]W\^{-}-G=D[/latex]
    1.  [cci]L = 0[/cci]，[latex]T - E = M[/latex]，[latex]D - G =
        C[/latex]；
    2.  [cci]L = 9[/cci]，[latex]T\_{+} - E = M[/latex]，[latex]D\^{-} -
        G = C[/latex]；

2.  [latex]W\^{-}-O=T[/latex]，[latex]W-O=O[/latex]，[latex]W-G=D[/latex]
    1.  [cci]L = 0[/cci]，[latex]T - E = M[/latex]，[latex]D\_{+} - G =
        C[/latex]；
    2.  [cci]L = 9[/cci]，[latex]T\_{+} - E =
        M[/latex]，[latex]D\^{-}\_{+} - G = C[/latex]。

先看情况1，可以推出：[ccie]T = O + 1， W = 2 \* O - 9，G + D = W - 1，G
\<
D[/ccie]（因为百位上的减法没有向千位借位）。再根据W、O、D都不能为零，因此有[ccie]1
\<= G \< D \<= W - 2 \<= 7[/ccie]，[ccie]4 \<= G + D + 1 = W = 2 \* O -
9 \<= 8[/ccie]，于是[ccie]7 \<= O \<= 8[/ccie]，这样的话：

-   如果[ccie]O = 7[/ccie]，那么[ccie]G + D = 2 \* O - 10 =
    4[/ccie]，得到[ccie]G = 1，D = 3[/ccie]。那如果[ccie]L =
    9[/ccie]，就有[ccie]C = (D - 1) - G = 1 =
    G[/ccie]，不符合题目。如果[ccie]L = 0[/ccie]，则[ccie]C =
    2[/ccie]，[ccie]E + M = T = O + 1 = 8 = (1 + 7) or (2 + 6) or (3 +
    5)[/ccie]，无法给E、M找到不重复的数字。
-   因此只能是[ccie]O = 8，T = 9，L = 0[/ccie]，又有[ccie]G + D = 5，D -
    G = C[/ccie]，可以得到G、D、C分别是1、5、4。于是[ccie]E + M = T =
    9[/ccie]，得到E、M分别为3、6或者6、3。得到此题的一组解。

用同样的方法分析情况2，可以得到[ccie]W = 2 \* O，T = O - 1，G + D = W，G
\> D[/ccie] ，因此有[ccie]1 \<= D \< G \<= W - 1 \<= 8[/ccie]，[ccie]3
\<= D + E \<= W = 2 \* O \<= 9[/ccie]，得到[ccie]2 \<= O \<=
4[/ccie]。但是根据C与D和G的关系不难发现，不论O、L取什么值，都无法找到不重复的C值。因此第二种情况无解。

综上，可以得到此问题唯一的一对解：[ccie]O = 8，T = 9，W = 7，G = 1，D =
5，L = 0，C = 4，{E, M} = {3, 6}[/ccie]，代入原方程得到：

[latex]\\begin{matrix} & 7 & 7 & 7 & 5 & 8 & 9\\\\ - & 1 & 8 & 8 & 1 & 0
& 3\\\\ \\hline & 5 & 8 & 9 & 4 & 8 & 6\\end{matrix}[/latex]
或者是 [latex]\\begin{matrix} & 7 & 7 & 7 & 5 & 8 & 9\\\\ - & 1 & 8 & 8
& 1 & 0 & 6\\\\ \\hline & 5 & 8 & 9 & 4 & 8 & 3\\end{matrix}[/latex]
