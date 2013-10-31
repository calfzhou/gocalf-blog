计算斐波纳契数，分析算法复杂度
##############################
:date: 2011-11-22 20:34
:modified: 2012-12-04 17:00
:author: Calf
:category: 算法
:tags: Fibonacci, Master定理, 大整数运算, 斐波纳契数列, 矩阵乘方, 算法复杂度, 算法题, 面试题
:slug: calc-fibonacci
:summary: 问题描述：Fibonacci数（Fibonacci Number）的定义是：F(n) = F(n - 1) + F(n - 2)，并且F(0) = 0，F(1) = 1。对于任意指定的整数n（n >= 0），计算F(n)，并分析算法的时间、空间复杂度。

问题描述：Fibonacci数（\ `Fibonacci Number`_\ ）的定义是：F(n) = F(n -
1) + F(n - 2)，并且F(0) = 0，F(1) = 1。对于任意指定的整数n（n ≥
0），计算F(n)的精确值，并分析算法的时间、空间复杂度。

假设系统中已经提供任意精度长整数的运算，可以直接使用。

.. more

这其实是个老生常谈的问题了，不过可能在复杂度分析的时候，很多人忽略了一些事情。另外这个问题恰好有几种复杂度迥异的算法，在刚刚介绍完\ `算法复杂度`_\ 之后，正好来直观地理解一下。

一、递归法
----------

一个看起来很直观、用起来很恐怖的算法就是递归法。根据Fibonacci的递推公式，对于输入的n，直接递归地调用相同的函数分别求出F(n
- 1)和F(n -
2)，二者相加就是结果。递归的终止点就是递推方程的初值，即n取0或1的时候。

程序（in
Python）写出来那也是相当的简洁直观（为了跟后面的程序区分开来，这里取名SlowFibonacci）。

.. code-block:: python

    def SlowFibonacci(n):
      assert n >= 0, 'invalid n'
      if n < 2: return n  # F(0) = 0, F(1) = 1
      return SlowFibonacci(n - 1) + SlowFibonacci(n - 2)

这个算法的时间复杂度有着跟Fibonacci类似的递推方程：T(n) = T(n - 1) + T(n
- 2) + O(1)，很容易得到\ **T(n) = O(1.618 ^
n)**\ （1.618就是黄金分割，:math:`(1+\sqrt5)/2`）。空间复杂度取决于递归的深度，显然是\ **O(n)**\ 。

二、递推法
----------

虽然只是一字之差，但递推法的复杂度要小的多。这个方法就是按照递推方程，从n
= 0和n =
1开始，逐个求出所有小于n的Fibonacci数，最后就可以算出F(n)。由于每次计算值需要用到前两个Fibonacci数，更小的数就可以丢弃了，可以将空间复杂度降到最低。算法如下：

.. code-block:: python

    def NormFibonacci(n):
      assert n >= 0, 'invalid n'
      if n == 0: return 0
      (prev, curr) = (0, 1)  # F(0), F(1)
      for i in xrange(n - 1):
        (prev, curr) = (curr, prev + curr)
      return curr

显然时间复杂度是\ **O(n)**\ ，空间复杂度是\ **O(1)**\ 。

比较一下递归法和递推法，二者都用了分治的思想——把目标问题拆为若干个小问题，利用小问题的解得到目标问题的解。二者的区别实际上就是普通分治算法和动态规划的区别。

三、矩阵法
----------

算Fibonacci数精确值的最快的方法应该就是矩阵法，看过的人都觉得这个方法很好。如果你跟我一样，曾经为记住这个方法中的矩阵而烦恼，那今天就来看看怎么进行推导。其实方法非常简单，想清楚了也就自然而然地记住了。

我们把Fibonacci数列中相邻的两项：F(n)和F(n -
1)写成一个2x1的矩阵，然后对其进行变形，看能得到什么：

.. math::

    \begin{bmatrix}F_n\\F_{n-1}\end{bmatrix}
    =\begin{bmatrix}F_{n-1}+F_{n-2}\\F_{n-1}\end{bmatrix}
    =\begin{bmatrix}1\times F_{n-1}+1\times F_{n-2}\\1\times F_{n-1}+0\times F_{n-2}\end{bmatrix}
    =\begin{bmatrix}1&1\\1&0\end{bmatrix}\times\begin{bmatrix}F_{n-1}\\F_{n-2}\end{bmatrix}

是不是非常自然呢？把等式最右边继续算下去，最后得到：

.. math::

    \begin{bmatrix}F_n\\F_{n-1}\end{bmatrix}
    =\begin{bmatrix}1&1\\1&0\end{bmatrix}^{n-1}\times\begin{bmatrix}F_{1}\\F_{0}\end{bmatrix}
    =\begin{bmatrix}1&1\\1&0\end{bmatrix}^{n-1}\times\begin{bmatrix}1\\0\end{bmatrix}

因此要求F(n)，只要对这个二阶方阵求n -
1次方，最后取结果方阵第一行第一列的数字就可以了。

看起来有点儿化简为繁的感觉，但关键点在于，幂运算是可以二分加速的。设有一个方阵a，利用分治法求a的n次方，有：

