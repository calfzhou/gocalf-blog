将整数数字转换成中文
####################
:date: 2014-01-28 09:30
:modified: 2014-01-28 09:30
:author: Calf
:category: 程序开发
:tags: Python, Unit Test, Natural Language
:keywords: Python, 中文数字, 数据驱动测试, DDT, Data Driven Test, unit test
:slug: number-to-chinese
:lang: zh_cn
:summary: 一个简单的开发问题，（用 Python）编写一段程序，将一个任意给定的整数转换成对应的中文读法。比如输入数字 -12345，输出字符串“负一万二千三百四十五”。

.. contents::

今天来看一个简单的程序开发问题，（用 Python）编写一段程序，将一个任意给定的整数（可正可负）转换成对应的中文读法。比如输入数字 -12345，输出字符串“负一万二千三百四十五”。

同时也会稍微涉及到数据驱动的测试（data driven test）。

.. NOTE::

    实际上，对于同一个数字，用中文的读法可能不唯一，在不同的场合也可能会有不同的习惯。我这里采用 Google 拼音输入法提供的读法。

.. more

准备工作
========

基本的方法很简单，从高位到低位依次把每个数字映射成对应的汉字，再把位数对应的汉字加上就可以了。如果是负数，则在前面加一个“负”即可。

先把用中文读一个数字所需要的汉字都找出来，它们是“负零一二三四五六七八九十百千万亿兆”等。注意这里的“兆”表示 10 的 12 次方，而不是计算机领域的 10 的 6 次方。在开始之前，先要把这些汉字分分类，比如一二三四之间的差异跟十百千就不一样，跟万亿兆也不一样。

最特殊的字是“负”，用一个单独的常量保存它。

然后是“零”。在计数体系中，“零”跟其他数字可是有着本质区别的，在中文表达的时候，这种特殊性也非常明显，所以也单独分配一个常量。

数字“一二三四五六七八九”是十进制数字中，除零之外的基本字符，对应了除“0”之外的全部九个阿拉伯数字符号。用一个常量数组保存。它们的特点是构成了一个差值为 1 的等差数列。

“十百千”是每个万组内的数位标识，是一个比值为 10 的等比数列。在这里大家可以看出为什么不把“十”跟上一组汉字放在一起。

最后是“万亿兆”，是比值为 10^4 的等比数列。实际上后面还可以继续写下去（参见 `个十百千万亿兆后面是什么`_），比如 10^16 用“京”表示，再往后依次是“垓”、“杼”、“穰”、“溝”、“澗”、“正”、“載”、“極”（10^48）。如果还要写下去，还有“恆河沙”、“阿僧祇”、“那由他”、“不可思議”、“無量”、“大數”（10^72）。这种计数体系称为中法，是万进系统，以万递进。当然扯远了，程序中我们只用到“兆”，如果想要支持后面的字，只要修改常量就可以，对程序逻辑没有影响（除非要修改计数体系）。

又啰嗦了。看一下这部分的代码（Python 2.7.x）。

.. code-block:: python

    # -*- coding: utf-8 -*-

    CHINESE_NEGATIVE = '负'
    CHINESE_ZERO = '零'
    CHINESE_DIGITS = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    CHINESE_UNITS = ['', '十', '百', '千']
    CHINESE_GROUP_UNITS = ['', '万', '亿', '兆']

初始版本
========

常量定义好之后，就先写个最简单的处理方法。负数和零就不多说了，只看正数的情况。

比如数字是 12345，输出应该是“一万二千三百四十五”，在这种最普通的情况下，操作方法就是把每个数字对应的汉字和该数位所对应的汉字拼在一起，然后每个万组还要加上该万组的单位（即“万亿兆”）。

因此首先需要从高位到低位枚举每一位数字，要同时知道数字和对应的数位（比如个位是 0，十亿位是 9，等等）。下面这段简单的程序是从低位开始枚举，使用的时候只要反转（reverse）一下就可以了。

.. code-block:: python

    def _enumerate_digits(number):
    """
    :type number: int|long
    :rtype: collections.Iterable[int, int]
    """
    position = 0
    while number > 0:
        digit = number % 10
        number //= 10
        yield position, digit
        position += 1

然后来写第一个版本的目标函数，translate_number_to_chinese。

.. code-block:: python

    def translate_number_to_chinese(number):
    """
    :type number: int|long
    :rtype: string
    """
    if not isinstance(number, int) and not isinstance(number, long):
        raise ValueError('number must be integer')

    if number == 0:
        return CHINESE_ZERO

    words = []

    if number < 0:
        words.append(CHINESE_NEGATIVE)
        number = -number

    # Begin core loop.
    # Version 0.1
    for position, digit in reversed(list(_enumerate_digits(number))):
        unit = position % len(CHINESE_UNITS)
        group = position // len(CHINESE_UNITS)

        if digit != 0:
            words.append(CHINESE_DIGITS[digit])
            words.append(CHINESE_UNITS[unit])

        if unit == 0:
            words.append(CHINESE_GROUP_UNITS[group])

    # End core loop.

    return ''.join(words)

