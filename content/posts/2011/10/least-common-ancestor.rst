求二叉树中两结点的最小公共祖先
###############
:date: 2011-10-21 22:34
:author: Calf
:category: 算法
:tags: Least Common Ancestor, 二叉树, 微软面试, 数据结构, 最小公共父结点, 最小公共祖先, 算法题, 编程, 遍历二叉树, 面试题
:slug: least-common-ancestor

据说这是微软的一道面试题，谁知道呢。

问题描述：找出二叉树上任意两个指定结点的最近共同父结点（LCA，Least
Common Ancestor）。

这算不上是一道算法题了，主要还是看数据结构基本知识和编程能力。

首先考虑最简单的情况——二叉树结点数据结构中有父指针。

这是不是非常简单呢？只要分别从两个结点出发向上走到树根，得到两个结点的分支路径，求出这两条路径相互重合部分的最靠下的结点，就是所求的LCA。这只需要
O(h) 的时空代价（设h是树高，n是树结点数目，平均情况下h =
log(n)，最坏情况h = n）。

如果想再稍微节省一点儿时间和空间，可以先找出第一条分支路径，并用这些结点建立哈希表，然后从另外一个指定结点开始向上走到树根，每次遇到一个结点就到哈希表中查一下，一旦发现某个结点存在于哈希表中，这个结点就是所求的LCA。这个方法的代码示意如下：

::

    [ccen_python]def FindLCA(node1, node2):
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
      return None[/ccen_python]

这样确实很简单，但实际情况是，通常二叉树结点中并没有父结点指针，这时候就要遍历二叉树找到这两个结点，并找出它们的LCA。

实际上，在遍历二叉树的时候，很容易就能够记录下根结点到任何结点的分支路径，只要有了分支路径，就可以对比找出LCA。

我们采取前序遍历，即N-L-R的顺序，使用堆栈来避免递归并且记录完整的分支路径。那么，在二叉树中查找指定结点的算法可以这样写：

::

    [ccen_python]class Dir:
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

      return pathDict[/ccen_python]

其中Dir这个类相当于是一个枚举，用来定义当前的分支方向。FindNodes除了需要二叉树根结点外，还需要一个待查找的结点集合。这个函数可以在二叉树中找到所有（或第一个）待查找结点的分支路径，并返回一个字典（结点
--> 路径）。

可以看出，FindNodes函数按照前序顺序遍历整个二叉树，查找指定结点。每遇到一个结点，首先判断它是不是我们要找的，如果不是就沿着左边的分支下降到底，然后转入右侧分支。

有了FindNodes函数的支持，我们就可改写前面的FindLCA函数，即先遍历二叉树求出两个结点的分支路径，然后比较这两条路径找出LCA：

::

    [ccen_python]def FindLCA(root, node1, node2):
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

      return lca[/ccen_python]

遍历二叉树查找所有指定的结点需要 O(n) 时间，O(h)
额外空间；对比两条分支路径需要 O(h) 的时间，因此总的时间代价为
O(n)，空间代价为 O(h)。
