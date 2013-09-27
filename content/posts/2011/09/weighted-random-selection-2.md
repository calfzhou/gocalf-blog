Title: 单次遍历，带权随机选取问题（二）
Date: 2011-09-26 11:27
Author: Calf
Category: 算法
Tags: Algorithm, Heap, Weighted Random Sample, 单次遍历, 带权概率, 最小堆, 概率, 算法题, 随机数, 随机选取, 面试题
Slug: weighted-random-selection-2

还是同样的问题：有一组数量未知的数据，每个元素有非负权重。要求只遍历一次，随机选取其中的一个元素，任何一个元素被选到的概率与其权重成正比。

在[前一篇][]文章中介绍了概率分布的理论值，并用比较简洁高效的函数实现了选取一个元素的方法。现在来看一个神奇的算法，以及相关的证明和实现。<!--more-->

算法很简单：对于任意的i（[ccei]1 \<= i \<=
n[/ccei]），按照如下方法给第i个元素分配一个键值key（其中r~i~是一个0到1之间等概率分布的随机数）：

[latex]key(i)=r\_i\^{1/w\_i}[/latex]

之后，如果要随机选取一个元素，就去key最大的那个；如果要选取m个元素，就取key最大的m个。

真不知道是怎么想出来的这样的方法，不过还是先来关注一下证明的过程。

### m=1证明

对于m=1的证明过程会介绍得详细些，主要是怕我自己过几天就忘记了。概率达人可以直接秒杀之。

m=1时，第i个元素被选取到的概率，就等于它所对应的键值key(i)是最大值的概率，即：

[latex]p\_i=p(\\forall j\\neq i,key(j) \< key(i))[/latex]

把key(i)的计算公式代入，但要注意公式中的r~i~并不是一个固定的数值，而是随机变量。不考虑计算机数值表示的精度，可以假设r~i~是一个在0到1之间的连续均匀概率分布，因此如果要计算key(i)是最大的概率，必须要对r~i~所有的可能值进行概率累加，也就是积分。于是上面的概率表达式就被写成：

[latex]p\_i=\\int\_0\^1p(\\forall j\\neq i,r\_j\^{1/w\_j} \<
r\_i\^{1/w\_i})\\mathrm{d}r\_i[/latex]

再看式子中的[latex]\\forall[/latex]，它表示每一个j都要满足后面的条件，而各个j之间相互独立，因此可以写成概率乘积，于是得到：

[latex]p\_i=\\int\_0\^1\\prod\_{j\\neq i}{p(r\_j\^{1/w\_j} \<
r\_i\^{1/w\_i})}\\mathrm{d}r\_i[/latex]

对于给定的j，[latex]r\_j\^{1/w\_j} \< r\_i\^{1/w\_i}\\Rightarrow r\_j \<
r\_i\^{w\_j/w\_i}[/latex]，另外r~j~也是个均匀概率分布，将概率密度函数代入可以得到：

[latex]p(r\_j \<
r\_i\^{w\_j/w\_i})=\\int\_0\^{r\_i\^{w\_j/w\_i}}1\\mathrm{d}r\_j=r\_i\^{w\_j/w\_i}[/latex]

因此，上面的概率算式就变成（其中w就是前一篇文章中提到的所有元素的权重之和）：

[latex]p\_i=\\int\_0\^1\\prod\_{j\\neq
i}{r\_i\^{w\_j/w\_i}}\\mathrm{d}r\_i=\\int\_0\^1r\_i\^{(w-w\_i)/w\_i}\\mathrm{d}r\_i=\\frac{w\_i}{w}[/latex]

最后的结果跟[前一篇][]文章中的理论值相等，证明完毕。

### m\>=1证明

当m取任意值时，概率公式变得非常复杂，在前一篇文章中使用了第i个元素不被选到的概率来简化表达式。现在的证明也从同样的角度进行。

第i个元素不被选到的概率，显然等于这n个元素中，至少存在m个元素的键值大于key(i)，与之前的讨论一样，不妨设这m个元素的下标（按键值从大到小）依次为j~1~,
j~2~, ..., j~m~，[latex]\\forall 1\\leq k\\leq
m,j\_k\\notin\\{i,j\_1,j\_2,\\cdots,j\_{k-1}\\}[/latex]，满足[latex]\\forall
1\\leq t\_k\\leq n,t\_k\\notin\\{j\_1,j\_2,\\cdots,j\_{k}\\},key(j\_k)
\>
key(t\_k)[/latex]。注意j~k~和t~k~的取值范围，为了简单起见，下面的式子中就不再重复了。

[latex]\\bar{p}\_i(m)=p(\\exists j\_1,j\_2,...,j\_m\\neq i,key(j\_1) \>
key(j\_2) \> ... \> key(j\_m) \> key(i))[/latex]

为了能够进一步求解，必须把这个连等式拆开。这里要非常小心，各个j~k~并不是相互独立的，比如当j~1~改变的时候，j~2~的取值范围也会随之变化，依此类推。拆开之后的式子如下：

[latex]\\begin{array}{rrrl}\\bar{p}\_i(m)=p( & \\exists j\_1( & &
\\forall t\_1,key(j\_1) \> key(t\_1),\\\\ & & \\exists j\_2( & \\forall
t\_2,key(j\_2) \> key(t\_2),\\\\ & & & ...,\\\\ & & & \\exists
j\_m(\\forall t\_m,key(j\_m) \> key(t\_m))\\\\ & & ) & \\\\ & ) & & \\\\
) & & & \\end{array}[/latex]

