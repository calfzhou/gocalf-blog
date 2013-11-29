单次遍历，带权随机选取问题（二）
################################
:date: 2011-09-26 11:27
:modified: 2011-09-28 10:05
:author: Calf
:category: 算法
:tags: Algorithm, Heap, Weighted Random Sample, 单次遍历, 带权概率, 最小堆, 概率, 算法题, 随机数, 随机选取, 面试题
:slug: weighted-random-selection-2
:summary: 本文介绍一个有趣的算法，用来解决带权随机选取问题：有一组数量未知的数据，每个元素有非负权重。要求只遍历一次，随机选取其中的一个元素，任何一个元素被选到的概率与其权重成正比。
:depends: mathjax, highcharts

.. contents::

还是同样的问题：有一组数量未知的数据，每个元素有非负权重。要求只遍历一次，随机选取其中的一个元素，任何一个元素被选到的概率与其权重成正比。

在\ `前一篇`_\ 文章中介绍了概率分布的理论值，并用比较简洁高效的函数实现了选取一个元素的方法。现在来看一个神奇的算法，以及相关的证明和实现。

.. more

算法很简单：对于任意的i（1 <= i <=
n），按照如下方法给第i个元素分配一个键值key（其中r\ :sub:`i`\ 是一个0到1之间等概率分布的随机数）：

.. math::

    key(i)=r_i^{1/w_i}

之后，如果要随机选取一个元素，就去key最大的那个；如果要选取m个元素，就取key最大的m个。

真不知道是怎么想出来的这样的方法，不过还是先来关注一下证明的过程。

m=1证明
-------

对于m=1的证明过程会介绍得详细些，主要是怕我自己过几天就忘记了。概率达人可以直接秒杀之。

m=1时，第i个元素被选取到的概率，就等于它所对应的键值key(i)是最大值的概率，即：

.. math::

    p_i=p(\forall j\neq i,key(j) < key(i))

把key(i)的计算公式代入，但要注意公式中的r\ :sub:`i`\ 并不是一个固定的数值，而是随机变量。不考虑计算机数值表示的精度，可以假设r\ :sub:`i`\ 是一个在0到1之间的连续均匀概率分布，因此如果要计算key(i)是最大的概率，必须要对r\ :sub:`i`\ 所有的可能值进行概率累加，也就是积分。于是上面的概率表达式就被写成：

.. math::

    p_i=\int_0^1p(\forall j\neq i,r_j^{1/w_j} < r_i^{1/w_i})\mathrm{d}r_i

再看式子中的\ :math:`\forall`\ ，它表示每一个j都要满足后面的条件，而各个j之间相互独立，因此可以写成概率乘积，于是得到：

.. math::

    p_i=\int_0^1\prod_{j\neq i}{p(r_j^{1/w_j} < r_i^{1/w_i})}\mathrm{d}r_i

对于给定的j，:math:`r_j^{1/w_j} < r_i^{1/w_i}\Rightarrow r_j < r_i^{w_j/w_i}`\ ，另外r\ :sub:`j`\ 也是个均匀概率分布，将概率密度函数代入可以得到：

.. math::

    p(r_j < r_i^{w_j/w_i})=\int_0^{r_i^{w_j/w_i}}1\mathrm{d}r_j=r_i^{w_j/w_i}

因此，上面的概率算式就变成（其中w就是前一篇文章中提到的所有元素的权重之和）：

.. math::

    p_i=\int_0^1\prod_{j\neq i}{r_i^{w_j/w_i}}\mathrm{d}r_i=\int_0^1r_i^{(w-w_i)/w_i}\mathrm{d}r_i=\frac{w_i}{w}

最后的结果跟\ `前一篇`_\ 文章中的理论值相等，证明完毕。

m>=1证明
--------

当m取任意值时，概率公式变得非常复杂，在前一篇文章中使用了第i个元素不被选到的概率来简化表达式。现在的证明也从同样的角度进行。

第i个元素不被选到的概率，显然等于这n个元素中，至少存在m个元素的键值大于key(i)，与之前的讨论一样，不妨设这m个元素的下标（按键值从大到小）依次为j\ :sub:`1`,
j\ :sub:`2`, ..., j\ :sub:`m`\ ，:math:`\forall 1\leq k\leq m,j_k\notin\{i,j_1,j_2,\cdots,j_{k-1}\}`\ ，满足\ :math:`\forall 1\leq t_k\leq n,t_k\notin\{j_1,j_2,\cdots,j_{k}\},key(j_k) > key(t_k)`\ 。注意j\ :sub:`k`\ 和t\ :sub:`k`\ 的取值范围，为了简单起见，下面的式子中就不再重复了。

