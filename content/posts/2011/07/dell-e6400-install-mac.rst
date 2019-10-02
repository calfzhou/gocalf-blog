Dell E6400 安装 MacOS 雪豹 10.6
###############################
:date: 2011-07-24 18:08
:modified: 2012-03-02 21:46
:author: Calf
:category: 操作系统
:tags: Hackintosh
:keywords: BootThink, PC, Dell E6400, MacOS, 黑苹果, 雪豹, PC 装 Mac, Driver
:slug: dell-e6400-install-mac
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/07/mac_os_x.png
:summary: 半年前在 Dell Latitude E6400 上安装了 Mac OS X Snow Leopard 10.6（与 Windows 7 并存），除了 WiFi 之外都挺好的，折腾了好久才搞定，现在又有些记不清了，所以要赶紧留下印记，以免过几天就忘光了。

.. contents::

半年前在 Dell Latitude E6400 上安装了 Mac OS X Snow Leopard 10.6（与 Windows
7 并存），除了 WiFi 之外都挺好的，折腾了好久才搞定，现在又有些记不清了，所以要赶紧留下印记，以免过几天就忘光了。

不知道为什么，这次装 10.6 非常的费劲，尝试了好几个不同的版本（包括原版、iAntares、精简版等等），尝试了光盘安装、硬盘安装，尝试了 BootThink 引导、变色龙引导，用了一周多的时间才搞成功。相比之下，之前装 10.5.5～10.5.7 都非常容易呢。

在 PC 上装 Mac 的教程满天飞，这里不打算详细讲述，就以跟 Dell
E6400 有关的部分和遇到的一些问题为主吧，这款机器似乎是最难装 Mac 的机器之一。

.. more

Dell Latitude E6400 硬件配置
----------------------------

为 PC 装 Mac 系统最头疼的当然是硬件驱动了，所以在安装前要先搞清楚机器的硬件情况。

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
   -  WiFi: Intel WiFi Link 5300 AGN（最让人头疼的硬件，驱动无解）

工具和准备工作
--------------

下载了 Mac OS X
10.6 原版光盘镜像（尝试了很多其他处理好的镜像，全都无法正常安装，最后还是选择用原版），我用的是 snowleopard\_10a432\_userdvd.dmg（网上到处都能下载，我就不发链接了），6.13G。这么大就不刻盘了，用光盘装还慢呢。

用硬盘安装的话，一般要给磁盘上新建两个分区，一个放安装盘镜像，一个装 Mac。前者 6.3G 左右（不要格式化），后者视个人需要，一般至少 20G（NTFS 格式）。我用的 BootThink 引导似乎要求被引导的系统（包括安装镜像和已经装好的系统）在主分区上，但我的硬盘上没有那么多主分区可以用了（一块硬盘最多可以有四个主分区，我已经有了三个，分别是 Win
7 保留分区，Win
7 系统分区，数据分区），因此就把最后一个主分区名额留给了 Mac 系统，而把安装盘镜像放到了移动硬盘上。同样注意放安装盘镜像的分区不要格式化。

接下来安装 HFS-Explorer（v0.21），运行，按 Ctrl+O（菜单 File->Load file
system from
file...），选择下载的安装盘镜像，在弹出的对话框里选择 Apple\_HFS 那项。加载之后点击菜单 Tool->Create
disk image...，将生成的文件（.dmg）保存在某个 NTFS 分区上即可。

.. figure:: {static}/images/2011/07/hfs_explorer_hfs.png
    :alt: hfs_explorer_hfs

    HFS-Explorer 选择 Partition

.. figure:: {static}/images/2011/07/hfs_explorer_view.png
    :alt: hfs_explorer_view

    在 HFS-Explorer 中查看安装盘镜像

使用 HFS-Explorer 把下载的安装盘镜像处理一下生成另外一个镜像，主要有三个作用：

-  有些镜像格式无法被后面用到的安装助手识别，这个工具可以做一次格式转换；
-  去掉原镜像的写保护，以便稍后替换 OSInstall（也可以直接下载一个别人替换过的镜像，那就不用装这个工具了，也可以跳过后面的 MacDriver）；
-  可以对原镜像文件做检验。

接下来就要祭出 Leopard 硬盘安装助手（v0.3）了。它不需要安装，但在 Win
7 系统中必须以管理员身份运行（右键点击，选择 Run as
administrator）。载入刚才用 HFS-Explorer 生成的镜像文件，选择之前分好的 6.3G 左右未格式化的分区，并去掉三个复选框的勾（在 boot.ini 中加入 tboot；强制加入引导及启动代码；PC\_EFI
V8）。点击“开始！”按钮，然后耐心等待。当进度条走满，日志中出现“Change
partition type to AF: Success”、“All done, have fun!”时就算成功了。

.. figure:: {static}/images/2011/07/lepoard-inshelper.png
    :alt: lepoard-inshelper

    Leopard 硬盘安装助手

.. compound::

    接下来要替换 OSInstall，这需要安装工具 MacDriver（v8.0.4.10），这是个收费软件。装好之后重启系统，就可以进入刚才用硬盘安装助手写入的 HFS 安装分区了。让 Windows 显示隐藏文件和系统文件，下载一个 PC 用的 OSInstall，替换掉

    .. code-block:: text
        :linenos: none

        X:\System\Library\PrivateFrameworks\Install.framework\Frameworks\OSInstall.framework\Versions\A\

    里面的同名文件。这样做的目的是使得 Mac 可以安装在 MBR 分区表下（否则 Mac 只能装在 GPT（GUID）分区表下，但 Windows 默认都是用 MBR）。（还是直接下载一个已经替换好了的镜像吧，省的麻烦。）

