Title: 要不就先开始吧
Date: 2011-06-28 23:33
Author: Calf
Category: 建站
Tags: BlueHost, Domain, GoDaddy, Hosting, MediaWiki, WordPress
Slug: lets-start
Summary: GoCalf博客正式开张，顺带介绍一下建站的初始步骤。

像我这种很懒又很挑剔的人，最大的痛苦就是to-do list越来越长。然则我已经懒到这所谓的to-do list只是隐约显于心中，并非实际存在。

唯一的避免方法就是尽快行动起来，切不可一再拖拉。

GoCalf的blog和wiki就此开张吧。

今天就先记录一下建站的初始步骤：

<!--more-->

1.  在GoDaddy购买域名，在BlueHost购买空间，去GoDaddy里把域名的ip地址指向BlueHost空间。GoDaddy域名赠送的小空间留作他用。
2.  Default web root: `$HOME/public_html/`。
3.  在web root中`mkdir blog`、`mkdir wiki`。
4.  在cPanel中开通子域名blog、wiki，分别指向相应的目录。
5.  在GoDaddy中开通相同的子域名指向A地址。
6.  在cPanel中安装WordPress、MediaWiki至相应目录。
7.  在cPanel中添加redirect：
    -   blog.gocalf.com -> gocalf.com/blog
    -   wiki.gocalf.com -> gocalf.com/wiki
    -   gocalf.com -> www.gocalf.com
8.  为防止web root混乱：`mkdir <sitename>`，在.htaccess中添加重定向：
    -   www.gocalf.com/* -> www.gocalf.com/&lt;sitename&gt;/$1
9.  `mkdir ~/local`作为安装软件目录。
10. 安装SVN（略去若干字）。
    -   `mkdir ~/publics_html/svn`
    -   `svnserve -d -r ~/public_html/svn`
    -   不过现在外部无法访问此SVN，需要独立IP且开放端口
11. 全站禁止list directory，在.htaccess中添加：`Options -Indexes`，并禁止访问svn目录。
12. Setting Email：**Not Finished**.
13. 显示中文界面：**Not Started**.