.. math::

    \bar p_i(m)=p(\exists j_1,j_2,...,j_m\neq i,key(j_1) > key(j_2) > ... > key(j_m) > key(i))

为了能够进一步求解，必须把这个连等式拆开。这里要非常小心，各个j\ :sub:`k`\ 并不是相互独立的，比如当j\ :sub:`1`\ 改变的时候，j\ :sub:`2`\ 的取值范围也会随之变化，依此类推。拆开之后的式子如下：

.. math::

    \begin{array}{rrrl}
    \bar p_i(m)=p( & \exists j_1( & & \forall t_1,key(j_1) > key(t_1),\\
    & & \exists j_2( & \forall t_2,key(j_2) > key(t_2),\\
    & & & ...,\\
    & & & \exists j_m(\forall t_m,key(j_m) > key(t_m))\\
    & & ) & \\
    & ) & & \\
    ) & & & \end{array}

看起来还是相当恐怖的，一层套一层。注意等式右边已经没有显式地关于i的信息了，这些信息被隐含在j\ :sub:`k`\ 和t\ :sub:`k`\ 的取值范围中，切记。对每个j\ :sub:`k`\ ，把key(j\ :sub:`k`)的式子代进去，转换成积分；同时把\ :math:`\forall t\_k`\ 转换为\ :math:`\prod_{t_k}`\ 。这些在m=1的证明中都提到过了。新出现的是\ :math:`\exists j_k`\ ，这个显然适用概率加法，因为j\ :sub:`k`\ 取不同的值对应于不同的互斥方案。经过这些变换得到：

.. math::

    \begin{array}{rrrl}
    \bar p_i(m)= & \sum_{j_1}( & & \int_0^1\prod_{t_1}p(r_{j_1}^{1/w_{j_1}} > r_{t_1}^{1/w_{t_1}})\mathrm d r_{j_1}\times\\
    & & \sum_{j_2}( & \int_0^1\prod_{t_2} p(r_{j_2}^{1/w_{j_2}} > r_{t_2}^{1/w_{t_2}})\mathrm d r_{j_2}\times\\
    & & & ...\times\\
    & & & \sum_{j_m}(\int_0^1\prod_{t_m} p(r_{j_m}^{1/w_{j_m}} > r_{t_m}^{1/w_{t_m}})\mathrm d r_{j_m})\\
    & & ) & \\ & ) & & \\
    \end{array}

其中的积分式在之前已经见过了，其运算过程如下（注意t\ :sub:`k`\ 的取值范围）：

.. math::

    \begin{array}{rl}
    & \int_0^1\prod_{t_k}p(r_{j_k}^{1/w_{j_k}} > r_{t_k}^{1/w_{t_k}})\mathrm{d}r_{j_k} \\
    & \\
    = & \int_0^1\prod_{t_k}r_{j_k}^{w_{t_k}/w_{j_k}}\mathrm{d}r_{j_k} \\
    & \\
    = & \int_0^1r_{j_k}^{(\sum_{t_k}w_{t_k})/w_{j_k}}\mathrm{d}r_{j_k} \\
    & \\
    = & \frac{w_{j_k}}{(\sum_{t_k}w_{t_k})+w_{j_k}} \\
    & \\
    = & \frac{w_{j_k}}{w-(w_{j_1}+w_{j_2}+...+w_{j_{k-1}})}
    \end{array}

最终，概率计算式子变成：

.. math::

    \bar p_i(m)=\sum_{j_1}\left(\frac{w_{j_1}}{w}\sum_{j_2}\left(\frac{w_{j_2}}{w-w_{j_1}}\sum_{j_3}\left(\frac{w_{j_2}}{w-w_{j_1}-w_{j_2}}\cdots\sum_{j_m}\frac{w_{j_m}}{w-\sum_{k=1}^{m-1}w_{j_k}}\right)\right)\right)

与\ `前一篇`_\ 文章中的理论值完全一样。

呼，可怕的推导过程。

程序实现
--------

虽然证明过程异常恐怖，但实现起来却很简单。实际运算中，只要维持一个大小为m的最小堆（没错，是最小堆）来保存当前已知的最大的m个键值，每拿到一个新的元素，算出对应的键值，如果它比堆中的最小值大，就可以放入堆中替换掉最小值。Python实现函数如下：

