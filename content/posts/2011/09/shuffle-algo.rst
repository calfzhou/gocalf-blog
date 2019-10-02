等概率随机排列数组（洗牌算法）
##############################
:date: 2011-09-01 21:58
:modified: 2011-09-01 22:01
:author: Calf
:category: 算法
:tags: Interview Question, Probability
:keywords: Shuffle, 随机排列, 洗牌算法, 等概率, 算法题, 面试题
:slug: shuffle-algo
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/09/cards_shuffle.png
:summary: 问题描述：假设有一个数组，包含 n 个元素。现在要重新排列这些数据，要求每个元素被放到任何一个位置的概率都相等（即 1/n），并且直接在数组上重排（in place），不要生成新的数组。用 O(n) 时间、O(1) 辅助空间。
:depends: mathjax

又是一道跟概率相关的简单问题。话说我的概率学的太差了，趁这个机会也从头开始补习一下。

问题描述：假设有一个数组，包含 n 个元素。现在要重新排列这些元素，要求每个元素被放到任何一个位置的概率都相等（即 1/n），并且直接在数组上重排（in
place），不要生成新的数组。用 O(n) 时间、O(1) 辅助空间。

.. more

算法是非常简单了，当然在给出算法的同时，我们也要证明概率满足题目要求。

先想想如果可以开辟另外一块长度为 n 的辅助空间时该怎么处理，显然只要对 n 个元素做 n 次（不放回的）随机抽取就可以了。先从 n 个元素中任选一个，放入新空间的第一个位置，然后再从剩下的 n-1 个元素中任选一个，放入第二个位置，依此类推。

按照同样的方法，但这次不开辟新的存储空间。第一次被选中的元素就要放入这个数组的第一个位置，但这个位置原来已经有别的（也可能就是这个）元素了，这时候只要把原来的元素跟被选中的元素互换一下就可以了。很容易就避免了辅助空间。

用 Python 来写一段简单的程序描述这个算法：

.. code-block:: python

    from random import Random

    def Shuffle(li):
      rand = Random()
      for x in xrange(len(li) - 1, 0, -1):  # 逆序遍历 li
        y = rand.randint(0, x)              # 从剩余数据中随机选取一个
        li[x], li[y] = li[y], li[x]         # 将随机选取的元素与当前位置元素互换

主要的代码仅仅三行而已，浅显易懂。

来计算一下概率。如果某个元素被放入第 i（:math:`1\leq i\leq n`）个位置，就必须是在前 i - 1 次选取中都没有选到它，并且第 i 次选取是恰好选中它。其概率为：

.. math::

    p_i=\frac{n-1}{n}\times\frac{n-2}{n-1}\times\cdots\times\frac{n-i+1}{n-i+2}\times\frac{1}{n-i+1}=\frac{1}{n}

可见任何元素出现在任何位置的概率都是相等的。

实际上 Python 用户一定知道，在 Random 类中就有现成的 shuffle 方法，处理方法与我上面的程序是一样的。顺便也贴在这里学习一下。以下代码来自于
Python 2.5 ``Lib\random.py``：

.. code-block:: python
    :linenostart: 250
    :linenos: table

    def shuffle(self, x, random=None, int=int):
      """x, random=random.random -> shuffle list x in place; return None.

      Optional arg random is a 0-argument function returning a random
      float in [0.0, 1.0); by default, the standard random.random.
      """

      if random is None:
        random = self.random
      for i in reversed(xrange(1, len(x))):
        # pick an element in x[:i+1] with which to exchange x[i]
        j = int(random() * (i+1))
        x[i], x[j] = x[j], x[i]