看起来还是相当恐怖的，一层套一层。注意等式右边已经没有显式地关于i的信息了，这些信息被隐含在j~k~和t~k~的取值范围中，切记。对每个j~k~，把key(j~k~)的式子代进去，转换成积分；同时把[latex]\\forall
t\_k[/latex]转换为[latex]\\prod\_{t\_k}[/latex]。这些在m=1的证明中都提到过了。新出现的是[latex]\\exists
j\_k[/latex]，这个显然适用概率加法，因为j~k~取不同的值对应于不同的互斥方案。经过这些变换得到：

[latex]\\begin{array}{rrrl}\\bar{p}\_i(m)= & \\sum\_{j\_1}( & &
\\int\_0\^1\\prod\_{t\_1}p(r\_{j\_1}\^{1/w\_{j\_1}} \>
r\_{t\_1}\^{1/w\_{t\_1}})\\mathrm{d}r\_{j\_1}\\times\\\\ & &
\\sum\_{j\_2}( & \\int\_0\^1\\prod\_{t\_2} p(r\_{j\_2}\^{1/w\_{j\_2}} \>
r\_{t\_2}\^{1/w\_{t\_2}})\\mathrm{d}r\_{j\_2}\\times\\\\ & & &
...\\times\\\\ & & & \\sum\_{j\_m}(\\int\_0\^1\\prod\_{t\_m}
p(r\_{j\_m}\^{1/w\_{j\_m}} \>
r\_{t\_m}\^{1/w\_{t\_m}})\\mathrm{d}r\_{j\_m})\\\\ & & ) & \\\\ & ) & &
\\\\ \\end{array}[/latex]

其中的积分式在之前已经见过了，其运算过程如下（注意t~k~的取值范围）：

[latex]\\begin{array}{rl} &
\\int\_0\^1\\prod\_{t\_k}p(r\_{j\_k}\^{1/w\_{j\_k}} \>
\_{t\_k}\^{1/w\_{t\_k}})\\mathrm{d}r\_{j\_k} \\\\ & \\\\ = &
\\int\_0\^1\\prod\_{t\_k}r\_{j\_k}\^{w\_{t\_k}/w\_{j\_k}}\\mathrm{d}r\_{j\_k}
\\\\ & \\\\ = &
\\int\_0\^1r\_{j\_k}\^{(\\sum\_{t\_k}w\_{t\_k})/w\_{j\_k}}\\mathrm{d}r\_{j\_k}
\\\\ & \\\\ = & \\frac{w\_{j\_k}}{(\\sum\_{t\_k}w\_{t\_k})+w\_{j\_k}}
\\\\ & \\\\ = &
\\frac{w\_{j\_k}}{w-(w\_{j\_1}+w\_{j\_2}+...+w\_{j\_{k-1}})}
\\end{array}[/latex]

最终，概率计算式子变成：

[latex]\\bar{p}\_i(m)=\\sum\_{j\_1}\\left(\\frac{w\_{j\_1}}{w}\\sum\_{j\_2}\\left(\\frac{w\_{j\_2}}{w-w\_{j\_1}}\\sum\_{j\_3}\\left(\\frac{w\_{j\_2}}{w-w\_{j\_1}-w\_{j\_2}}\\cdots\\sum\_{j\_m}\\frac{w\_{j\_m}}{w-\\sum\_{k=1}\^{m-1}w\_{j\_k}}\\right)\\right)\\right)[/latex]

与[前一篇][]文章中的理论值完全一样。

呼，可怕的推导过程。

### 程序实现

虽然证明过程异常恐怖，但实现起来却很简单。实际运算中，只要维持一个大小为m的最小堆（没错，是最小堆）来保存当前已知的最大的m个键值，每拿到一个新的元素，算出对应的键值，如果它比堆中的最小值大，就可以放入堆中替换掉最小值。Python实现函数如下：

    [ccen_python]from random import Random
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
            selection[index] = item[/ccen_python]

每次拿到一个新的元素，通过[ccei\_python]key = rand.random() \*\* (1.0 /
weight)[/ccei\_python]产生一个与其权重有关的随机键值key。当元素个数小于m时，直接将新的元素放入堆空间中（但并不建堆），这样只用O(1)时间；当遇到第m个元素后，堆空间放满了，这时候进行建堆操作（[ccei\_python]heapify(heap)[/ccei\_python]），需要O(m)时间；之后每拿到一个新的元素，用O(1)时间从堆顶拿出最小值与新元素的键值比较，如果后者更大就用后者替换掉堆顶元素，对堆进行必要的操作（O(log
m)时间）以保持其结构（[ccei\_python]heapreplace(heap, (key,
index))[/ccei\_python]）。

关于Python中的堆可以参考：<http://docs.python.org/library/heapq.html>。

总体来看，整段程序用时O(n \* log
m)，占用O(m)辅助空间。这样的处理比较适用于[ccei]m \<\<
n[/ccei]的情况。当m与n接近时，可以用n个辅助空间存储所有元素的键值，当遍历结束后用O(n)时间对这n个元素执行快速选择算法，选出m个最大的元素即可，耗时O(n)，辅助空间O(n)。

用同样一组具有等差分布权重的元素调用WeightedRandomSample十万次，得到如下的概率分布，与理论分布非常接近。

[caption id="attachment\_1173" align="alignnone" width="653"
caption="用WeightedRandomSample函数随机选取m个元素，第i个元素被选中的概率"]![weighted\_sample\_p][][/caption]

  [前一篇]: http://www.gocalf.com/blog/weighted-random-selection.html
  [weighted\_sample\_p]: http://www.gocalf.com/blog/wp-content/uploads/2011/09/weighted_sample_p.png
    "weighted_sample_p"
