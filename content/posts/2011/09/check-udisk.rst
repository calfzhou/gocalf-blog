U盘检测软件：ChipGenius，MyDiskTest
###################################
:date: 2011-09-08 22:13
:modified: 2011-09-08 22:13
:author: Calf
:category: 硬件
:tags: FlashDisk, Disk Check
:keywords: ChipGenius, MyDiskTest, U盘检测, 优盘检测, 移动存储, 金士顿U盘
:slug: check-udisk
:featured_image: http://www.gocalf.com/blog/images/2011/09/usbdrive.png
:summary: 以前买到过一个假冒的8GB U盘，是用劣质的4GB芯片改装的，后来用软件检测出来了，今天来分享一下。

几年前的事情了。有一次去北邮玩，看到校园里有卖U盘的摊位，问了问价格，8GB的金士顿U盘99块钱。正好头一天有个同事跟我说最近U盘降价了，8GB才99，于是心里一痒痒就买了一个。回来用着就感觉不对劲，读写速度超慢不说，放的东西多了之后就有好多读不出来。赶紧找了软件来检测，果然是假货，是用4GB的假冒机芯改装的。今天分享一下检测用的软件和方法。

.. more

先介绍一下在没有软件的时候怎么判断是否是真的金士顿U盘。直观上可以仔细观察U盘上的标签、防伪标识、防伪电话等等，制作粗糙的一般都是假冒的。除此之外可以注意两点：

-  当真的金士顿U盘接到电脑上后，电脑中显示的卷标应该是“Kingston”（刚买来的应该是这样），而假冒的一般会是“可移动磁盘”之类的；
-  真的金士顿U盘在读写的时候，背部的小灯会闪烁，但假冒的一般不会亮。

下面介绍第一个小软件：ChipGenius。它可以识别出U盘（或其他USB设备）的主控芯片型号、制造商、品牌等信息。这个软件绿色小巧，便于携带，是外出选购U盘是必不可少的工具之一。下面两张图是真假金士顿U盘用此软件识别后的对比，真的U盘是公司发的，假的是我在北邮买的。

.. figure:: {filename}/images/2011/09/real_kingston.png
    :alt: real_kingston
    
    正牌8G金士顿U盘在ChipGenius中的检测结果

.. figure:: {filename}/images/2011/09/fake_kingston.png
    :alt: fake_kingston
    
    冒牌扩容8G金士顿U盘在ChipGenius中的检测结果

可见，关键的区别就在产品制造商（Product Vendor）和产品型号（Product
Model）上，正牌的应该是Kingston DataTraveler 2.0，而假冒的通常都是USB
2.0 Flash Disk之类的东西。

有一点比较奇怪的是，我在英文Vista上运行该软件，显示版本是2.64，在中文Xp上运行，则显示2.70，呵呵，无视之。

如果只是芯片是冒牌货我也忍了，最可气的是芯片的实际容量只有4GB。接下来介绍的这个软件就可以检测出来，叫做MyDiskTest。这个软件功能很强，我最喜欢的就是扩容检测和坏块扫描了，速度很快，比我自己写的程序一点一点扫描快多了。另外它还可以进行速度测试和坏块屏蔽。不说废话，直接上对比图，还是我的一真一假两只U盘。

.. figure:: {filename}/images/2011/09/real_8g_chip.png
    :alt: real_8g_chip
    
    正牌8G金士顿U盘在MyDiskTest中的检测结果

.. figure:: {filename}/images/2011/09/fake_8g_chip.png
    :alt: fake_8g_chip
    
    冒牌扩容8G金士顿U盘在MyDiskTest中的检测结果

可见，我这个假冒的U盘是用杂牌的4G机芯改装出来的。由于是在校园里路边买的，虽然要了收据（号称是海龙的来这里搞活动），但收据上的摊位也是假的。目前只好暂时用MyDiskTest把坏块屏蔽掉使用了（否则写入的文件超过4G后的内容将无法写入但又不会报错，直到读出来的时候才会发现内容全部是0×00）。

好在两个软件都非常小，这里就直接提供下载吧（压缩包内有详细使用说明，就不多说了）：

-  `ChipGenius v2.64`_ （113K） MD5：2628f1748e558bd71ab661ae1ab27aa5
-  `MyDiskTest v2.50`_ （610K） MD5：7d4bfeb1e01f748fe3bd2b6a590bd83b

真想哪天背着本本出来去街边买个U盘，现场检测，揭穿这些奸商的把戏。

.. _ChipGenius v2.64: {filename}/assets/2011/09/ChipGenius_264.zip
.. _MyDiskTest v2.50: {filename}/assets/2011/09/MyDiskTest_250.zip
