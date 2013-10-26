C++中的常量指针和指针常量
##############
:date: 2011-08-04 23:39
:author: Calf
:category: 程序开发
:tags: C++, const, Const Pointer, Pointer to Const, 指针, 面试题
:slug: cpp-const-and-pointer

太久不用C++了，竟然连最基本的东西都记不清楚了。今天干活的时候突然想要用指针常量，但突然就忘了指针常量跟常量指针的区别。花了一点儿时间仔细回想了一下几年前上课时老师讲的，总算又回忆起来了，赶紧记录下来备忘。

这可能会被当作面试题，不过不是算法，故而不放在面试算法题系列中。

我觉得容易混淆的罪魁祸首在于中文的翻译问题，如果改叫“常量的指针”和“指针常量”可能会好些。先不管这些，看看英文的叫法：Pointer
to Const 和 Const Pointer。

Pointer to
Const，顾名思义就是一个指针，指向的数据不能被修改，C++语法是[cci\_cpp]int
const\*
ptr[/cci\_cpp]。怎么记忆呢，非常简单，记住要从右往左解读即可。首先这是个变量（[cci\_cpp]ptr[/cci\_cpp]）；然后发现它是个指针（[cci\_cpp]\*[/cci\_cpp]）；接下来看到它所指向的数据是不可修改的（[cci\_cpp]const[/cci\_cpp]）；最后这个指针所指向的空间存放的是整数（[cci\_cpp]int[/cci\_cpp]）。

Const
Pointer，也是个指针，但这个指针的值不能被修改（不能再指向其他地方），C++语法是[cci\_cpp]int\*
const
ptr[/cci\_cpp]。同样从右往左读，变量（[cci\_cpp]ptr[/cci\_cpp]）；变量的值不能被修改（[cci\_cpp]const[/cci\_cpp]）；是个指针（[cci\_cpp]\*[/cci\_cpp]）；这个指针所指向的空间存放的是整数（[cci\_cpp]int[/cci\_cpp]）。

可见const修饰的是它右边紧邻的元素，如果右边是指针\*，就表明指针指向的是常量，不能被修改；如果右边是变量，就变明这个变量自身不能被修改。

下面这段C++程序示意了两种指针的区别，其中被注释掉的两行（高亮显示）是因为会无法编译。

::

    [ccen_cpp highlight="14,17"]int a1 = 1;
    int b1 = 2;
    int c1 = 3;

    int* pointer = &a1;
    int const* pointerToConst = &b1;
    int* const constPointer = &c1;

    int a2 = 10;
    int b2 = 20;
    int c2 = 30;
    pointer = &a2;
    pointerToConst = &b2;
    //constPointer = &c2;  // the pointer cannot be moved

    *pointer += 100;
    //*pointerToConst += 100;  // the pointed data cannot be changed
    *constPointer += 100;

    cout << "*pointer = " << *pointer << "\n"
         << "*pointerToConst = " << *pointerToConst << "\n"
         << "*constPointer = " << *constPointer << endl;[/ccen_cpp]

显然程序的输出应该是：

::

    [cc]*pointer = 110
    *pointerToConst = 20
    *constPointer = 103[/cc]

对英文名称理解清楚了，记不记中文名字也就无所谓了吧。我的记忆方法就是“Pointer
to Const”翻译为“常量的指针”，简称“常量指针”；“Const
Pointer”翻译为“指针常量”。

最后简单总结一下跟const相关的变量的写法：

::

    [ccen_cpp lines="-1"]int a = 0;
    int b = 1;

    // An int that cannot be changed.
    const int constNumber_1 = a;
    int const constNumber_2 = a;
    //constNumber_1 = 10;

    // A pointer that can be repointed to an int that cannot be changed.
    const int* pointerToConst_1 = &a;
    int const* pointerToConst_2 = &a;
    pointerToConst_1 = &b;
    //*pointerToConst_1 = 10;

    // A pointer that cannot be moved to an integer that may be changed.
    int* const constPointer = &a;
    //constPointer = &b;
    *constPointer = 10;

    // A pointer that cannot be moved to an integer that cannot be changed.
    const int* const constPointerToConst_1 = &a;
    int const* const constPointerToConst_2 = &a;
    //constPointerToConst_1 = &b;
    //*constPointerToConst_1 = 10;

    // Error, const applied to int twice.
    // (warning C4114: same type qualifier used more than once).
    const int const* pointerToTwiceConst = &a;
    pointerToTwiceConst = &b;
    //*pointerToTwiceConst = 10;

    // A pointer that may be repointed. It points to a pointer that cannot be moved to
    // an int that may be modified.
    int* pa = &a;
    int* const* pointerToConstPointer = &pa;
    int* pb = &b;
    pointerToConstPointer = &pb;
    //*pointerToConstPointer = pb;
    **pointerToConstPointer = 10;[/ccen_cpp]

