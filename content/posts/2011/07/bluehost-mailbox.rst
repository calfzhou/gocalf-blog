解决 BlueHost 邮箱无法接收邮件的问题
####################################
:date: 2011-07-31 22:04
:modified: 2011-08-03 22:33
:author: Calf
:category: 建站
:tags: BlueHost, Mail Exchanger
:keywords: Hosting, BlueHost Email, DNS Manager, MX, A 记录, @地址
:slug: bluehost-mailbox
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/07/webmail.png
:summary: 在之前的一篇文章中提到 GoCalf 网站的 Email 部分还没弄好，当时遇到的问题是可以发出邮件，却无法接收邮件。问题根源在于 DNS 没有设置好（空间跟域名来自不同的提供商），今天花了一点儿时间把这个问题解决了。

在之前的 `一篇文章`_ 中提到 `GoCalf`_ 网站的 Email 部分还没弄好，当时遇到的问题是可以发出邮件，却无法接收邮件。问题根源在于 DNS 没有设置好（空间跟域名来自不同的提供商），今天花了一点儿时间把这个问题解决了。

.. more

我的域名是 `GoDaddy`_ 提供的，而服务器空间则在 `BlueHost`_ 上，域名解析（DNS）是在 GoDaddy 上进行的。之前已经将二级域名 mail 的 A 记录指向 GoCalf 空间的 IP 地址了，可以登录邮箱，能发出邮件，但怎么都收不到信。在 Gmail（或别的邮件服务器）中给 BlueHost 上的邮件帐户发邮件，会收到无法送达的失败提示：

    | Delivery to the following recipient failed permanently:
    |      xxx@xxxxxxxx.com
    |  Technical details of permanent failure:
    |  Google tried to deliver your message, but it was rejected by the
       recipient domain. We recommend contacting the other email provider
       for further information about the cause of this error. The error
       that the other server returned was: 550 550 #5.1.0 Address rejected
       xxx@xxxxxxxx.com (state 14).

看起来应该是 DNS 的问题（跨服务商就是这点比较麻烦啊）。仔细察看了 GoDaddy 上 DNS
Manager 里面的内容，发现 Mail
Exchanger（MX）的配置内容有问题，并没有指向 GoCalf 的空间地址，因此将 MX 记录改为指向 mail.gocalf.com。改动大概需要一个小时才能生效，生效之后再次发送邮件就可以在 BlueHost 里收到了。

附 GoDaddy 里面 DNS 设置截图：

.. figure:: {static}/images/2011/07/godaddy_dns.png
    :alt: GoDaddy 中 DNS 设置

    将二级域名 mail 指向 @ 地址；MX 记录指向 mail.<yourdomain>.com

.. _一篇文章: {filename}../06/lets-start.rst
.. _GoCalf: http://www.gocalf.com/
.. _GoDaddy: http://www.godaddy.com
.. _BlueHost: http://www.bluehost.com/
