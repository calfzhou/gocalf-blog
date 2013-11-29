利用不均匀硬币产生等概率
########################
:date: 2011-10-08 22:49
:modified: 2011-10-09 15:05
:author: Calf
:category: 算法
:tags: Algorithm, 不均匀硬币, 抛硬币, 概率, 等概率, 算法题, 随机数, 面试题
:slug: unbalanced-coin
:summary: 问题描述：有一枚不均匀的硬币，已知抛出此硬币后，正面向上的概率为p（0 < p < 1）。请利用这枚硬币产生出概率相等的两个事件。
:depends: highcharts

问题描述：有一枚不均匀的硬币，已知抛出此硬币后，正面向上的概率为p（0
< p < 1）。请利用这枚硬币产生出概率相等的两个事件。

这个问题跟之前的\ `利用等概率Rand5产生等概率Rand3`_\ 非常像，但却简单的多。几个月前还为这个事情头疼了一下，现在想来真是不应该。

.. more

某一次抛出硬币，正面向上的概率是p，反面向上的概率是1 -
p，当p不等于0.5时，这两个事件的概率就不一样了。怎么能凑出等概率呢？还是要利用概率的加法和乘法法则。这里用乘法，也就是连续的独立事件。

连续抛两次硬币，正反面的出现有四种情况，概率依次为：

#. 两次均为正面：p \* p
#. 第一次正面，第二次反面：p \* (1 - p)
#. 第一次反面，第二次正面：(1 - p) \* p
#. 两次均为反面：(1 - p) \* (1 - p)

这不，中间两种情况的概率是完全一样的。于是问题的解法就是连续抛两次硬币，如果两次得到的相同则重新抛两次；否则根据第一次（或第二次）的正面反面情况，就可以得到两个概率相等的事件。

用Python程序模拟一下这个过程，首先是一个叫做UnbalancedCoin的类，用来模拟这枚不均匀的硬币。Flip方法表示抛一次硬币，返回值True代表正面，False代表反面。根据要求，这个函数返回True和False的概率分别是p和1
-
p。函数MakeEqualProb利用参数coin（这枚不均匀硬币）构造出两个事件（依旧用True和False表示），并且这两个事件的概率都是0.5。

.. code-block:: python

    from random import Random

    class UnbalancedCoin:
      def __init__(self, p, rand=None):
        assert 0.0 < p < 1.0, 'invalid p'
        self._p = p
        if rand is None:
          rand = Random()
        self._rand = rand

      def Flip(self):
        return self._rand.random() < self._p

    def MakeEqualProb(coin):
      while True:
        a = coin.Flip()
        if a != coin.Flip():
          return a

对于不同的p值，模拟实验十万次，得到如下的（结果为True的）概率分布，其中蓝线是不均匀硬币抛出后正面向上的概率，红线是构造出来的两个事件之一（第一次正面向上，第二次反面向上）的概率。

.. raw:: html

    <div id="coin-prob-chart" class="highcharts" style="height: 400px; width: 600px"></div>
    <script type="text/javascript">
    $(function () {
        $('#coin-prob-chart').highcharts({
            chart: { type: 'line', backgroundColor: null },
            colors: ['#2f7ed8', '#910000'],
            title: { text: null },
            xAxis: { min: 0, max: 1, tickInterval: 0.1 },
            yAxis: { min: 0, max: 1, tickInterval: 0.1, title: { text: null } },
            series: [{
                name: 'UnbalancedCoin',
                data: [
                    [0.1, 0.09989], [0.2, 0.20059], [0.3, 0.30313], [0.4, 0.40019], [0.5, 0.50013],
                    [0.6, 0.59973], [0.7, 0.70198], [0.8, 0.80152], [0.9, 0.90012]
                ]
            }, {
                name: 'MakeEqualProb',
                data: [
                    [0.1, 0.49899], [0.2, 0.49846], [0.3, 0.50038], [0.4, 0.49917], [0.5, 0.50181],
                    [0.6, 0.50022], [0.7, 0.49805], [0.8, 0.49997], [0.9, 0.49956]
                ]
            }]
        });
    });
    </script>

如果问题改变一下，把“一枚”改成“一种”，那解决办法就更简单有趣了，把两枚同样的不均匀硬币正面相对粘在一起，就可以得到一个均匀的组合币，抛出这枚组合币就可以得到等概率的两个事件。

.. _利用等概率Rand5产生等概率Rand3: {filename}../08/build-rand3-from-rand5.rst
