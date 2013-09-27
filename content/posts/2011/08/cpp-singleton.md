Title: 可以继承的C++ Singleton基类
Date: 2011-08-12 23:20
Author: Calf
Category: 程序开发
Tags: C++, Design Pattern, Singleton, 单例, 模板类, 继承, 设计模式, 面试题
Slug: cpp-singleton
Summary: 单例模式是设计模式中的一种，它用来保证系统中最多只能存在一个它的实例，其做法是由类自身来创建和持有它的对象实例，把对实例的创建权和管理权都控制在自己手中，以便控制实例数目。本文介绍可以继承的单例类。

单例模式（Singleton
Pattern）是设计模式中的一种，它用来保证系统中最多只能存在一个它的实例，其做法是由类自身来创建和持有它的对象实例，把对实例的创建权和管理权都控制在自己手中，以便控制实例数目。

关于如何在C++中实现单例模式的讨论已经太多了，我只是简单介绍一下可以继承的单例类。

<!--more-->

首先介绍一下通常所见的单例类的写法，不妨设这个类叫做Singleton。

Singleton.h：

    [ccen_cpp]#ifndef _SINGLETON_H_
    #define _SINGLETON_H_

    #include 

    class Singleton
    {
    public:
        static Singleton& GetInstance();

    private:
        Singleton();
        ~Singleton();

        // Use auto_ptr to make sure that the allocated memory for instance
        // will be released when program exits (after main() ends).
        static std::auto_ptr s_instance;
        friend class std::auto_ptr;

        Singleton(const Singleton&);
        Singleton& operator =(const Singleton&);
    };

    #endif[/ccen_cpp]

Singleton.cpp：

    [ccen_cpp]#include "Singleton.h"
    #include 
    #include 

    using namespace std;
    using namespace boost;

    auto_ptr Singleton::s_instance;

    Singleton::Singleton()
    {
        cout << "Construct Singleton" << endl;
    }

    Singleton::~Singleton()
    {
        cout << "Destruct Singleton" << endl;
    }

    Singleton& Singleton::GetInstance()
    {
        static mutex s_mutex;
        if (s_instance.get() == NULL)
        {
            mutex::scoped_lock lock(s_mutex);
            if (s_instance.get() == NULL)
            {
                s_instance.reset(new Singleton());
            }
            // 'lock' will be destructed now. 's_mutex' will be unlocked.
        }
        return *s_instance;
    }[/ccen_cpp]

这个类写的也不完美啦，比如双重判定也会有失效的时候，不过凑合用吧，哈哈。不过话说boost库里也有singleton，我为什么要自己写个呢，无奈地飘过。

废话不多说了，上面的单例类基本上解决了多线程安全问题、实例内存自动释放问题，算是一段可以使用的程序。不过如果系统中有大量单例类（这时候也得好好考虑一下design有没有问题），每个都要这么写一番岂不是很麻烦？要是可以写一个单例基类，以后再创造单例类的时候直接继承一下多方便啊。不过很明显的问题就在那个static对象指针，这个用来保存唯一实例的静态变量如果定义在基类里面，那所有的子类都只能用这同一个变量来保存它们各自的实例了，社会主义国家总得让每个子类都过上温饱生活吧！

以前的时候我还真不知道该怎么解决这个问题，但05年用了WTL（Windows
Template
Library）之后，我才意识到模板类可以帮助我（话说我真的是自己想到的，虽然现在搜一下能搜到一大堆）。这里要用的还不是普通的模板类，而是像ATL、WTL里面那样把要定义的类自身放入模板参数中，形如[ccei\_cpp]class
MyClass : public Base<myclass> {
};[/ccei\_cpp]。这样做有很多优点啦，最显著的比如不需要虚表（节省内存哦）、多态函数的调用在编译时就确定了（既加快了运行速度，也有利于编译器对代码进行优化）。</myclass>

不妨把这个单例基类叫做ISingleton吧，看起来好像是个interface呢。代码如下：

    [ccen_cpp]#ifndef _ISingleton_H_
    #define _ISingleton_H_

    #include 
    #include 

    template 
    class ISingleton
    {
    public:
        static T& GetInstance()
        {
            static boost::mutex s_mutex;
            if (s_instance.get() == NULL)
            {
                boost::mutex::scoped_lock lock(s_mutex);
                if (s_instance.get() == NULL)
                {
                    s_instance.reset(new T());
                }
                // 'lock' will be destructed now. 's_mutex' will be unlocked.
            }
            return *s_instance;
        }

    protected:
        ISingleton() { }
        ~ISingleton() { }

        // Use auto_ptr to make sure that the allocated memory for instance
        // will be released when program exits (after main() ends).
        static std::auto_ptr s_instance;

    private:
        ISingleton(const Singleton&);
        ISingleton& operator =(const ISingleton&);
    };

    template 
    std::auto_ptr ISingleton::s_instance;

    #endif[/ccen_cpp]

要利用ISingleton创建一个自己的单例类，比如MySingleton，可以使用如下的代码：

    [ccen_cpp]#include "Singleton.h"
    #include "ISingleton.h"
    #include 

    using namespace std;

    class MySingleton : public ISingleton
    {
    public:
        // blah blah

    private:
        MySingleton()
        {
            cout << "Construct MySingleton" << endl;
        }

        ~MySingleton()
        {
            cout << "Destruct MySingleton" << endl;
        }

        friend ISingleton;
        friend class auto_ptr;

        MySingleton(const MySingleton&);
        MySingleton& operator =(const MySingleton&);
    };[/ccen_cpp]

最最重要的，千万不要忘了把MySingleton的构造和析构函数弄成private的，还要添加两个友元。有人说ISingleton和MySingleton的析构函数都要加virtual，我倒是觉得没有必要呢，你说呢？另外要注意，MySingleton不能被继承哦。