.. code-block:: python

    from random import Random
    from heapq import *

    def WeightedRandomSample(m=1, rand=None):
      assert m > 0, 'invalid m'
      selection = []
      heap = []
      if rand is None:
        rand = Random()
      while True:
        # Outputs the current selection and gets next item
        (item, weight) = yield selection
        if weight <= 0: continue
        key = rand.random() ** (1.0 / weight)
        if len(selection) < m:
          heap.append((key, len(selection)))
          selection.append(item)
          if len(selection) == m:
            heapify(heap)
        else:
          if key > heap[0][0]:
            index = heap[0][1]
            heapreplace(heap, (key, index))
            selection[index] = item

每次拿到一个新的元素，通过\ ``key = rand.random() ** (1.0 / weight)``\ 产生一个与其权重有关的随机键值key。当元素个数小于m时，直接将新的元素放入堆空间中（但并不建堆），这样只用O(1)时间；当遇到第m个元素后，堆空间放满了，这时候进行建堆操作（``heapify(heap)``），需要O(m)时间；之后每拿到一个新的元素，用O(1)时间从堆顶拿出最小值与新元素的键值比较，如果后者更大就用后者替换掉堆顶元素，对堆进行必要的操作（O(log
m)时间）以保持其结构（``heapreplace(heap, (key, index))``）。

关于Python中的堆可以参考：\ http://docs.python.org/library/heapq.html\ 。

总体来看，整段程序用时O(n \* log
m)，占用O(m)辅助空间。这样的处理比较适用于m <<
n的情况。当m与n接近时，可以用n个辅助空间存储所有元素的键值，当遍历结束后用O(n)时间对这n个元素执行快速选择算法，选出m个最大的元素即可，耗时O(n)，辅助空间O(n)。

用同样一组具有等差分布权重的元素调用WeightedRandomSample十万次，得到如下的概率分布，与理论分布非常接近。

.. raw:: html

    <div id="weighted_sample-chart" class="highcharts" style="height: 480px; width: 640px"></div>
    <script type="text/javascript">
    $(function () {
        $('#weighted_sample-chart').highcharts({
            chart: { type: 'line', backgroundColor: null },
            title: { text: '用WeightedRandomSample函数随机选取m个元素，第i个元素被选中的概率' },
            xAxis: { categories: ['i=1', 'i=2', 'i=3', 'i=4', 'i=5', 'i=6', 'i=7', 'i=8', 'i=9', 'i=10'] },
            yAxis: { min: 0, max: 1, tickInterval: 0.1, title: { text: null } },
            series: [{
                name: 'm=1',
                data: [0.01824, 0.0371, 0.05426, 0.0723, 0.09161, 0.10988, 0.12501, 0.14523, 0.16448, 0.18189]
            }, {
                name: 'm=2',
                data: [0.03979, 0.07617, 0.11498, 0.15227, 0.18612, 0.22121, 0.25497, 0.28584, 0.32032, 0.34833]
            }, {
                name: 'm=3',
                data: [0.06173, 0.12283, 0.17995, 0.23588, 0.28565, 0.33511, 0.38292, 0.4259, 0.46621, 0.50382]
            }, {
                name: 'm=4',
                data: [0.08874, 0.17467, 0.25423, 0.32381, 0.39314, 0.45378, 0.5103, 0.55865, 0.60438, 0.6383]
            }, {
                name: 'm=5',
                data: [0.1239, 0.23698, 0.33544, 0.42587, 0.50627, 0.57379, 0.63485, 0.68303, 0.72241, 0.75746]
            }, {
                name: 'm=6',
                data: [0.16634, 0.31401, 0.43789, 0.54221, 0.62332, 0.6963, 0.74587, 0.79285, 0.82668, 0.85453]
            }, {
                name: 'm=7',
                data: [0.22243, 0.40975, 0.56211, 0.67063, 0.74944, 0.80965, 0.85354, 0.88449, 0.91023, 0.92773]
            }, {
                name: 'm=8',
                data: [0.31252, 0.54828, 0.71493, 0.8095, 0.87294, 0.91133, 0.93608, 0.95444, 0.96568, 0.9743]
            }, {
                name: 'm=9',
                data: [0.48359, 0.78327, 0.89211, 0.93922, 0.96197, 0.97692, 0.98513, 0.98987, 0.99282, 0.9951]
            }, {
                name: 'm=10',
                data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            }]
        });
    });
    </script>

.. _前一篇: {filename}weighted-random-selection.rst
