搭建自己的 SS 服务
##################
:date: 2019-10-06 10:28
:author: Calf
:category: 建站
:tags: Shadowsocks, Linode, VPS
:keywrods: Shadowsocks 服务
:slug: deploy-own-ss-server
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2019/10/shadowsocks.png
:summary: 本文介绍如何搭建自己的 Shadowsocks 服务。

.. contents::

前些日子网络环境特别恶劣，正常的资料查询都变得很艰难，正好最近几年一直有想法把之前在 BlueHost 置办的共享主机换成 VPS，就趁着这个时机弄了一下，在 VPS 上搭建了自己的 Shadowsocks 服务，满足日常科学上网的需求。

.. more

.. figure:: {static}/images/2019/10/shadowsocks.png
    :alt: Shadowsocks

选择 VPS 服务商
===============

`GoCalf 网站`_ 从 `刚开始建立`_ 的时候就一直使用 `BlueHost`_，整体来说服务还算稳定，虽然用的是共享主机，但后来开通了独立 IP，偶尔也能用 SSH 隧道来应急科学一下。不过总是感觉他家的控制后台太过复杂，cPanel 里面一堆东西。另外就是价格有点儿贵，现在用的共享主机每个月也要五美元多，而且要按年甚至几年进行预付费才能有一点点折扣。

近期很多人推荐用 `Vultr`_，最低配的 VPS 每个月五美元，新注册用户还送 50 美元的额度（限期两个月）。但是我去开了有几十台机器，没有一台的 IP 地址是能正常访问到的。

还是投奔 `Linode`_ 吧，试了两台机器就碰到了可用的 IP 地址（机房选在 Fremont, CA）。同样是五美元一个月，25 GB SSD 存储，1 核 CPU，1 GB 内存，1 TB 流量。跑 Shadowsocks 足够了，还可以再放个小站点。

安装 Shadowsocks 服务
=====================

接下来就安装 Shadowsocks 服务，直接用 `@秋水逸冰`_ 的 `Shadowsocks 一键安装脚本`_\ （服务器用的是 CentOS 7.x）。

.. NOTE::

    安装脚本需要用到 wget 命令，如果服务器上没有，需要先自行安装。

    .. code-block:: bash
        :linenos: none

        sudo yum install -y wget

.. code-block:: bash
    :linenos: none

    curl -O 'https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh'
    chmod +x shadowsocks-all.sh
    sudo ./shadowsocks-all.sh

安装过程中有一些选项 / 输入信息：

- 选择要安装的 Shadowsocks 版本（Which Shadowsocks server you'd select）：这里推荐选 ``4) Shadowsocks-libev``，这个是最轻量级的版本，而且持续更新中。
- 密码和端口号可任意填写。
- 选择加密方式（Which cipher you'd select）：这里推荐选择 ``7) aes-256-cfb``。
- 询问是否安装 `simple-obfs`_ 插件（Do you want install simple-obfs for Shadowsocks-libev?）：推荐安装（输入 ``y``），这个插件可以起到混淆的作用，防止 IP 和端口被嗅探到。
- 如果选择安装 simple-obfs 插件，就还会询问混淆方式（Which obfs you'd select）：推荐选择 ``2) tls``。

最后按任意键开始安装，安装完成后会自动启动服务。可以用以下命令检查服务状态：

.. code-block:: bash
    :linenos: none

    sudo /etc/init.d/shadowsocks-libev status

以后如果需要修改端口号、密码等配置，可以直接修改配置文件 ``/etc/shadowsocks-libev/config.json``，然后用下面的命令重启服务即可：

.. code-block:: bash
    :linenos: none

    sudo /etc/init.d/shadowsocks-libev restart

服务安装好了，这时候在客户端里把服务器的地址（可以绑定一个域名，以后换 IP 地址之后客户端就不用动了）、端口号、加密方式等信息都填进去。如果安装的时候装了 simple-obfs 插件，那么在客户端里配置服务器的时候，Plunin 的地方填写 ``simple-obfs``，Plugin Opts 填写 ``obfs=tfs``\ （不同的客户端可能会有差异）。

.. figure:: {static}/images/2019/10/ss-client-config.png
    :alt: ShadowsocksX-NG 服务器配置

    ShadowsocksX-NG 中服务器的配置

升级内核并开启 BBR 加速
=======================

`TCP BBR`_ 是 Google 2016 年发布的 `TCP 拥塞控制算法`_，可以显著提升连接和传输速度。该算法已经植入 Linux 4.9 及之后的内核版本中。可以考虑升级内核并开启 BBR。

.. WARNING::

    升级内核会有一定的风险，注意提前备份好重要数据。

直接使用 `@秋水逸冰`_ 的 `一键安装最新内核并开启 BBR 脚本`_ （`或这里`_）：

.. code-block:: bash
    :linenos: none

    curl -O 'https://github.com/teddysun/across/raw/master/bbr.sh'
    chmod +x bbr.sh
    sudo ./bbr.sh

安装完成的时候会提示输入 ``y`` 重启系统，等系统再次启动，重新登录，检查安装结果：

.. code-block:: bash
    :linenos: none

    $ uname -r
    5.3.2-1.el7.elrepo.x86_64
    $ lsmod | grep bbr
    tcp_bbr                20480  31

可以看到内核版本已经升级到 4.9 以上（我之前的是 ``3.10.0-957.el7.x86_64``），并且 ``tcp_bbr`` 模块也开启了。

.. _GoCalf 网站: https://blog.gocalf.com/
.. _刚开始建立: {filename}../../2011/06/lets-start.rst
.. _BlueHost: https://www.bluehost.com/
.. _Vultr: https://www.vultr.com/
.. _Linode: https://www.linode.com/
.. _@秋水逸冰: https://teddysun.com/
.. _Shadowsocks 一键安装脚本: https://github.com/teddysun/shadowsocks_install/tree/master
.. _simple-obfs: https://github.com/shadowsocks/simple-obfs
.. _BBR: https://teddysun.com/489.html
.. _TCP BBR: https://en.wikipedia.org/wiki/TCP_congestion_control#TCP_BBR
.. _TCP 拥塞控制算法: https://en.wikipedia.org/wiki/TCP_congestion_control
.. _一键安装最新内核并开启 BBR 脚本: https://teddysun.com/489.html
.. _或这里: https://github.com/teddysun/across
