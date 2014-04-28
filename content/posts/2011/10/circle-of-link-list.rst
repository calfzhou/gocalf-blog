检测单向链表是否存在环
######################
:date: 2011-10-14 12:56
:modified: 2011-10-14 12:56
:author: Calf
:category: 算法
:tags: Interview Question, Data Structure, Linked List
:keywords: 双指针, 环检测, 算法题, 链表, 面试题
:slug: circle-of-link-list
:featured_image: http://www.gocalf.com/blog/images/2011/10/link_circle.png
:summary: 问题描述：在单向链表中，每个结点都包含一个指向下一个结点的指针，最后一个结点的这个指针被设置为空。但如果把最后一个结点的指针指向链表中存在的某个结点，就会形成一个环，在顺序遍历链表的时候，程序就会陷入死循环。我们的问题就是，如何检测一个链表中是否有环，如果检测到环，如何确定环的入口点（即求出环长，环前面的链长）。

问题描述：在单向链表中，每个结点都包含一个指向下一个结点的指针，最后一个结点的这个指针被设置为空。但如果把最后一个结点的指针指向链表中存在的某个结点，就会形成一个环，在顺序遍历链表的时候，程序就会陷入死循环。我们的问题就是，如何检测一个链表中是否有环，如果检测到环，如何确定环的入口点（即求出环长，环前面的链长）。

.. more

一种比较耗空间的做法是，从头开始遍历链表，把每次访问到的结点（或其地址）存入一个集合（hashset）或字典（dictionary），如果发现某个结点已经被访问过了，就表示这个链表存在环，并且这个结点就是环的入口点。这需要O(N)空间和O(N)时间，其中N是链表中结点的数目。

如果要求只是用O(1)空间、O(N)时间，应该怎么处理呢？

其实很简单，想象一下在跑道上跑步：两个速度不同的人在操场跑道上一圈一圈地跑，他们总会有相遇的时候。因此我们只需要准备两个指针，同时从链表头出发，一个每次往前走一步，另一个每次往前走两步。如果链表没有环，那么经过一段时间，第二个（速度较快的）指针就会到达终点；但如果链表中有环，两个指针就会在环里转圈，并会在某个时刻相遇。

大家也许会问，这两个指针要在环里转多少圈才能相遇呢？会不会转几千几万圈都无法相遇？实际上，第一个（速度慢的）指针在环里转满一圈之前，两个指针必然相遇。不妨设环长为L，第一个指针P1第一次进入环时，第二个指针P2在P1前方第a个结点处（0
< a < L），设经过x次移动后两个指针相遇，那么应该有0 + x = a + 2x (mod
L)，显然x = L - a。下面这张图可以清晰地表明这种关系，经过x =
L - a次移动，P1向前移动了L - a个位置（相当于后退了a），到达P1′处，而P2向前移动了2L - 2a个位置（相当于后退了2a），到达P2′处，显然P1′和P2′是同一点。

.. figure:: {filename}/images/2011/10/two_pointers_in_ring.svg
    :alt: two_pointers_in_ring
    :width: 428

    慢指针（P1）转一周之内，必然与快指针（P2）相遇

在知道链表内有环后，求环长是一件非常简单的事情，只要从刚才那个相遇点开始，固定P2，继续移动P1，直到P1与P2再次相遇，所经过的步数就是环长。

怎么求环前面那段子链的长度呢？很简单，让P1和P2都回到链表起点，然后让P2先往前走L次（每次往前走一步），然后P1和P2再同时往前走，当它们再次相遇时，P1所走的步数就是环前面的子链长度。

算法示意：

.. code-block:: python

    def CheckRing(head):
      l1 = 0  # length of the chain before the ring
      l2 = 0  # length of the ring

      # Check if there is a ring.
      pos1 = head
      pos2 = head
      while pos2 and pos2.next:
        pos1 = pos1.next
        pos2 = pos2.next.next
        l1 += 2
        if pos2 and pos1 == pos2:
          l2 = 1
          break
      if not l2:
        if pos2: l1 += 1
        return (l1, l2)  # l2 should be 0

      # Calc the length of the ring.
      pos1 = pos2.next
      while pos1 != pos2:
        pos1 = pos1.next
        l2 += 1

      # Calc the length of the chain before the ring.
      l1 = 0
      pos1 = head
      pos2 = head
      for i in xrange(l2):
        pos2 = pos2.next
      while pos1 != pos2:
        pos1 = pos1.next
        pos2 = pos2.next
        l1 += 1
      return (l1, l2)