啊，由于工作原因，代码风格有所调整。以前在 Python 里函数名采用驼峰方式，首字母大写。现在改用小写加下划线了。

单元测试
========

显然上面的代码是有问题的，比如如果数字中有 0，有些结果就不太对。对于 11 到 19 的处理也有问题。因此需要做单元测试，多准备各种情况的测试用例尽可能覆盖更多的特殊情况。

这里不详细说怎么创建和编写单元测试，只说一下数据驱动的测试（Data Driven Test）。

一般在 Python 里写单元测试，比如想测试一下输入 10 时，程序输出是否正确。那就添加一个测试方法（test method），调用函数得到实际的输出值（现在应该是“一十”），跟期望的输出（应该是“十”）作比较。

这样做的缺点是，如果想增加一个用例，就要添加一段代码，而新添加的代码整个逻辑是一样的，只是其中的输入和期望输出变了，代码重复度太高，而且也太麻烦了。

对于这种情况会比较多的测试，一般会把各种需要测试的输入和期望输出写在一个数据文件里。于是可以在测试方法中读入文件中的每一组数据，用 for 循环依次进行测试。如果所有的测试用例都能成功也就没什么问题，但如果有些用例会失败，一旦某个用例失败，测试方法就会停止，后面的数据就不会再被测到。这样每次都只能看到第一个出现的错误，无法得到完整的测试结果。在改 bug 的时候，也很容易出现按住葫芦浮起瓢的事情。

以前用 C# 的时候，做数据驱动的测试非常方便，只要给测试方法添加 `DataSource Attribute`_ 就可以了。在 Python 里没有发现直接的方法，不过可以自己写一个简单的函数来处理，原理就是用数据文件中的每一个测试用例给测试类动态添加一个测试方法。

.. code-block:: python

    # -*- coding: utf-8 -*-
    from unittest import TestCase
    from foo import translate_number_to_chinese


    class TestTranslateNumberToChinese(TestCase):
        pass


    def create_number_test_function(number, expected):
        def _test_method(self):
            actual = translate_number_to_chinese(number)
            print actual, expected
            self.assertEqual(actual, expected)

        return _test_method


    def add_tests():
        number_data_path = 'number_data.txt'
        with open(number_data_path) as data_file:
            for line in data_file:
                line = line.rstrip('\r\n')
                number_text, expected = line.split('\t')
                number = int(number_text)
                setattr(TestTranslateNumberToChinese, 'test_number_{}'.format(number),
                        create_number_test_function(number, expected))

    add_tests()

上面的示意中，假设测试用例保存在一个叫做“number_data.txt” 的 TSV 文件中。每行用 TAB 分割为两列，分别是阿拉伯数字和期望的中文读法。

“add_tests”方法对每一个测试用例，调用“create_number_test_function”创建一个测试方法，添加到测试类“TestTranslateNumberToChinese”中。

假设这段测试代码所在的文件叫做“test_translate_number_to_chinese.py”，那么在命令行运行如下命令就可以把所有的测试用例都测一遍。

.. code-block:: shell

    python -m unittest test_translate_number_to_chinese

大刀阔斧进行修改
================

准备好测试方法和足够的测试用例后，就可以放心地对代码进行修改了。每次修改一点儿，都可以跑一下单元测试，看看又成功或者失败了几个用例，总结出规律，继续改进。

特殊的“0”
---------

目前主要的问题在于对“0”的处理上，上面的程序忽略了所有的“0”。

实际上，在一个万组内，末尾所有连续的“0”都不用读，如 500：五百、20：二十。这方面刚好上面的代码就是这样处理的。注意这个规则不仅仅针对数字最末尾的“0”，而是对每一个万组都有效的。比如 2005678：二百万五千六百七十八（不加“零”）。

在一个万组内，如果两个非零数字之间有一个或者多个“0”，都需要（且只需要）读一个“零”。如 201：二百零一、3006：三千零六、1020：一千零二十。

一个万组内，如果高位数字是 0，那么是否需要读出来就看更高的万组是什么情况了。如果没有更高的万组，就不用读，否则就需要。比如 0200（实际上首位的 0 就不出现了）：二百、10200：一万零二百。

添加两个局部变量来记录一下状态，一个是“group_is_zero”记录当前处理的万组是否仍然是全 0，另一个是“need_zero”记录是否需要添加一个“零”。

把上面 translate_number_to_chinese 中的 core loop 修改一下，得到：

.. code-block:: python

    # Begin core loop.
    # Version 0.2
    group_is_zero = True
    need_zero = False
    for position, digit in reversed(list(_enumerate_digits(number))):
        unit = position % len(CHINESE_UNITS)
        group = position // len(CHINESE_UNITS)

        if digit != 0:
            if need_zero:
                words.append(CHINESE_ZERO)

            words.append(CHINESE_DIGITS[digit])
            words.append(CHINESE_UNITS[unit])

        group_is_zero = group_is_zero and digit == 0

        if unit == 0:
            words.append(CHINESE_GROUP_UNITS[group])

        need_zero = (digit == 0 and (unit != 0 or group_is_zero))

        if unit == 0:
            group_is_zero = True

    # End core loop.

