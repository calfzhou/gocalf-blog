Dell E6400安装MacOS雪豹10.6
###########################
:date: 2011-07-24 18:08
:modified: 2012-03-02 21:46
:author: Calf
:category: 操作系统
:tags: Hackintosh
:keywords: BootThink, PC, Dell E6400, MacOS, 黑苹果, 雪豹, PC机装Mac, Driver
:slug: dell-e6400-install-mac
:lang: zh_cn
:featured_image: http://www.gocalf.com/blog/images/2011/07/mac_os_x.png
:summary: 半年前在Dell Latitude E6400上安装了Mac OS X Snow Leopard 10.6（与Windows 7并存），除了WiFi之外都挺好的，折腾了好久才搞定，现在又有些记不清了，所以要赶紧留下印记，以免过几天就忘光了。

.. contents::

半年前在Dell Latitude E6400上安装了Mac OS X Snow Leopard 10.6（与Windows
7并存），除了WiFi之外都挺好的，折腾了好久才搞定，现在又有些记不清了，所以要赶紧留下印记，以免过几天就忘光了。

不知道为什么，这次装10.6非常的费劲，尝试了好几个不同的版本（包括原版、iAntares、精简版等等），尝试了光盘安装、硬盘安装，尝试了BootThink引导、变色龙引导，用了一周多的时间才搞成功。相比之下，之前装10.5.5～10.5.7都非常容易呢。

在PC上装Mac的教程满天飞，这里不打算详细讲述，就以跟Dell
E6400有关的部分和遇到的一些问题为主吧，这款机器似乎是最难装Mac的机器之一。

.. more

Dell Latitude E6400硬件配置
---------------------------

为PC装Mac系统最头疼的当然是硬件驱动了，所以在安装前要先搞清楚机器的硬件情况。

-  Chip set

   -  North Bridge: Intel Cantiga PM45
   -  Source Bridge: Intel 82801 IEM ICH9M-E

-  BIOS: Phoenix 05/11/09
-  CPU: Intel Core2 Duo P9600 2800MHz (10.5 x 267)
-  Memory: 2G\*2, 800MHz Dual
-  Storage: Intel ICH9M-E/M SATA AHCI Controller
-  Video: nVIDIA Quadro NVS160M (256MB)
-  Audio:  IDT 92HD 71B7 @ Intel 82801 IB ICH9 - High Definition Audio
   Controller [A-3] PCI
-  Display: 1440x900
-  Network

   -  Ethernet: Intel 82567LG Gigabit Network Connection
   -  WiFi: Intel WiFi Link 5300 AGN （最让人头疼的硬件，驱动无解）

工具和准备工作
--------------

下载了Mac OS X
10.6原版光盘镜像（尝试了很多其他处理好的镜像，全都无法正常安装，最后还是选择用原版），我用的是snowleopard\_10a432\_userdvd.dmg（网上到处都能下载，我就不发链接了），6.13G。这么大就不刻盘了，用光盘装还慢呢。

用硬盘安装的话，一般要给磁盘上新建两个分区，一个放安装盘镜像，一个装Mac。前者6.3G左右（不要格式化），后者试个人需要，一般至少20G（NTFS格式）。我用的BootThink引导似乎要求被引导的系统（包括安装镜像和已经装好的系统）在主分区上，但我的硬盘上没有那么多主分区可以用了（一块硬盘最多可以有四个主分区，我已经有了三个，分别是Win
7保留分区，Win
7系统分区，数据分区），因此就把最后一个主分区名额留给了Mac系统，而把安装盘镜像放到了移动硬盘上。同样注意放安装盘镜像的分区不要格式化。

接下来安装HFS-Explorer（v0.21），运行，按Ctrl+O（菜单File->Load file
system from
file...），选择下载的安装盘镜像，在弹出的对话框里选择Apple\_HFS那项。加载之后点击菜单Tool->Create
disk image...，将生成的文件（.dmg）保存在某个NTFS分区上即可。

.. figure:: {filename}/images/2011/07/hfs_explorer_hfs.png
    :alt: hfs_explorer_hfs

    HFS-Explorer选择Partition

.. figure:: {filename}/images/2011/07/hfs_explorer_view.png
    :alt: hfs_explorer_view

    在HFS-Explorer中查看安装盘镜像

