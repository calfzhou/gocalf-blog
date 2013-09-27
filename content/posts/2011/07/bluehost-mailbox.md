Title: 解决BlueHost邮箱无法接收邮件的问题
Date: 2011-07-31 22:04
Author: Calf
Category: 建站
Tags: A记录, BlueHost, email, GoDaddy, Hosting, Mail Exchanger, MX, 建站
Slug: bluehost-mailbox

在之前的[一篇文章][]中提到[GoCalf][]网站的Email部分还没弄好，当时遇到的问题是可以发出邮件，却无法接收邮件。问题根源在于DNS没有设置好（空间跟域名来自不同的提供商），今天花了一点儿时间把这个问题解决了。<!--more-->

我的域名是[GoDaddy][]提供的，而服务器空间则在[BlueHost][]上，域名解析（DNS）是在GoDaddy上进行的。之前已经将二级域名mail的A记录指向GoCalf空间的IP地址了，可以登录邮箱，能发出邮件，但怎么都收不到信。在Gmail（或别的邮件服务器）中给BlueHost上的邮件帐户发邮件，会收到无法送达的失败提示：

> Delivery to the following recipient failed permanently:\
> \
>      xxx@xxxxxxxx.com\
> \
>  Technical details of permanent failure:\
> \
>  Google tried to deliver your message, but it was rejected by the
> recipient domain. We recommend contacting the other email provider for
> further information about the cause of this error. The error that the
> other server returned was: 550 550 \#5.1.0 Address rejected
> xxx@xxxxxxxx.com (state 14).

看起来应该是DNS的问题（跨服务商就是这点比较麻烦啊）。仔细察看了GoDaddy上DNS
Manager里面的内容，发现Mail
Exchanger（MX）的配置内容有问题，并没有指向GoCalf的空间地址，因此将MX记录改为指向mail.gocalf.com。改动大概需要一个小时才能生效，生效之后再次发送邮件就可以在BlueHost里收到了。

附GoDaddy里面DNS设置截图：

[caption id="attachment\_858" align="alignnone" width="510"
caption="将二级域名mail指向@地址；MX记录指向mail.\<yourdomain\>.com"]![GoDaddy中DNS设置][][/caption]

  [一篇文章]: http://www.gocalf.com/blog/lets-start.html
    "GoCalf 建站的初始步骤"
  [GoCalf]: http://www.gocalf.com/ "GoCalf"
  [GoDaddy]: http://www.godaddy.com "GoDaddy"
  [BlueHost]: http://www.bluehost.com/ "BlueHost"
  [GoDaddy中DNS设置]: http://www.gocalf.com/blog/wp-content/uploads/2011/07/godaddy_dns.png
    "godaddy_dns"
