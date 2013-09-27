Title: 彻底禁止游客访问Discuz! 7.0搭建的论坛
Date: 2011-08-15 21:17
Author: Calf
Category: 建站
Tags: Anonymous, Discuz!, PHP, 匿名访问, 权限控制, 游客, 论坛
Slug: discuz-no-anonymous
Summary: 以前搭建了一个供内部交流用的 Discuz! 论坛，不希望没有账号的人（包括搜索引擎）看到论坛内的任何信息（包括首页等等）。在管理员设置里找了半天，发现可以“禁止IP”、“禁止用户访问”，甚至可以让“版主”、“超级版主”等用户组访问无法访问任何页面，却偏偏没有对游客的限制。对于大多数开放的论坛并无所谓，但对于我们这种特殊的论坛，就只好自己修改代码了。来看看是如何修改的。

以前搭建了一个供内部交流用的 Discuz!
论坛，不希望没有账号的人（包括搜索引擎）看到论坛内的任何信息（包括首页等等）。在管理员设置里找了半天，发现可以“禁止IP”、“禁止用户访问”，甚至可以让“版主”、“超级版主”等用户组访问无法访问任何页面，却偏偏没有对游客的限制。对于大多数开放的论坛并无所谓，但对于我们这种特殊的论坛，就只好自己修改代码了。来看看是如何修改的。

<!--more-->

此次修改针对的是 Discuz!
7.0，其他版本可能也大同小异吧。只要改一点点就好了。

文件/include/common.func.php中的代码几乎在访问论坛任何页面时都会被执行，它包含了很多对用户权限的控制，只要在恰当的位置添加对游客的访问限制即可。

要关注的代码段落是365行至378行：

    [ccen_php first_line="365"]if((!empty($_DCACHE['advs']) || $globaladvs) && !defined('IN_ADMINCP')) {
      require_once DISCUZ_ROOT.'./include/advertisements.inc.php';
    }

    if(isset($allowvisit) && $allowvisit == 0 && !(CURSCRIPT == 'member' && ($action == 'groupexpiry' || $action == 'activate'))) {
      showmessage('user_banned', NULL, 'HALTED');
    } elseif(!(in_array(CURSCRIPT, array('logging', 'wap', 'seccode', 'ajax')) || $adminid == 1)) {
      if($bbclosed) {
        clearcookies();
        $closedreason = $db->result_first("SELECT value FROM {$tablepre}settings WHERE variable='closedreason'");
        showmessage($closedreason ? $closedreason : 'board_closed', NULL, 'NOPERM');
      }
      periodscheck('visitbanperiods');
    }[/ccen_php]

从369行开始的那段代码是对被禁止的用户组或者账户进行屏蔽，以及处理论坛暂时关闭的情况，就在它前面加上对游客的限制即可。判断是游客还是已登录用户的方法就是看有没有uid信息，游客是没有uid的。另外，虽然游客不能访问论坛的任何页面，但总要让他能够注册或者登录，所以要把相关页面的权限放开。除了371行所列的那几项之外，还需要开放register，除非论坛注册也不对外开放。

修改的内容如下，只是多加了一个判断而已：

    [cce_diff]368a369,374
    > /* Forbid tourists visiting the bbs. Add by calf, Apr 15, 2009 */
    > if(!$discuz_uid && !(defined('CURSCRIPT') && in_array(CURSCRIPT, array('logging', 'wap', 'seccode', 'ajax', 'register')))) {
    >   showmessage('not_loggedin', NULL, 'NOPERM');
    > }
    > /* End of Add */
    >[/cce_diff]

这样修改后，未登录状态下访问论坛会得到类似于“您无权进行当前操作，这可能因以下原因之一造成：对不起，您还没有登录，无法进行此操作。”的提示信息，并直接跳转到登录界面。
