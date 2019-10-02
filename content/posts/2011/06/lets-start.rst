要不就先开始吧
##############
:date: 2011-06-28 23:33
:modified: 2011-08-03 20:04
:author: Calf
:category: 建站
:tags: Hosting, Blog
:keywords: BlueHost, GoDaddy, MediaWiki, WordPress, htaccess
:slug: lets-start
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/06/start.png
:summary: GoCalf 博客正式开张，顺带介绍一下建站的初始步骤。

像我这种很懒又很挑剔的人，最大的痛苦就是 to-do
list 越来越长。然则我已经懒到这所谓的 to-do
list 只是隐约显于心中，并非实际存在。

唯一的避免方法就是尽快行动起来，切不可一再拖拉。

GoCalf 的 blog 和 wiki 就此开张吧。

.. more

今天就先记录一下建站的初始步骤：

#. 在 GoDaddy 购买域名，在 BlueHost 购买空间，去 GoDaddy 里把域名的 ip 地址指向 BlueHost 空间。GoDaddy 域名赠送的小空间留作他用。
#. Default web root: ``$HOME/public_html/``。
#. 在 web root 中 ``mkdir blog``、``mkdir wiki``。
#. 在 cPanel 中开通子域名 blog、wiki，分别指向相应的目录。
#. 在 GoDaddy 中开通相同的子域名指向 A 地址。
#. 在 cPanel 中安装 WordPress、MediaWiki 至相应目录。
#. 在 cPanel 中添加 redirect：

   -  blog.gocalf.com -> gocalf.com/blog
   -  wiki.gocalf.com -> gocalf.com/wiki
   -  gocalf.com -> www.gocalf.com

#. 为防止 web root 混乱：``mkdir <sitename>``，在 ``.htaccess`` 中添加重定向：

   -  www.gocalf.com/\* -> www.gocalf.com/<sitename>/$1

#. ``mkdir ~/local`` 作为安装软件目录。
#. 安装 SVN（略去若干字）。

   -  ``mkdir ~/public_html/svn``
   -  ``svnserve -d -r ~/public_html/svn``
   -  不过现在外部无法访问此 SVN，需要独立 IP 且开放端口

#. 全站禁止 list directory，在 ``.htaccess`` 中添加：``Options -Indexes``，并禁止访问 svn 目录。
#. Setting Email：Not Finished.
#. 显示中文界面：Not Started.
