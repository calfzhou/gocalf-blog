Title: 单次遍历，等概率随机选取问题
Date: 2011-09-06 00:24
Author: Calf
Category: 算法
Tags: Algorithm, Coroutines and Generators, Random Sample, Random Selection, 单次遍历, 概率, 相等权重, 等概率, 算法题, 随机数, 随机选取, 面试题
Slug: random-selection

又是一道概率问题，不过跟之前的题目一样，这也是一道非常简单的题目。

问题描述：假设我们有一堆数据（可能在一个链表里，也可能在文件里），数量未知。要求只遍历一次这些数据，随机选取其中的一个元素，任何一个元素被选到的概率相等。O(n)时间，O(1)辅助空间（n是数据总数，但事先不知道）。<!--more-->

如果元素总数为n，那么每个元素被选到的概率应该是1/n。然而n只有在遍历结束的时候才能知道，在遍历的过程中，n的值还不知道，可以利用乘法规则来逐渐凑出这个概率值。在[《利用等概率Rand5产生等概率Rand3》][]中提到过，如果要通过有限步概率的加法和乘法运算，最终得到分子为1、分母为n的概率，那必须在某一次运算中引入一个n在分母上，而分母和分子上其他的因数则通过加法、乘法、约分等规则去除。

很容易能够想到这样一个简单的式子来凑出1/n：

[latex]p\_i=\\frac{1}{i}\\times\\frac{i}{i+1}\\times\\frac{i+1}{i+2}\\times\\cdots\\times\\frac{n-1}{n}=\\frac{1}{n}[/latex]

下面用一段Python程序来实现这个过程，这里设计了一个类，叫做RandomSelector，提供方法AddItem，在遍历数据的时候把每个元素通过这个函数传进来，最后通过SelectedItem获取随机选择的元素。这么做主要是为了强调事先不知道元素的总数。

    [ccen_python]from random import Random

    class RandomSelector:
      def __init__(self, rand=None):
        self._selectedItem = None
        self._count = 0
        self._rand = rand
        if self._rand is None:
          self._rand = Random()

      def SelectedItem(self):
        return self._selectedItem

      def Count(self):
        return self._count

      def AddItem(self, item):
        if self._rand.randint(0, self._count) == 0:
          self._selectedItem = item
        self._count += 1[/ccen_python]

在Python 2.5中，yield不仅是个语句，更是一个表达式（详见[PEP 342 --
Coroutines via Enhanced
Generators][]，查阅Generator和Coroutine，中文叫做“生成器”和“协程”），利用yield可以把程序写的更简洁一些：

    [ccen_python]from random import Random

    def RandomSelect(rand=None):
      selection = None
      count = 0
      if rand is None:
        rand = Random()
      while True:
        # Outputs the current selection and gets next item
        item = yield selection
        if rand.randint(0, count) == 0:
          selection = item
        count += 1[/ccen_python]

下面这段程序示意了如何调用RandomSelect函数来测验其随机效果：

    [ccen_python]# Sample code to use RandomSelect function
    n = 10
    repeat = 100000
    occurrences = [0 for i in xrange(n)]
    rand = Random()
    for i in xrange(repeat):
      selector = RandomSelect(rand)
      selector.next()
      selection = None
      for item in xrange(n):
        selection = selector.send(item)
      occurrences[selection] += 1
    print occurrences[/ccen_python]

十个元素，重复十万次，理论上每个元素会被选中恰好一万次。某次实验结果如下：

    [cc][10020, 10084, 10003, 10008, 9985, 10145, 9987, 9925, 9955, 9888][/cc]

可见每个元素被选中的次数相差不大，是等概率的。

如果用C\#，就可以利用IEnumerable来实现，比如：

    [ccen_csharp]public static bool RandomSelect(
        IEnumerable source,
        Random random,
        out TSource selectedItem)
    {
        if (source == null)
        {
            throw new ArgumentNullException("source");
        }
        if (random == null)
        {
            random = new Random();
        }

        selectedItem = default(TSource);
        int count = 0;
        foreach (TSource item in source)
        {
            if (random.Next(++count) == 0)
            {
                selectedItem = item;
            }
        }

        return (count > 0);
    }[/ccen_csharp]

核心代码也就那么两三行而已，时间复杂度为O(n)（并且只遍历一次），空间复杂度为O(1)。其中Python的[cci\_python]random.randint(x,
y)[/cci\_python]返回[x,
y]之间的随机整数；C\#的[cci\_csharp]Random.Next(x)[/cci\_csharp]返回[0,
x)之间的随机整数。

看一下概率，如果最终被选取的是第i个元素（1 \<= i \<=
n），那就必须是遍历到它的时候，恰好被选中（[cci\_python]random.randint(0,
i - 1) == 0[/cci\_python]或者[cci\_csharp]Random.Next(i) ==
0[/cci\_csharp]），并且从此之后都恰好再也没有被其他元素替换掉。这些事件彼此独立，计算概率的方法正好是上面提到的式子，最终的概率就是1/n。

OK，问题解决了。结束之前再做个简单的扩展，改成等概率随机选取m个元素（可知每个元素被选中的概率都是m/n）。

解决办法也非常简单，只要在上面的代码中，把selectedItem（selection）改成一个长度为m的数组，稍作调整就可以了。

这里就给出Python的程序片段：

    [ccen_python]from random import Random

    def RandomSample(m=1, rand=None):
      selection = []
      count = 0
      if rand is None:
        rand = Random()
      while True:
        # Outputs the current selection and gets next item
        item = yield selection
        if len(selection) < m:
          selection.append(item)
        else:
          idx = rand.randint(0, count)
          if idx < m:
            selection[idx] = item
        count += 1[/ccen_python]

时间复杂度O(n)，空间复杂度O(m)（不可能是O(1)的）。概率的计算方法为：

[latex]p\_i=\\left\\{\\begin{array}{ll}
\\frac{m}{i}\\times\\frac{i}{i+1}\\times\\frac{i+1}{i+2}\\times\\cdots\\times\\frac{n-1}{n}=\\frac{m}{n}
& i \> m \\\\
1\\times\\frac{m}{m+1}\\times\\frac{m+1}{m+2}\\times\\cdots\\times\\frac{n-1}{n}=\\frac{m}{n}
& i \\leq m \\end{array} \\right.[/latex]

等概率问题通常都是比较简单的。下一次将会对这个问题做进一步的扩展，变成每个元素都有一个权重，要求任何一个元素被选取的概率正比于其权重。

  [《利用等概率Rand5产生等概率Rand3》]: http://www.gocalf.com/blog/build-rank3-from-rand5.html
  [PEP 342 -- Coroutines via Enhanced Generators]: http://www.python.org/dev/peps/pep-0342/