使用HFS-Explorer把下载的安装盘镜像处理一下生成另外一个镜像，主要有三个作用：

-  有些镜像格式无法被后面用到的安装助手识别，这个工具可以做一次格式转换；
-  去掉原镜像的写保护，以便稍后替换OSInstall（也可以直接下载一个别人替换过的镜像，那就不用装这个工具了，也可以跳过后面的MacDriver）；
-  可以对原镜像文件做检验。

接下来就要祭出Leopard硬盘安装助手（v0.3）了。它不需要安装，但在Win
7系统中必须以管理员身份运行（右键点击，选择Run as
administrator）。载入刚才用HFS-Explorer生成的镜像文件，选择之前分好的6.3G左右未格式化的分区，并去掉三个复选框的勾（在boot.ini中加入tboot；强制加入引导及启动代码；PC\_EFI
V8）。点击“开始！”按钮，然后耐心等待。当进度条走满，日志中出现“Change
partition type to AF: Success”、“All done, have fun!”时就算成功了。

.. figure:: {filename}/images/2011/07/lepoard-inshelper.png
    :alt: lepoard-inshelper

    Leopard硬盘安装助手

.. compound::

    接下来要替换OSInstall，这需要安装工具MacDriver（v8.0.4.10），这是个收费软件。装好之后重启系统，就可以进入刚才用硬盘安装助手写入的HFS安装分区了。让Windows显示隐藏文件和系统文件，下载一个PC用的OSInstall，替换掉

    .. code-block:: text
        :linenos: none

        X:\System\Library\PrivateFrameworks\Install.framework\Frameworks\OSInstall.framework\Versions\A\

    里面的同名文件。这样做的目的是使得Mac可以安装在MBR分区表下（否则Mac只能装在GPT（GUID）分区表下，但Windows默认都是用MBR）。（还是直接下载一个已经替换好了的镜像吧，省的麻烦。）

最后还要装引导程序。以前我用的是变色龙引导程序，但这次总是出错，就改用BootThink了。觉得这个比变色龙还要好些吧。不过如果原有系统是Win
7的话，还稍微有一点儿麻烦，就是Win
7那个令人恶心的保留分区。虽然我们一般都把Win
7装在C盘，但在安装过程中，它会在C盘前面保留一个100MB左右的NTFS分区（卷标一般就叫System
Reserved），而这个分区默认是不显示出来的（没有分配盘符）。如果把BootThink装在C盘，那有可能会无法进行引导。所以要把它装在那个保留分区里（幸好它体积不是很大）。在磁盘管理中找到那个保留分区，给它指定一个盘符（我习惯用B），然后把BootThink装在这个分区中。（有人说把C盘标记为活动分区就可以启动BootThink，但我没有成功。）安装之后在目标分区的根目录应该有一个文件夹Darwin和两个文件btldr（系统文件）、btldr.mbr。

准备驱动程序
------------

网上那些破解过的Mac安装镜像里面通常都包含了各种驱动程序，在安装的时候选择需要的就可以了，但不知道为什么我这次怎么都装不成功，所以才用了原版的镜像。但原版镜像里没有PC的驱动程序，这就要借助BootThink了。用BootThink引导刚才制作的替换了OSInstall的硬盘安装分区，它就可以从C:\\Darwin\\System\\LibrarySL\\Extensions\\（我的是B:\\）里面加载放在那里的驱动程序和补丁（不同版本的Mac
OS对应的目录也不太一样，这里就不多说了）。

驱动的选择至关重要啊，选择的不好，轻则某个硬件不工作，重则四国、五国、风火轮（在系统加载时出现用四国或者五国文字写的提示信息，或者风火轮图标一直转却无法进入系统）。这里列出我选择的驱动和补丁。

-  系统补丁

   -  fakesmc.kext：模拟苹果机的SMC，必须的！
   -  NullCPUPowerManagement.kext：禁用电源管理，解决IntelCPUPowerManagement.kext的HPET错误。
   -  OpenHaltRestart.kext：解决重启或关机问题。
   -  OSXRestart.kext：解决重启问题。
   -  PlatformUUID.kext：解决UUID错误。
   -  Disabler.kext：屏蔽不能正常启动的补丁。
   -  IOAHCIBlockStorageInjector.kext：解决本地硬盘图标为橙色的补丁。

