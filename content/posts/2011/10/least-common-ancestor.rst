求二叉树中两结点的最小公共祖先
##############################
:date: 2011-10-21 22:34
:modified: 2012-04-05 23:31
:author: Calf
:category: 算法
:tags: Interview Question, Data Structure, Binary Tree
:keywords: Least Common Ancestor, 二叉树, 微软面试, 最小公共祖先, 算法题, 面试题
:slug: least-common-ancestor
:featured_image: http://www.gocalf.com/blog/images/2011/10/bin_tree.png
:summary: 据说这是微软的一道面试题，谁知道呢。问题描述：找出二叉树上任意两个指定结点的最近共同父结点（LCA，Least Common Ancestor）。

.. contents::

据说这是微软的一道面试题，谁知道呢。

问题描述：找出二叉树上任意两个指定结点的最近共同父结点（LCA，Least
Common Ancestor）。

.. more

这算不上是一道算法题了，主要还是看数据结构基本知识和编程能力。

有父指针，方法一
================

首先考虑最简单的情况——二叉树结点数据结构中有父指针。

这是不是非常简单呢？只要分别从两个结点出发向上走到树根，得到两个结点的分支路径，求出这两条路径相互重合部分的最靠下的结点，就是所求的LCA。这只需要O(h)的时空代价（设h是树高，n是树结点数目，平均情况下h =
log(n)，最坏情况h = n）。

如果想再稍微节省一点儿时间和空间，可以先找出第一条分支路径，并用这些结点建立哈希表，然后从另外一个指定结点开始向上走到树根，每次遇到一个结点就到哈希表中查一下，一旦发现某个结点存在于哈希表中，这个结点就是所求的LCA。这个方法的代码示意如下：

.. code-block:: python

    def FindLCA(node1, node2):
      # Special cases.
      if not node1 or not node2:
        return None
      if node1 is node2:
        return node1

      # Get the first branch path.
      ancestors1 = set()
      while node1:
        ancestors1.add(node1)
        node1 = node1.parent

      # Check if any ancestor of node2 is in the first branch path.
      while node2:
        if node2 in ancestors1:
          return node2    # Got it, the LCA.
        node2 = node2.parent

      # These two nodes have no common ancestor.
      return None

时间和空间复杂度都是O(h)。

有父指针，方法二（2012-04-02 22:10添加）
========================================

上面的方法需要至少一个跟深度相当的缓存，在空间上还是有一些浪费的。可以使用更节省空间的方法，就是先计算出两个结点各自的深度，如果深度不同，则将较靠下的一个结点拉上去，直到两个结点在同一深度处。然后同步向根结点前进，首次相遇时则为最小公共祖先。示意代码（python 2.7）如下：

.. code-block:: python

    def FindLCA(node1, node2):
      # Special cases.
      if not node1 or not node2:
        return None
      if node1 is node2:
        return node1

      # Gets each node's depth.
      depth = lambda node: depth(node.parent) + 1 if node else 0
      depth1 = depth(node1)
      depth2 = depth(node2)

      # Pulls up the lower node and makes the two nodes in the same depth.
      mindepth = min(depth1, depth2)
      for i in xrange(depth1 - mindepth): node1 = node1.parent
      for i in xrange(depth2 - mindepth): node2 = node2.parent

      # Finds the common ancestor.
      while node1 and node2:
        if node1 is node2: return node1
        node1 = node1.parent
        node2 = node2.parent

      return None

这样时间复杂度是O(h)，空间复杂度是O(1)。

没有父指针，方法一
==================

通常二叉树结点中并没有父结点指针，这时候就要遍历二叉树找到这两个结点，并找出它们的LCA。

在遍历二叉树的时候，很容易就能够记录下根结点到任何结点的分支路径，只要有了分支路径，就可以对比找出LCA。

我们采取前序遍历，即N-L-R的顺序，使用堆栈来避免递归并且记录完整的分支路径。那么，在二叉树中查找指定结点的算法可以这样写：

.. code-block:: python

    class Dir:
      (Undef, Left, Right) = range(3)

    def FindNodes(root, nodeSet, findAll=True):
      if not root or not nodeSet:
        return None

      pathDict = {}
      path = []
      curr = root
      while curr or path:
        while curr:   # Go down along left branch
          path.append((curr, Dir.Left))
          if curr in nodeSet:
            pathDict[curr] = list(path)
            nodeSet.remove(curr)
            if not nodeSet or not findAll:
              return pathDict
          curr = curr.left
        (curr, dir) = path.pop()
        while dir == Dir.Right:   # Back from right branch
          if not path: return pathDict
          (curr, dir) = path.pop()
        path.append((curr, Dir.Right))  # Trun to right from left
        curr = curr.right

      return pathDict

