Title: 解决黑苹果Unable to Determine UUID错误
Date: 2012-03-02 23:09
Author: Calf
Category: 操作系统
Tags: genstrings, Hackintosh, Localizable.strings, Unable to Determine UUID, UUID, 黑苹果
Slug: hackintosh-fix-uuid
Summary: 前几天在写app的最后阶段要进行本地化（localization），其中要做的一件事就是创建语言文件（Localizable.strings）。要在控制台运行genstrings命令来扫描源代码中NSLocalizedString宏所使用到的文字。由于使用的是黑苹果，在运行genstrings时遇到了“Unable to Determine UUID”的错误，解决方法倒也容易。

前几天在写app的最后阶段要进行本地化（localization），其中要做的一件事就是创建语言文件（Localizable.strings）。要在控制台运行genstrings命令来扫描源代码中NSLocalizedString宏所使用到的文字。由于使用的是黑苹果（安装过程参见[这里]({filename}../../2011/07/dell-e6400-install-mac.md)和[这里]({filename}../../2011/08/dell-e6400-mac-10-6-8.md)），在运行genstrings时遇到了“Unable to Determine UUID”的错误，解决方法倒也容易。

<!--more-->

运行genstrings的语句是：

    genstrings ./Classes/*.m

得到了这样的错误信息：

    genstrings[3851:10b] _CFGetHostUUIDString: unable to determine UUID for host. Error: 35

虽然想不通这么个小程序为什么需要UUID，但解决方法是：进入目录/Library/Preferences/SystemConfiguration，用root权限修改其中的NetworkInterfaces.plist文件，在控制台的操作命令为：

```bash
cd /Library/Preferences/SystemConfiguration
sudo vi NetworkInterfaces.plist
```

给这个文件中添加一个IEEE80211相关的dict（原本会有其他一些dict，不用管它们），内容如下：

```xml
<dict>
  <key>BSD Name</key>
  <string>en3</string>
  <key>IOBuiltin</key>
  <false/>
  <key>IOInterfaceType</key>
  <integer>6</integer>
  <key>IOInterfaceUnit</key>
  <integer>3</integer>
  <key>IOLocation</key>
  <string></string>
  <key>IOMACAddress</key>
  <data>ABbPoF5V</data>
  <key>IOPathMatch</key>
  <string>IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/P0P3@1C,2/IOPCI2PCIBridge/pci14e4,4311@0/AirPort_Brcm43xx/IO80211Interface</string>
  <key>SCNetworkInterfaceType</key>
  <string>IEEE80211</string>
</dict>
```

添加好后保存此文件，然后重启系统。问题就解决了。