-  Video

   -  NVinject.kext

-  Audio

   -  IOAudioFamily.kext
   -  HDAEnabler.kext
   -  VoodooHDA.kext

-  Ethernet

   -  IONetworkingFamily.kext
   -  Intel82566MM.kext

-  WiFi

   -  :-( 我那无解的无线网卡，凑合用了个LegacyAppleAirPortBrcm4311.kext，不五国，也没效果

-  PS/2（鼠标、键盘、触摸板）

   -  ApplePS2Controller.kext（或者VoodoPS2Controller.kext）
   -  AppleACPIPS2Nub.kext

-  Battery

   -  VoodooBattery.kext

-  Bluetooth

   -  DellBluetoothHCI.kext

-  SD Reader

   -  VoodooSDHC.kext

-  PCMCIA

   -  IOPCIFamily.kext

-  Chip set

   -  AHCIPortInjector.kext：可以识别Intel芯片组的AHCI。

-  风扇

   -  IOACPIFamily.kext：解决部分笔记本风扇不正常问题，只支持32位。

-  还有几个已经不记得是干什么用的了

   -  AppleRTC.kext
   -  OSvKernDSPLib.kext

安装
----

动手安装之前还要注意几件事情。

首先是Snow
Lopard需要SATA硬盘支持，所以要确认BIOS中SATA模式设定为AHCI（默认可能是IRRT）。

BootThink的一些操作：

-  c：Leopard原版光盘启动；
-  Alt：进入startup manager，选取启动分区；
-  Shift：安全模式；
-  Ctrl+V（或-v）：Verbose模式；
-  Ctrl+S：单用户模式；
-  #g=WxHxDEPTH（如1440x900x32）：设置分辨率；
-  #g=~：取消分辨率设置；
-  -32：以32位模式启动。

我的E6400用64位总是有些驱动有问题，只好用32位了。在安装和启动Mac的时候，都要在BootThink里输入-x32，或者修改B:\\Darwin\\com.apple.Boot.plist，添加Kernel
Flags，值为arch=i386。我的此文件内容如下：

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>EthernetBuiltIn</key>
        <string>Yes</string>
        <key>Graphics Mode</key>
        <string>1440x900x32</string>
        <key>GraphicsEnabler</key>
        <string>y</string>
        <key>Instant Menu</key>
        <string>No</string>
        <key>Kernel</key>
        <string>mach_kernel</string>
        <key>Kernel Flags</key>
        <string>arch=i386</string>
        <key>Timeout</key>
        <string>3</string>
        <key>UHCIreset</key>
        <string>Yes</string>
        <key>device-properties</key>
        <string></string>
      </dict>
    </plist>

好了，重启电脑，进入BootThink引导，选择启动Mac安装盘分区。成功话可以看到苹果图标和风火轮，选择语言，然后就进入安装界面。这时候要对目标分区做格式化，点击菜单“实用工具->磁盘工具...”，在对话框中选择之前格式化成NTFS的空白分区，将选择模式“Mac
OS扩展（日志式）”，填写卷标，点击“抹掉”。成功之后关闭窗口，继续安装，接受软解许可协议，然后就是选择安装组件。有人建议不用选“打印机支持”，太占体积了。选好之后继续，选择刚才格式化好的目标分区，点击安装。

如果是用硬盘安装的话，不用等太久就装好了。装好之后会自动重启，不过由于安装过程中，Windows系统盘的活动分区属性被取消了，如果直接重启将无法进入Windows，可以利用重启前的一点时间处理一下。点击菜单“实用工具->终端”，用diskutil命令来设置活动分区。

.. code-block:: text
    :linenos: none

    # diskutil list
    ... blah blah ...（查看C:\在哪里，比如我的在/dev/disk0分区1）
    # fdisk -e /dev/disk0
    f 1
    w
    y
    quit

重启电脑，进入BootThink，这时候就可以看到安装好的Mac系统分区了，引导它启动即可（如果装的是32位，也没改com.apple.Boot.plist，就需要输入-x32以32位模式启动）。

运气不背的话就可以顺利进入Mac系统了，声音、图像、有线网络、触摸板等全都正常，唯一的遗憾是无线网卡不能使用（也不知道这半年来出了新的驱动没）。可以买个USB/PCMCIA无线网卡，也可以像我一样扯根网线。