.. math::

    a^n=\begin{cases}
    a^{n/2}\times a^{n/2}&,\text{ if }x\text{ is even}\\
    a^{(n-1)/2}\times a^{(n-1)/2}\times a&,\text{ if }x\text{ is odd}
    \end{cases}

可见复杂度满足T(n) = T(n / 2) + O(1)，根据\ `Master定理`_\ 可得：T(n) =
O(log n)。

在实现的时候，可以用循环代替递归实现这里的二分分治，好处是降低了空间复杂度（用递归的话，空间复杂度为O(log
n)）。下面的Python程序直接利用的numpy库中的矩阵乘法（当然这个库也实现了矩阵的幂运算，我把它单独写出来是为了强调这里的分治算法）。另外如果不用第三方库，我也给出了矩阵乘法的简单实现。

- Using numpy Library

.. code-block:: python

    from numpy import matrix

    def MatrixPower(mat, n):
      assert n > 0, 'invalid n'
      res = None
      temp = mat
      while True:
        if n & 1:
          if res is None: res = temp
          else: res = res * temp
        n >>= 1
        if n == 0: break
        temp = temp * temp
      return res

    def FastFibonacci(n):
      assert n >= 0, 'invalid n'
      if n < 2: return n  # F(0) = 0, F(1) = 1
      mat = matrix([[1, 1], [1, 0]], dtype=object)
      mat = MatrixPower(mat, n - 1)
      return mat[0, 0]

- Without numpy Library

.. code-block:: python

    def DotProduct(x, y):
      n = len(x)
      assert len(y) == n, 'x and y must have the same length'
      s = 0
      for i in xrange(n):
        s += x[i] * y[i]
      return s

    def MatrixMultiply(x, y):
      # x is a m*a matrix, y is a a*n matrix.
      # x * y is a m*n matrix.
      m = len(x)
      n = len(y[0])
      a = len(x[0])
      assert len(y) == a

      # transpose y
      y = [[y[i][j] for i in xrange(a)] for j in xrange(n)]

      res = [[DotProduct(x[j], y[i]) for i in xrange(n)] for j in xrange(m)]
      return res

    def MatrixPower(mat, n):
      assert n > 0, 'invalid n'
      res = None
      temp = mat
      while True:
        if n & 1:
          if res is None: res = temp
          else: res = MatrixMultiply(res, temp)
        n >>= 1
        if n == 0: break
        temp = MatrixMultiply(temp, temp)
      return res

    def FastFibonacci(n):
      assert n >= 0, 'invalid n'
      if n < 2: return n  # F(0) = 0, F(1) = 1
      mat = [[1, 1], [1, 0]]
      mat = MatrixPower(mat, n - 1)
      return mat[0][0]

二阶方阵相乘一次可以看成是常数时间（虽然这个常数会比较大），因此整个算法的时间复杂度是\ **O(log
n)**\ ，空间复杂度是\ **O(1)**\ 。

四、运行时间大比拼
------------------

至此，我们得到的时间复杂度分别是O(1.618 ^ n)、O(n)和O(log
n)的算法，让我们来直观地比较比较它们。

用Python的timeit模块对以上三个算法的运行时间进行了测量，记录了每个算法对于不同的n的每千次运算所消耗的时间（单位是秒），部分数据记录在\ `fibonacci\_data`_\ 。利用Mathematica可以很方便地对这些数据进行拟合，对于较小的n，用三个复杂度表达式分别去拟合，得到的效果都非常好。尤其值得注意的是，对于第一个算法，我用a
\* b ^ n去拟合，结果得到b等于1.61816，这与黄金分割数的正确值相差无几。

-  递归法拟合结果：0.000501741 \* 1.61816 ^ n，RSquare = 0.999993。
-  递推法拟合结果：0.000788421 + 0.000115831 \* n，RSquare = 0.999464。
-  矩阵法拟合结果：-0.0114923 + 0.0253609 log(n)，RSquare = 0.986576。

下图是n <= 35时，三种算法的千次运行耗时比较。其中红色为O(1.618 ^
n)的递归法；蓝色为O(n)的递推法；绿色为O(log
n)的矩阵法。散点为实际测量到的运行时间，实线为拟合方程的曲线。

.. figure:: {filename}/images/2011/11/compare_a.png
    :alt: compare_a
    
    三种算法的运行时间比较

当n >
10的时候，指数时间就已经超出画面范围了。另外在这张图里，身为对数时间复杂度的矩阵法似乎没有任何优势，其耗时远远高于线性时间复杂度的递推法。这是因为n还不够大，体现不出log(n)的优势。在考虑更大的n之前，先来看看指数时间复杂度会增大到什么程度。

.. figure:: {filename}/images/2011/11/compare_b.png
    :alt: compare_b
    
    三种算法的运行时间比较（对数坐标轴）

五、大整数情况下的复杂度
------------------------

Python内置了大整数支持，因此上面的程序都可以直接接受任意大的n。当整数在32位或64位以内时，加法和乘法都是常数时间，但大整数情况下，这个时间就不能忽略了。