最后还要装引导程序。以前我用的是变色龙引导程序，但这次总是出错，就改用 BootThink 了。觉得这个比变色龙还要好些吧。不过如果原有系统是 Win
7 的话，还稍微有一点儿麻烦，就是 Win
7 那个令人恶心的保留分区。虽然我们一般都把 Win
7 装在 C 盘，但在安装过程中，它会在 C 盘前面保留一个 100MB 左右的 NTFS 分区（卷标一般就叫 System
Reserved），而这个分区默认是不显示出来的（没有分配盘符）。如果把 BootThink 装在 C 盘，那有可能会无法进行引导。所以要把它装在那个保留分区里（幸好它体积不是很大）。在磁盘管理中找到那个保留分区，给它指定一个盘符（我习惯用 B），然后把 BootThink 装在这个分区中。（有人说把 C 盘标记为活动分区就可以启动 BootThink，但我没有成功。）安装之后在目标分区的根目录应该有一个文件夹 Darwin 和两个文件 btldr（系统文件）、btldr.mbr。

准备驱动程序
------------

网上那些破解过的 Mac 安装镜像里面通常都包含了各种驱动程序，在安装的时候选择需要的就可以了，但不知道为什么我这次怎么都装不成功，所以才用了原版的镜像。但原版镜像里没有 PC 的驱动程序，这就要借助 BootThink 了。用 BootThink 引导刚才制作的替换了 OSInstall 的硬盘安装分区，它就可以从 ``C:\Darwin\System\LibrarySL\Extensions\`` （我的是 ``B:\``）里面加载放在那里的驱动程序和补丁（不同版本的 Mac
OS 对应的目录也不太一样，这里就不多说了）。

驱动的选择至关重要啊，选择的不好，轻则某个硬件不工作，重则四国、五国、风火轮（在系统加载时出现用四国或者五国文字写的提示信息，或者风火轮图标一直转却无法进入系统）。这里列出我选择的驱动和补丁。

-  系统补丁

   -  fakesmc.kext：模拟苹果机的 SMC，必须的！
   -  NullCPUPowerManagement.kext：禁用电源管理，解决 IntelCPUPowerManagement.kext 的 HPET 错误。
   -  OpenHaltRestart.kext：解决重启或关机问题。
   -  OSXRestart.kext：解决重启问题。
   -  PlatformUUID.kext：解决 UUID 错误。
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

   -  :-( 我那无解的无线网卡，凑合用了个 LegacyAppleAirPortBrcm4311.kext，不五国，也没效果

-  PS/2（鼠标、键盘、触摸板）

   -  ApplePS2Controller.kext（或者 VoodoPS2Controller.kext）
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

   -  AHCIPortInjector.kext：可以识别 Intel 芯片组的 AHCI。

-  风扇

   -  IOACPIFamily.kext：解决部分笔记本风扇不正常问题，只支持 32 位。

-  还有几个已经不记得是干什么用的了

   -  AppleRTC.kext
   -  OSvKernDSPLib.kext

安装
----

动手安装之前还要注意几件事情。

首先是 Snow
Lopard 需要 SATA 硬盘支持，所以要确认 BIOS 中 SATA 模式设定为 AHCI（默认可能是 IRRT）。

BootThink 的一些操作：

-  c：Leopard 原版光盘启动；
-  Alt：进入 startup manager，选取启动分区；
-  Shift：安全模式；
-  Ctrl+V（或 -v）：Verbose 模式；
-  Ctrl+S：单用户模式；
-  #g=WxHxDEPTH（如 1440x900x32）：设置分辨率；
-  #g=~：取消分辨率设置；
-  -32：以 32 位模式启动。

我的 E6400 用 64 位总是有些驱动有问题，只好用 32 位了。在安装和启动 Mac 的时候，都要在 BootThink 里输入 ``-x32``，或者修改 ``B:\Darwin\com.apple.Boot.plist``，添加 Kernel
Flags，值为 ``arch=i386``。我的此文件内容如下：

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

好了，重启电脑，进入 BootThink 引导，选择启动 Mac 安装盘分区。成功话可以看到苹果图标和风火轮，选择语言，然后就进入安装界面。这时候要对目标分区做格式化，点击菜单“实用工具 -> 磁盘工具...”，在对话框中选择之前格式化成 NTFS 的空白分区，将选择模式“Mac
OS 扩展（日志式）”，填写卷标，点击“抹掉”。成功之后关闭窗口，继续安装，接受软解许可协议，然后就是选择安装组件。有人建议不用选“打印机支持”，太占体积了。选好之后继续，选择刚才格式化好的目标分区，点击安装。

如果是用硬盘安装的话，不用等太久就装好了。装好之后会自动重启，不过由于安装过程中，Windows 系统盘的活动分区属性被取消了，如果直接重启将无法进入 Windows，可以利用重启前的一点时间处理一下。点击菜单“实用工具 -> 终端”，用 diskutil 命令来设置活动分区。

.. code-block:: text
    :linenos: none

    # diskutil list
    ... blah blah ...（查看 C:\ 在哪里，比如我的在 /dev/disk0 分区 1）
    # fdisk -e /dev/disk0
    f 1
    w
    y
    quit

重启电脑，进入 BootThink，这时候就可以看到安装好的 Mac 系统分区了，引导它启动即可（如果装的是 32 位，也没改 ``com.apple.Boot.plist``，就需要输入 ``-x32`` 以 32 位模式启动）。

运气不背的话就可以顺利进入 Mac 系统了，声音、图像、有线网络、触摸板等全都正常，唯一的遗憾是无线网卡不能使用（也不知道这半年来出了新的驱动没）。可以买个 USB/PCMCIA 无线网卡，也可以像我一样扯根网线。
