隐藏磁盘分区 Q
##############
:date: 2011-07-15 23:34
:modified: 2011-08-03 20:57
:author: Calf
:category: 操作系统
:tags: Windows 7
:keywords: Hide Disk Drive, App-V, SoftGrid
:slug: hide-drive-q
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/07/disk-q.png
:summary: 本文介绍如果隐藏 Windows 7 中那讨厌的无法访问的磁盘分区 Q。

在 Windows 7 操作系统中，有些用户可能会在我的电脑（My
Computer）中看到一个盘符为 **Q** 的本地磁盘分区，在磁盘管理中看不到它，无法访问它，也无法删除它。这个恼人的分区图标虽然不会有什么实际的影响，但似乎总是在眼前晃悠，不得不让人想要立刻干掉它。其实要去掉它是非常容易的，让我们一起来看一下。

.. more

.. figure:: {static}/images/2011/07/disk-q-unaccess.png
    :alt: disk-q-unaccess

    无法访问的虚拟磁盘分区 Q

这个磁盘分区 Q 是 Microsoft Application Virtualization
Desktop（App-V）使用的一个虚拟分区，我也不记得是装了什么之后它就出现了。要隐藏它只要以下几个简单的步骤：

.. figure:: {static}/images/2011/07/disk-q-registry.png
    :alt: disk-q-registry

    修改注册表，添加高亮的两个 DWORD 值

#. 按 Win+R，输入 regedit 并回车，打开注册表编辑器；
#. 找到 HKEY\_CURRENT\_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer
#. 在 Explorer 这个键值下添加如下两个 DWORD（32 位）值：

   #. 第一个名为 ``NoDrives``，值为 16 进制的 ``10000``，也就是十进制的 ``65536``；
   #. 第二个名为 ``NoViewOnDrive``，值同样是 16 进制的 ``10000``；

#. 重启一下 explorer 即可。

再次进入我的电脑，就可以看到那讨厌的 Q 分区消失了。

.. figure:: {static}/images/2011/07/disk-q-hidden.png
    :alt: disk-q-hidden

    虚拟分区 Q 被隐藏

如果对注册表不是非常熟悉的话，请千万谨慎操作。另外可以参考微软官方文档 `How to hide and to restrict access to the App-V (SoftGrid) client drive letter`_，这里有更加细致入微的步骤说明，以及其他殊途同归的方法。

有人或许会对上面添加的两个 16 进制 10000 感兴趣，为什么是这个数，它有什么特殊含义？其实 IT 人很容易发现这个数在二进制中就是 1 后面跟 16 个零，如果看作 bit
mask 的话，就是从最低位开始的第 17 位；而 Q 在字母表中恰好也是第 17 个字母。所以如果想要隐藏别的分区（Why?
:-p），就根据分区盘符的字母顺序修改上述两个 16 进制数值即可。比如改成 16 进制的 4（bit
mask 第三位），那 C 盘就消失了：

.. figure:: {static}/images/2011/07/disk-c-hidden.png
    :alt: disk-c-hidden

    用 16 进制 4 隐藏磁盘分区 C

在微软的 Knowledge
Base 中也提供了类似的隐藏磁盘分区的方法，其中也有详细的磁盘分区盘符与二进制数之间的对应关系，详情请见 `Using Group Policy Objects to hide specified drives`_。

.. _How to hide and to restrict access to the App-V (SoftGrid) client drive letter: http://support.microsoft.com/kb/931626/en-us
.. _Using Group Policy Objects to hide specified drives: http://support.microsoft.com/kb/231289