先来看一下Fibonacci数的二进制位数。我们知道Fibonacci数的通项公式是：

.. math::

    F_n=\frac{1}{\sqrt5}\left(\frac{1+\sqrt5}{2}\right)^n-\frac{1}{\sqrt5}\left(\frac{1-\sqrt5}{2}\right)^n

当n充分大（其实都不需要很大）的时候，第二项就可以忽略不计了。把第一项对2取对数，就可以得到Fibonacci数的二进制位数的近似表达式，大概是\ :math:`\log_2{1.618}\times n-0.5\log_2{5}/2=\log_2{1.618}\times n-1.161=O(n)`。由此可以算出，F(47)是32位有符号整数可以表达的最大的Fibonacci数，F(93)是64位有符号整数可以表达的最大的Fibonacci数。上面图中的n在36以内，不需要动用大整数运算，复杂度也比较符合之前的结论。但对于更大的n，之前的复杂度就不再适用了。

指数复杂度的算法就不管了，还不等用到大整数，它就已经慢到不行了。

来看看O(n)时间复杂度的递推法。每次递推的时候都要计算两个Fibonacci数之和，第i次运算时，这两个Fibonacci数分别有O(i)个二进制位，完成加法需要O(i)的时间。因此总的时间大约是：

.. math::

    \sum_{i=1}^n{O(i)}=O(n^2)

可见对于很大的n，递推法的时间复杂度实际上是\ **O(n ^
2)**\ 的，空间复杂度是\ **O(n)**\ 用来存储Fibonacci数的各个二进制位。

再看矩阵法，注意到矩阵运算中有乘法，两个长度为n的大整数相乘，传统算法是O(n
^ 2)时间复杂度，较好的Karatsuba算法是O(n ^ (log 3 / log
2))时间，更快的快速傅立叶变换法是O(n log n)时间。Python
2.5中使用的是Karatsuba算法（Python
3里面似乎是快速傅立叶变换法）（参见\ `Python源码中的算法分析 之 大整数乘法`_\ ）。以Karatsuba算法为例，矩阵法的时间复杂度递推方程为：:math:`T(n)=T(n/2)+O(n^{\log_2{3}})`，应用\ `Master定理`_\ 求得\ :math:`T(n)=O(n^{\log_2{3}})`。因此对于很大的n，矩阵法的时间复杂度为\ **O(n
^ 1.585)**\ ，空间复杂度\ **O(n)**\ 。

利用Mathematica对大n情况下这两种算法每千次运行时间进行拟合，分别得到：

-  递推法大整数拟合结果：0.0131216 + 0.000102101 \* n + 2.44765 \* 10 ^
   -7 \* n ^ 2，RSquare = 0.999482。
-  矩阵法大整数拟合结果：0.171487 + 9.74496 \* 10 ^ -7 \* n ^
   1.51827，RSquare = 0.998395。

看一下n在4000以内时，两种复杂度的对比情况：

.. figure:: {filename}/images/2011/11/compare_c.png
    :alt: compare_c
    
    递推法（蓝色）与矩阵法（绿色）运行时间比较（大整数）

从图中可以看出，递推法的增长速度也是很快的，当n增大到60多的时候，它的运行时间就超过矩阵法了。矩阵法的增长速度非常慢，看起来像是线性的，让我们把n调的更大来看一下。

.. figure:: {filename}/images/2011/11/compare_d.png
    :alt: compare_d
    
    矩阵法的运行时间（更大的n）

六、更快的算法？
----------------

试了试Mathematica中的Fibonacci函数，发现其运算速度相当惊人，估计时间复杂度在O(n
log
n)上下，而且对于相同的n，运算速度远远高于我的矩阵法。可惜我还不了解它的算法，只是在帮助文档里看到：

    Fibonacci[n] uses an iterative method based on the binary digit
    sequence of n.

来看看它到底有多快：

.. figure:: {filename}/images/2011/11/compare_e.png
    :alt: compare_e
    
    矩阵法（绿色）与Mathematica Fibonacci函数（橙色）运行时间比较

好吧，这个问题留待以后慢慢研究。

最后相关的Mathematica命令文件放在这里：\ `fibonacci\_timecost`_

.. _Fibonacci Number: http://en.wikipedia.org/wiki/Fibonacci_number
.. _算法复杂度: {filename}algorithm-complexity-and-master-theorem.rst
.. _Master定理: {filename}algorithm-complexity-and-master-theorem.rst
.. _fibonacci\_data: {filename}/assets/2011/11/fibonacci_data.zip
.. _Python源码中的算法分析 之 大整数乘法: http://www.endless-loops.com/2011/01/python%E6%BA%90%E7%A0%81%E4%B8%AD%E7%9A%84%E7%AE%97%E6%B3%95%E5%88%86%E6%9E%90-%E4%B9%8B-%E5%A4%A7%E6%95%B4%E6%95%B0%E4%B9%98%E6%B3%95-378.html
.. _fibonacci\_timecost: {filename}/assets/2011/11/fibonacci_timecost.zip
