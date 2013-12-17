用Git和云存储保存隐私信息
#########################
:date: 2013-12-17 14:07
:modified: 2013-12-17 14:07
:author: Calf
:category: 有用知识
:tags: Git, Encrypt
:keywords: Git Encrypt, gitcrypt, Dropbox, GitHub, Cloud Storage, Privacy, Security
:slug: git-encrypt
:summary: 网络越来越发达，各式各样的网盘、云存储也走进日常生活，我也开始在Dropbox和GitHub中存储一些个人文件和代码。但如果涉及到隐私的信息非要放上去就必须要加密处理，今天我说一下如何用git来保存这些隐私信息。

网络越来越发达，各式各样的网盘、云存储也走进日常生活，我也开始在\ `Dropbox`_\ 和\ `GitHub`_\ 中存储一些个人文件和代码。隐私问题比较麻烦，会有一些特别隐私的信息（比如银行密码、心情日记等）是不适合直接存放在云端的。但又确实想要借助云平台的便利性，就必须要做加密处理。操作的方法很多，今天我说一下用Git来保存这些隐私信息。

.. more

等等，你说什么？还有115网盘、百度云盘、金山快盘等等国内知名云存储，空间又大、速度又快、功能又强。如果你这么觉得，那么再见，bye bye，さようなら。

我是不会用国内的云存储存放任何个人相关的东西的，最多放少量的网上下载的图书视频软件之类的。

好吧，言归正传，说咱们的加密。

当然你可以用虚拟加密磁盘（比如\ `TrueCrypt`_\ ）之类的工具，或者直接用设置了密码的压缩包（我之前就是这么干的），但是在用起来都还是有些麻烦。比如我那些打了加密压缩包的东西，我就懒得再去看了，尤其懒得修改，实在太麻烦了。

我选择用Git来保存个人文档的另一个原因是，可以方便地进行版本控制，尤其如果需要在不同的电脑上进行操作，又难以完全实时进行同步的话。而且今天介绍的这个方法可以透明地对指定文件进行加密和解密（transparent encryption），也就是你在本地操作的时候根本不需要每次阅读前都解密，做了修改之后还要再做加密处理。工具会保证最终存在云端的那份是妥善加密的。

找到了两个实现此功能的工具，分别是

-   git-crypt: https://www.agwa.name/projects/git-crypt/
-   git-encrypt: https://github.com/shadowhand/git-encrypt

分别是用C++和Shell写的。最后我选择了后者，当然以后也许会改变，反正加密解密算法跟工具是分离的，换工具并不会带来太多问题。

简单介绍一下如何使用，更准确的操作方式就直接去看项目的官方文档好了。

首先安装，我选择的git-encrypt是用Shell写的，所谓安装就是clone一下它的repo，建立一个符号链接使得通过$PATH可以找到它即可。当然，你的系统中必须安装了OpenSSL，它是加密解密的核心啊。

项目中有两个脚本文件，我只用其中的“gitcrypt”，另一个感觉不太好用。

假设云端存储用Dropbox，在本地对应的目录是\ ``~/dropbox``\ 。（以下操作都是针对Linux平台的，Windows的话可以去看一下官方文档）。先进入dropbox目录并创建一个新的git仓库（如果没有一个现成的）：

.. code-block:: shell

    cd ~/dropbox
    mkdir myrepo.git
    cd myrepo.git
    git init --bare

这个仓库将会被同步到云端，任何提交到该仓库的隐私信息都应该是被加密过的。当然千万不要把密钥也存在这里。

然后去工作目录，比如叫\ ``~/personal``\ ，创建一个本地仓库（或者从dropbox中clone一个过来）：

.. code-block:: shell

    cd ~/personal
    mkdir myrepo
    cd myrepo
    git init

然后就要做好加密解密的准备工作了，直接在本地仓库的根目录运行\ ``gitcrypt init``\ 命令，根据提示输入相应的信息。它首先会问你是否需要生成一个随机的salt值和密码，你可以同意或拒绝，拒绝的话就自己提供salt值和密码。如果你只有这个本地仓库，那建议直接使用随机生成的，那样足够复杂，更安全些。如果还需要在别的机器上clone这个仓库，那还是自己设置一下，免得忘了密码。然后选择加密算法，默认的是aes-256-ecb（ECB加密模式比较简单，相对容易破解，推荐使用aes-256-cbc；当然OpenSSL提供了很多加密算法，大家可以自行选择；另外，发现一篇很直观的文章，可以看看，\ `分组对称加密模式`_\ ）。接下来会问你是否使用\ ``.git/info/attribute``\ ，选择是就好了。最后问你需要对什么文件进行加密，默认是\ ``*``\ 表示所有文件。你可以根据需要进行设置，比如我这里让它加密所有以“private-”开头的文件，就输入\ ``private-*``\ 。

