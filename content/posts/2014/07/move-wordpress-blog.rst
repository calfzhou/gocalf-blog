迁移 WordPress 博客
###################
:date: 2014-07-31 11:16
:modified: 2014-07-31 11:16
:author: Calf
:category: 建站
:tags: WordPress, Blog
:keywords: Hosting, WordPress, MySql, Blog, Backup
:slug: move-wordpress-blog
:lang: zh_cn
:summary: 记录一下前些日子迁移一个 WordPress 博客的过程。

之前一直害怕折腾 WordPress 搭出来的博客，主要是对 PHP 和 MySql 都不太熟悉，对相关的备份啊、迁移啊也不太熟悉。前段时间，不得不对一个 WordPress 博客做了迁移，从一台服务器挪到了另外一台上，还挺顺利的，记录一下。

.. more

准备好目标环境
==============

现在目标机器上装好相关的环境，PHP、MySQL 之类的，然后安装 WordPress。我已经把源机器上的 WordPress 升级到最新版本了，所以在目标机器上也装上最新版本就行了。

没试过在不同版本的 WordPress 之间做数据迁移，感觉如果没有特别的原因，还是尽量保持两边的版本一致吧。

当然需要给 WordPress 创建一个数据库（比如叫做 ``my_wordpress``）以及用户（比如 ``wp_user``）：

.. code-block:: text

    $ mysql -uroot -p
    mysql> CREATE DATABASE my_wordpress;
    mysql> GRANT ALL PRIVILEGES ON my_wordpress.* TO wp_user@localhost IDENTIFIED BY "use-your-real-password";
    mysql> FLUSH PRIVILEGES;
    mysql> EXIT

暂停博客
========

在对源博客数据打包前，先要暂停它的服务，避免不必要的数据错误或者遗失。我选择了 `最省事的方法`_，直接在博客根目录下创建一个名为 ``.maintenance`` 的文件，内容为：

.. code-block:: php

    <?php $upgrading = time(); ?>

这样再访问源博客的时候，页面会提示“正在执行例行维护，请一分钟后回来”。当然了，这里的“一分钟”是写死的，什么时候来看都是同样的提示。

原理是 WordPress 会检查根目录下是否存在名为 ``.maintenance`` 的文件，如果存在，则会检查当前时刻与该文件提供的 ``$upgrading`` 数值之间的差异，如果当前时刻减去 ``$upgrading`` 小于十分钟，则会显示正在维护，否则就正常访问。现在 ``$upgrading`` 的值永远跟当前时刻一致，计算出来的差值一直都是 0，所以会一致在维护状态中。

打包源博客数据
==============

WordPress 博客的文章、评论等数据都保存在数据库中，直接 dump 出来就可以做备份或者迁移。我就直接用 mysqldump 命令来导出现有的数据：

.. code-block:: bash

    mysqldump -uDB_USER_NAME -pDB_USER_PASSWORD DB_NAME | gzip > my-worpress.sql.gz

命令中大写的部分需要用自己的用户名、密码和数据库名替换。导出的文件用 gzip 压缩一下以便通过网络复制到目标机器。

附件、插件、主题等都保存在 wp-content 目录中，直接压缩打包：

.. code-block:: bash

    tar -zcf content.tar.gz wp-content

在目标机器恢复数据
==================

上面打包好的两个文件可以通过 scp、ftp 等工具传送到新的机器上，然后分别将数据恢复出来即可。

.. code-block:: bash

    gunzip < my-worpress.sql.gz | mysql -uwp_user -pYOUR_PASSWORD my_wordpress
    tar -zxf content.tar.gz
    cp -Rp wp-content/* PATH-TO-YOUR-WORDPRESS-wp-content-FOLDER

配置文件
========

如果源博客的 ``wp-config.php`` 里面做过一些特别的修改，把它们也写到新博客的配置文件里即可。

善后
====

最后把目标机器上的 web server 配置好，把域名解析切换过去就好了。

.. _最省事的方法: http://sivel.net/2009/06/wordpress-maintenance-mode-without-a-plugin/
