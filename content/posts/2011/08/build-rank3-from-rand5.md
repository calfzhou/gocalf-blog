Title: 利用等概率Rand5产生等概率Rand3
Date: 2011-08-02 23:10
Author: Calf
Category: 算法
Tags: Algorithm, 极限, 概率, 等概率, 算法题, 随机数, 面试题
Slug: build-rank3-from-rand5
Summary: 问题描述：现在有一个叫做Rand5的函数，可以生成等概率的[0, 5)范围内的随机整数，要求利用此函数写一个Rand3函数（除此之外，不能再使用任何能产生随机数的函数或数据源），生成等概率的[0, 3)范围内的随机整数。

问题本身很明确，但不知道起个什么题目好，姑且先这么说吧。

问题描述：现在有一个叫做Rand5的函数，可以生成等概率的[0,
5)范围内的随机整数，要求利用此函数写一个Rand3函数（除此之外，不能再使用任何能产生随机数的函数或数据源），生成等概率的[0,
3)范围内的随机整数。<!--more-->

我第一次遇到这个问题的时候，着实犯了一回傻，自以为是地证明了这个题目是无解的。其实从概率的角度来看，题目的要求就是，利用一个1/5的概率源，通过某种方式产生出1/3的概率输出。我们都知道，概率运算法则有加法和乘法，而在我的记忆中，算法是“在有限步骤内求解某一问题所使用的一组定义明确的规则”，算法的一个重要特征就是有穷性，即一个算法必须保证执行有限步之后结束。那么有限多个1/5通过加法和乘法是不可能的到1/3这个数值的，因为加法和乘法都不会给分母带来新的因子，那么分母中的3根本就不可能出现。

然而我忽略了这样一个式子：

[latex]\\sum\_{i=0}\^\\infty \\left(\\frac{2}{5}\\right)\^i =
\\frac{1}{1-\\frac{2}{5}} = \\frac{5}{3}[/latex]

基于这个想法，我们来看看这个算法是什么样子的：

[wptabs]

[wptabtitle]Python[/wptabtitle]

    [wptabcontent][ccne_python]def Rand3():
      x = -1
      while not 0 <= x < 3:
        x = Rand5()
      return x[/ccne_python][/wptabcontent]

[wptabtitle]C++[/wptabtitle]

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

算法很简单，x是我们最终要输出的数字，只要它不在[0,
3)范围内，就不断地调用Rand5来更新它。直观地看，算法输出的数字只有0、1、2这三个，而且对任何一个都没有偏袒，那么显然每个数字的概率都是1/3，那让我们来严格地计算一下。

以输出0为例，看看概率是多少。x的第一个有效数值是通过Rand5得到的。Rand5返回0的概率是1/5，如果这事儿发生了，我们就得到了0，否则只有当Rand5返回3或4的时候，我们才有机会再次调用它来得到新的数据。第二次调用Rand5之后，又是有1/5的概率得到0，2/5的概率得到3或4导致循环继续执行下去，如此反复。因此概率的计算公式为：

[latex]\\begin{array}{rcl} p & = &
\\frac{1}{5}+\\frac{2}{5}\\times\\left(\\frac{1}{5}+\\frac{2}{5}\\times\\left(\\frac{1}{5}+\\frac{2}{5}\\times\\left(\\cdots\\right)\\right)\\right)
\\\\ & = & \\frac{1}{5}\\times\\sum\_{i=0}\^\\infty
\\left(\\frac{2}{5}\\right)\^i \\\\ & = &
\\frac{1}{5}\\times\\frac{1}{1-\\frac{2}{5}} \\\\ & = &
\\frac{1}{5}\\times\\frac{5}{3} \\\\ & = & \\frac{1}{3}
\\end{array}[/latex]

喏，计算表明，Rand3输出0的概率确实是1/3，对于另外两个数字也是一样的。

那么这段代码是不是一个算法呢，它是否满足算法的有穷性呢？我不能确定，虽然它不停机的概率是0，然而这个概率是一个极限值，唉，回去复习极限知识先。

改变一下题目，如果要求利用Rand5编写Rand7怎么办？很简单，用两个Rand5可以拼出Rand25，然后就用前面的方法即可：

[wptabs]

[wptabtitle]Python[/wptabtitle]

    [wptabcontent][ccne_python]def Rand7():
      x = -1
      while not 0 <= x < 21:
        x = Rand5() * 5 + Rand5()
      return x % 7[/ccne_python][/wptabcontent]

[wptabtitle]C++[/wptabtitle]

    [wptabcontent][ccne_cpp]int Rand7()
    {
        int x;
        do
        {
            x = Rand5() * 5 + Rand5();
        } while (x >= 21);
        return x % 7;
    }[/ccne_cpp][/wptabcontent]

[/wptabs]