其中Dir这个类相当于是一个枚举，用来定义当前的分支方向。FindNodes除了需要二叉树根结点外，还需要一个待查找的结点集合。这个函数可以在二叉树中找到所有（或第一个）待查找结点的分支路径，并返回一个字典（结点
--> 路径）。

可以看出，FindNodes函数按照前序顺序遍历整个二叉树，查找指定结点。每遇到一个结点，首先判断它是不是我们要找的，如果不是就沿着左边的分支下降到底，然后转入右侧分支。

有了FindNodes函数的支持，我们就可改写前面的FindLCA函数，即先遍历二叉树求出两个结点的分支路径，然后比较这两条路径找出LCA：

.. code-block:: python

    def FindLCA(root, node1, node2):
      # Special cases.
      if not root or not node1 or not node2:
        return None
      if node1 is node2:
        return node1

      # Try to find the two nodes in the tree, and get their branch paths.
      nodeSet = set([node1, node2])
      pathDict = FindNodes(root, nodeSet)
      if nodeSet:
        return None

      path1 = [i[0] for i in pathDict[node1]]
      path2 = [i[0] for i in pathDict[node2]]

      # Compare the two paths, find out the LCA.
      lca = None
      minLen = min(len(path1), len(path2))
      for i in xrange(minLen):
        if path1[i] is not path2[i]:
          break
        lca = path1[i]

      return lca

遍历二叉树查找所有指定的结点需要O(n)时间，O(h)额外空间；对比两条分支路径需要O(h)的时间，因此总的时间代价为O(n)，空间代价为O(h)。

没有父结点，方法二（2012-04-05 23:31更新）
==========================================

上面的代码有点儿太啰嗦了，如果不想缓存整条分支路径，或者只是想让代码更简洁一些，也很容易做到，只需要在遍历查找的时候做点儿小小的改动。关于遍历二叉树可以参考后面的一篇文章：\ `程序基本功之遍历二叉树`_\ 。这里我将在非递归的前序（N-L-R）遍历基础上修改得到求LCA的程序。

为什么用前序遍历？

首先考察一下LCA的特性，只有两种可能：

#.  LCA就是其中的一个结点，而另一个结点是它的子孙；
#.  两个结点分别位于LCA的左子树和右子树中。

对于第一种可能，前序遍历时首先找到的结点就是LCA，剩下的事情就是确定第二个结点在它下面。中序和后序也都可以做，但没有这么美妙。

对于第二种可能，假设在前序遍历过程中，首先找到了一个结点（比如下面的H），根据非递归前序遍历的算法特性，这时候栈里一定是依次存储了结点A（根节点）、B、D、G（请自行思考为什么没有C、E、F），再结合LCA的特性，很容易发现，LCA要么是H自身（对应于上面第一种情况），要么就只能是A、B、D或G。剩下的事情就太美妙，继续遍历二叉树，直到找到另外一个结点。这时候看看A、B、D、G和H中还有谁在栈里，最靠下的那个就是LCA。怎么判定谁在栈里？怎么判定最靠下？用辅助变量呗。

.. code-block:: text
    :linenos: none

        A
       /
      B
     /
    C
     \
      D
     /
    E
     \
      F
       \
        G
       /
      H

示意程序代码：

.. code-block:: python

    def FindLCA(root, node1, node2):
      nodeset = set([node1, node2])   # Also supports 3 or more nodes.
      s = []          # A stack to help performing N-L-R traversing.
      lca = None      # Records the most possible least common ancestor.
      mindepth = -1   # The depth of lca.
      while root or s:
        if root:
          if root in nodeset:
            nodeset.remove(root)
            if mindepth < 0:
              # Yeah, found the first node. The lca must be itself or already in s.
              lca = root
              mindepth = len(s)
            if not nodeset:
              break
          s.append(root)
          root = root.left
        else:
          root = s.pop()
          if mindepth > len(s):
            lca = root
            mindepth = len(s)
          root = root.right
      return None if nodeset else lca

可以跟\ `程序基本功之遍历二叉树`_\ 中的\ **非递归前序遍历**\ 的程序对比一下，会发现改动之处是非常小的。

这段程序时间复杂度都是O(n)，空间复杂度是O(h)，这些都是遍历二叉树所需的时间和空间消耗。在遍历之外，就只剩下常数量的时空开销了。

.. _程序基本功之遍历二叉树: {filename}../../2012/04/traversing-binary-tree.rst