好了，完成了。接下来就正常地在仓库里提交各种文件，但只要文件名是以“private-”开头的，都会被加密后再被提交。

有一点要提一下，前面设置的salt值和密码，都是明文存储在\ ``.git/config``\ 中的，如果你的本地仓库也不那么安全的话，就牢记这两个信息，并在不需要的时候把仓库或者这个信息删掉，等到下次要用的时候再加上。

假设我创建两个文件，分别叫做\ ``diary.txt``\ 和\ ``private-diary.txt``\ 。其中后者是绝对不想让别人看到的。假设内容分别如下：

.. code-block:: text

    $ cat diary.txt
    今天天气不错，挺风和日丽的。
    我心情也还好，没有什么烦心事。
    $ cat private-diary.txt
    一点儿都不开心，那个人烦死了，老骚扰我。
    我想暴走啊，想暴走。

好，然后将这两个文件都提交到仓库中，并将修改推到云端：

.. code-block:: shell

    git add *.txt
    git commit -m 'Add some diaries.'
    git remote add origin ~/dropbox/myrepo.git
    git push origin master

有人会问，不对啊，还没给私密日记加密啊。好，我们来把云端仓库再clone一份看看。

.. code-block:: text

    $ git clone ~/dropbox/myrepo.git ~/personal/myrepo2
    $ cd ~/personal/myrepo2
    $ ls
    diary.txt  private-diary.txt
    $ cat diary.txt
    今天天气不错，挺风和日丽的。
    我心情也还好，没有什么烦心事。
    $ cat private-diary.txt
    U2FsdGVkX1/lfLd83fEEk8Gnaiixe5hdSPR7qgP+SFD9PSX6yNSX8osvd73gKqQG
    Q4ndGa6A0RAuClmMO1E5tRnxKhk2jIHmiR6qyGKjx73BR2164PHnf3NioZM0tN25
    88FtrD+Mqhq+b3MEsXLu2A==

可见，如果别人clone了你的云端仓库，他也只能看到加密后的信息。

如果这份clone的主人也是你，你现在想在这里查看或者修改你的文档，只要再运行一次\ ``gitcrypt init``\ ，输入同样的salt和密码，保持其它设置也都一致，最后再运行一次\ ``git reset --hard HEAD``\ 就好了。

.. code-block:: text

    $ gitcrypt init
    blah blah (use the exact same configuration)
    $ git reset --hard HEAD
    HEAD is now at 10c8613 Add some diaries.
    $ cat private-diary.txt
    一点儿都不开心，那个人烦死了，老骚扰我。
    我想暴走啊，想暴走。

关于salt和密码。解密的时候只要有密码就够了，加密的时候则需要同时提供salt和密码。用salt一方面可以在密码太简单的情况下加大破解难度（参见\ `Rainbow table`_\ ），另一方面使用相同的salt可以让每次加密得到的密文是一致的。如果你在第二次clone后改用不同的salt，并不会影响密文的解密，但是git会认为那些文件被修改了，而diff的时候去看不到任何差异。我觉得这个不太合理啊，期待这个工具的更新。

最后，一些关于transparent git encryption的讨论：

-   `GIT transparent encryption`_ or https://gist.github.com/shadowhand/873637
-   `Transparently encrypt repository contents with GPG`_

当然也有反对的声音，所以建议大家先多了解了解再决定要不要使用这个方法。

-   `Don't do this`_

.. _Dropbox: https://www.dropbox.com/
.. _GitHub: https://github.com/
.. _TrueCrypt: http://www.truecrypt.org/
.. _分组对称加密模式: http://blog.csdn.net/aaaaatiger/article/details/2525561
.. _Rainbow table: http://en.wikipedia.org/wiki/Rainbow_table
.. _GIT transparent encryption: http://syncom.appspot.com/papers/git_encryption.txt
.. _Transparently encrypt repository contents with GPG: http://git.661346.n2.nabble.com/Transparently-encrypt-repository-contents-with-GPG-td2470145.html
.. _Don't do this: http://article.gmane.org/gmane.comp.version-control.git/113221
