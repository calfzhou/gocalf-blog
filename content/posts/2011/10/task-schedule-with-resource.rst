任务调度问题：资源占用与释放
############################
:date: 2011-10-15 00:10
:modified: 2011-10-21 18:50
:author: Calf
:category: 算法
:tags: Interview Question, Task Schedule, Greedy Algorithm
:keywords: Google 面试, 任务, 算法题, 调度, 资源, 面试题
:slug: task-schedule-with-resource
:lang: zh_cn
:featured_image: https://blog.gocalf.com/images/2011/10/task_with_resource.png
:summary: 问题描述：有 n 个任务，第 i 个任务运行时需要使用 R[i] 的资源，运行完毕后需要占用 O[i] 的资源（O[i] <= R[i]），假设现在我们总共有 s 的资源，要求设计一个调度算法，能保证所有任务能顺利执行；如果无法执行完，需要说明理由。

据说这是 2009 年 Google 暑期实习招聘的笔试题。

问题描述：有 n 个任务，第 i 个任务运行时需要使用 R[i] 的资源，运行完毕后需要占用 O[i] 的资源（O[i] <=
R[i]），假设现在我们总共有 s 的资源，要求设计一个调度算法，能保证所有任务能顺利执行；如果无法执行完，需要说明理由。

.. more

举例：比如有 n = 2 个任务，R[1] = 10，O[1] = 2，R[2] = 5，O[2] =
3，总资源 s = 10。如果先执行任务 1，剩余资源 10 - 2 =
8，可以执行任务 2；反过来先执行任务 2，剩余资源 10 - 3 = 7，7 < r[1] =
10，无法执行任务 1。

这道题的解法很简单，按照 R - O 从大到小排序就是可行的调度顺序，如果按照这个顺序无法执行完所有任务，那么其他任何顺序也都不行；反之，如果存在某个顺序使得所有任务能顺利执行，那么这个顺序一定也可以。

先看算法，稍后再做证明。

.. code-block:: python

    def ScheduleTasks(R, O, n, s):
      # R: request
      # O: occupancy
      # R - O: temporal = request - occupancy
      tasks = [(i, R[i], O[i], R[i] - O[i]) for i in xrange(n)]
      tasks.sort(key=operator.itemgetter(-1), reverse=True)
      for i in xrange(n):
        (taskId, req, occ, temp) = tasks[i]
        if req > s or occ > s:
          return (False, tasks)
        s -= occ
      return (True, tasks)

显然这是贪心法，那么贪心法是否一定能得到可行解呢？

假设存在一个可行解（任务的执行顺序）为：T1, T2, …,
Tn。设其中存在两个相邻的任务 T\ :sub:`i` 和 T\ :sub:`i+1`，满足 R[i] - O[i] < R[i+1] -
O[i+1]。

设执行任务 j 前的资源剩余量为 s'，因为这是一个可行解，任务 j 和任务 k 都可以顺利执行，因此有：s'
- O[i] >= R[i+1]。

联列这两个式子可以得到：s' >= R[i+1] + O[i] > R[i] + O[i+1]，即 s' -
O[i+1] > R[i]，可见交换任务 T\ :sub:`i` 和 T\ :sub:`i+1` 的执行顺序后依旧是可行解。

以此类推，对于任何 i（1 <= i < n），如果 R[i] - O[i] < R[i+1] -
O[i+1]，我们都可以将这两个任务的顺序交换，最终得到的执行顺序是可行解。

综上所述，按照 R - O 从大到小排列所有的任务是可行解。
