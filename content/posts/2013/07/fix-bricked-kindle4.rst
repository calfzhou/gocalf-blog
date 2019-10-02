Kindle 4 修砖记
###############
:date: 2013-07-29 10:13
:modified: 2013-07-29 10:13
:author: Calf
:category: 数码电子
:tags: Kindle
:keywords: Kindle 4, unbrick, USB Net, Your Kindle Needs Repair, 修砖
:slug: fix-bricked-kindle4
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2013/07/kindle_needs_repair.png
:summary: 入手一年的 Kindle 4 突然变成砖头了，屏幕显示“Your Kindle Needs Repair”，花了大半个晚上的时间才修好它，简单记录一下。

.. contents::

入手一年的 Kindle 4 突然不能用了，屏幕显示“Your Kindle Needs
Repair”，原来就是传说中的变成砖头了。

花了大半个晚上的时间才修好它，简单记录一下。

.. more

先说下机器的情况。这是美版的 Kindle 4 广告版，曾经装过多看，但早就删掉了，现在用的是原生系统，应该是 4.0.1 吧。

之前都好好的，用多看系统的时候经常死机，后来回到原生系统就不再死机了。最近有一段时间没用，一直扔在抽屉里。那天想用的时候发现一点儿电都没有，于是开始充电。充电的时候手欠，按了电源键想开机，然后就这样了，重启了无数次都没有任何改变。

搜了一下，好多修砖的攻略都说只适用于装了多看系统的 Kindle，实在没搞明白，想来老外应该不会都用多看吧，那他们怎么修呢？

修砖需要用到的一些工具，我观察到的都是 Windows 程序，所以一切操作都在 Windows
7 的虚拟机中进行。如果是 Windows XP，可能在驱动方面会稍微麻烦一些。

1. 让 Kindle 进入诊断模式
-------------------------

工具：Kindle Select Boot，我是在 `这里`_ 下载到的。

用 USB 先把 Kindle 连接到电脑上（我用的虚拟机，所以还要把设备接到虚拟机里），一直按住 Kindle 底部的电源键，等指示灯熄灭后，不松开电源键按住方向键下（↓），然后松开电源键，再松开方向键。这使得 Kindle 进入了 USB 恢复模式。

想要知道这个操作是否成功，可以在 Windows 系统的 Device
Manager（硬件管理器）里查看 Human Interface
Devices 下，是否出现了 HID-compliant device。如果还是 USB Human Interface
Device 就得再来一次了。

运行 KindleSelectBoot 文件包中的 MfgTool.exe，在界面的上半部会看到一个 HID-compliant
device 的信息，在下半部的 Profile 那里选择 Kindle
diags（当时没截图，现在也懒得再折腾一次 Kindle 了）。点击右下角的 Start 按钮，就可以让 Kindle 进入诊断模式。

2. 将 mmcblk0p1.img 拷贝到 Kindle 中
------------------------------------

需要下载一个叫做 mmcblk0p1.img 的文件，其实我也不清楚这到底是什么，看起来是个镜像文件。我下载的是 `mmcblk0p1\_410.img`_\ （点击下载），RAR 压缩包的大小是 144MB，解压后 358MB。

在 Kindle 诊断模式菜单中选择“U) USB device
mode”，电脑就会将 Kindle 识别为 U 盘，将下载解压后的 .img 文件拷贝到 Kindle 根目录下。

虽说整个修砖过程对 Kindle 内的电子书没有影响，我还是趁这个机会赶紧把数据备份了一下。

拷贝完成后，在 Kindle 上按左方向键退出 U 盘模式，并返回主菜单。

3. SSH 登录到 Kindle
--------------------

在 SSH 登录之前，先要确认一下 Kindle 系统的版本和序列号（Serial
Number），以便获取 root 密码。系统版本我是没注意到，序列号在 Kindle 诊断模式主菜单第一项里就能找到。

记下序列号后，在 Kindle 诊断模式菜单中依次选择：“N) Misc individual
diagnostics”、“U) Utilities”、“Z) Enable USBnet”，然后按方向键右键返回。

在电脑的硬件管理器中可以看到有一个叫 RNDIS\\Ethernet
card 的硬件，点击升级驱动，然后选择手动浏览驱动 -> 自选驱动 -> 网络适配器，在厂商中选择“Microsoft
Corporation”，驱动选择“Remote NDIS Compatible
Device”，强制安装驱动即可。（如果是 Windows XP，则需要下载安装 RNDIS
Ethernet 驱动，`点此下载`_。）

装好驱动，进入网络中心，看到有一块新的网卡设备。点击右键查看属性，在 IPv4 选项中，将 IP 地址设置为“192.168.15.200”，子网掩码是默认的“255.255.255.0”。

用 SSH 客户端（我用的是 Putty）登录 Kindle，IP 地址为 192.168.15.244，用户名是 root。密码可以先试试“mario”（针对 4.0 系统），如果不行，就将序列号输入到下面的文本框中得到密码（针对 4.0.1 系统）（若无法显示请猛击 `这里 <{static}/assets/2013/07/kindle_root_password.html>`__）。

.. raw:: html

    <iframe frameborder="0" height="50" scrolling="no" src="{static}/assets/2013/07/kindle_root_password.html" width="100%"></iframe>

其实 root 密码就是“fiona”加上序列号 MD5 值中的一部分。生成代码如下（Python
2.7.\*）：

.. code-block:: python

    import hashlib
    serial_number = 'USE YOUR OWN SERIAL NUMBER'
    password = 'fiona%s' % hashlib.md5('%s\n' % serial_number).hexdigest()[7:11]
    print password

4. 进行系统恢复
---------------

SSH 登录成功后，在终端中运行如下命令来恢复系统（大概需要几分钟的时间）：

.. code-block:: bash
    :linenos: none

    dd if=/mnt/us/mmcblk0p1_410.img of=/dev/mmcblk0p1 bs=4K

成功后，我又运行了另外几个命令以免还是不能重启，有的命令根本就没执行成功，可能要看具体的情况了：

.. code-block:: bash
    :linenos: none

    dd if=/dev/zero of=/dev/mmcblk0p3 bs=4K
    rm /var/local/system/.framework_reboots
    rm /var/local/system/.framework_retries

5. 完成
-------

这些都弄完了，长按电源键重启 Kindle，终于恢复了。

.. _这里: http://www.mobileread.com/forums/showthread.php?t=169645
.. _mmcblk0p1\_410.img: http://60.211.209.221/cdn.baidupcs.com/file/01589c0ba1f05e9e4f55e35d02ffc05b?xcode=053458c9324860ffda9317ddb745a10aa9749899cf109a05&fid=2601356780-250528-1879823735&time=1374668763&sign=FDTAXER-DCb740ccc5511e5e8fedcff06b081203-7N%2BEg07f9BuUIjG8wPMKIV8gURM%3D&to=cb&fm=N,B,T&expires=8h&rt=sh&r=586640283&logid=1498755034&sh=1&wsiphost=ipdbm
.. _点此下载: http://b.billgong.com/wp-content/uploads/2012/03/RNDIS-Ethernet-Driver.zip