全零的万组
----------

接下来遇到的问题是，如果一个万组完全是 0，就不要再添加对应的单位了，比如 100000000：一亿（现在会输出“一亿万”）。

解决方法很简单，把上面的 ``if unit == 0:`` 改成 ``if unit == 0 and not group_is_zero:`` 即可。完整代码略。

麻烦的“1”
---------

最后一种特殊的情况是由数字“1”引起的。

在一个万组内，如果千位和百位都是“0”，十位是“1”，那么这个“一”就不用读出来，比如 10：十、14：十四。

但如果千位或者百位不是“0”，这个“一”就需要读出来，比如 213：二百一十三、2013：二千零一十三。

当更高的万组存在时，即使当前万组的千位和百位都为“0”，也需要读出“一”，比如 20010：二万零一十。

解决的方法是在上面的 ``words.append(CHINESE_DIGITS[digit])`` 前面增加条件：

.. code-block:: python

    if digit != 1 or unit != 1 or not group_is_zero or (group == 0 and need_zero):

最后完整的 core loop 代码为：

.. code-block:: python

    # Begin core loop.
    # Version 0.4
    group_is_zero = True
    need_zero = False
    for position, digit in reversed(list(_enumerate_digits(number))):
        unit = position % len(CHINESE_UNITS)
        group = position // len(CHINESE_UNITS)

        if digit != 0:
            if need_zero:
                words.append(CHINESE_ZERO)

            if digit != 1 or unit != 1 or not group_is_zero or (group == 0 and need_zero):
                words.append(CHINESE_DIGITS[digit])

            words.append(CHINESE_UNITS[unit])

        group_is_zero = group_is_zero and digit == 0

        if unit == 0 and not group_is_zero:
            words.append(CHINESE_GROUP_UNITS[group])

        need_zero = (digit == 0 and (unit != 0 or group_is_zero))

        if unit == 0:
            group_is_zero = True

    # End core loop.

试试看
======

代码介绍完了，下面放一个用 JavaScript 实现的版本，可以随便输入一些数字试试看。源代码参见 http://jsfiddle.net/calfzhou/tGEz7/。

.. raw:: html

    <script type="text/javascript">
    function translateNumber(numberText) {
        var CHINESE_NEGATIVE = "负";
        var CHINESE_ZERO = "零";
        var CHINESE_DIGITS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        var CHINESE_UNITS = ["", "十", "百", "千"];
        var CHINESE_GROUP_UNITS = ["", "万", "亿", "兆", "京", "垓", "杼", "穰", "溝", "澗", "正", "載", "極"];
        if (numberText === "") {
            return "";
        }
        numberText = numberText.replace(/^0+/g, "");
        numberText = numberText.replace(/^-0+/g, "-");
        if (numberText === "" || numberText === "-") {
            return CHINESE_ZERO;
        }
        var result = "";
        if (numberText[0] === "-") {
            result += CHINESE_NEGATIVE;
            numberText = numberText.substring(1);
        }

        var groupIsZero = true;
        var needZero = false;
        for (var i = 0; i < numberText.length; ++i) {
            var position = numberText.length - 1 - i;
            var digit = parseInt(numberText[i]);
            var unit = position % CHINESE_UNITS.length;
            var group = (position - unit) / CHINESE_UNITS.length;

            if (digit !== 0) {
                if (needZero) {
                    result += CHINESE_ZERO;
                }

                if (digit !== 1 || unit !== 1 || !groupIsZero || (group === 0 && needZero)) {
                    result += CHINESE_DIGITS[digit];
                }

                result += CHINESE_UNITS[unit];
            }

            groupIsZero = groupIsZero && (digit === 0);

            if (unit === 0 && !groupIsZero) {
                result += CHINESE_GROUP_UNITS[group];
            }

            needZero = (digit === 0 && (unit !== 0 || groupIsZero));

            if (unit === 0) {
                groupIsZero = true;
            }
        }
        return result;
    }
    function doNumberTranslation() {
        numberText = document.getElementById('number-input').value;
        chinese = translateNumber(numberText);
        document.getElementById('chinese-output').value = chinese;
    }
    </script>
    <form action="javascript:doNumberTranslation();">
        <div class="input-group">
            <input id="number-input" placeholder="Enter an integer then click Go" maxlength="52" type="text" class="form-control" pattern="-?[0-9]+" />
            <span class="input-group-btn">
                <button class="btn btn-default" type="submit">Go!</button>
            </span>
        </div>
    </form>
    <div>
        <textarea id="chinese-output" type="text" readonly="readonly" rows="3" class="form-control"></textarea>
    </div>

.. _个十百千万亿兆后面是什么: http://www.douban.com/group/topic/5404723/
.. _DataSource Attribute: http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.unittesting.datasourceattribute.aspx
