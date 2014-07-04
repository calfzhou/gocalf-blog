用Python读写Excel文件
#####################
:date: 2013-12-03 20:50
:modified: 2013-12-03 20:50
:author: Calf
:category: 程序开发
:tags: Excel
:keywords: XlsxWriter, python-excel, xlrd, xlwt, OpenPyXL, Win32Com, Microsoft Excel
:slug: python-read-write-excel
:lang: zh
:featured_image: http://www.gocalf.com/blog/images/2013/12/python-excel.png
:summary: 前段时间需要用Python来处理Microsft Excel文件，尝试了一些不同的方法，记录下来留个印象。
:depends: fontawesome

.. role:: raw-html(raw)
    :format: html

.. contents::

虽然天天跟数据打交道，也频繁地使用Excel进行一些简单的数据处理和展示，但长期以来总是小心地避免用Python直接读写Excel文件。通常我都是把数据保存为以TAB分割的文本文件（TSV），再在Excel中进行导入或者直接复制粘贴。

前段时间做一个项目，却不得不使用Python直接生成Excel文件，后来随着需求的变化，还要对已有的Excel文件进行读取。在这个过程中，研究并尝试了一些工具，也走了一些弯路。记录下来，下次再有类似需求的时候就不用漫天遍野地搜索了。

.. more

超级无敌大PK
============

我主要尝试了四种工具，在此并不会给出他们的排名，因为在不同的应用场景下，做出的选择会不同。

+--------+----------------------------+----------------------------+----------------------------+----------------------------+
|        | `XlsxWriter`_              | `xlrd&xlwt`_               | `OpenPyXL`_                | `Microsoft Excel API`_     |
+========+============================+============================+============================+============================+
| 介绍   | 可以创建Excel 2007或更高\  | 即\ `python-excel`_\ ，含\ | 可以读写Excel 2007 XLSX和\ | 直接通过COM组件与Microsoft |
|        | 版本的XLSX文件             | `xlrd`_\ 、\ `xlwt`_\ 和\  | XLSM文件                   | Excel进程通信调用其各种功\ |
|        |                            | \ `xlutils`_\ 三大模块，\  |                            | 能实现对Excel文件的操作    |
|        |                            | 分别提供读、写和其他功能   |                            |                            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 读     | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    |
|        | fa-times"></i>`            | fa-check"></i>`            | fa-check"></i>`            | fa-check"></i>`            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 写     | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    |
|        | fa-check"></i>`            | fa-check"></i>`            | fa-check"></i>`            | fa-check"></i>`            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 修改   | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    |
|        | fa-times"></i>`            | fa-times"></i>`            | fa-warning"></i>`          | fa-check"></i>`            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| .xls   | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    |
|        | fa-times"></i>`            | fa-check"></i>`            | fa-times"></i>`            | fa-check"></i>`            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| .xlsx  | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    |
|        | fa-check"></i>`            | fa-warning"></i>`          | fa-check"></i>`            | fa-check"></i>`            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 大文件 | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    | :raw-html:`<i class="fa    |
|        | fa-check"></i>`            | fa-times"></i>`            | fa-check"></i>`            | fa-times"></i>`            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 功能   | 强                         | 弱                         | 一般                       | 超强                       |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 速度   | 快                         | 快                         | 快                         | 超慢                       |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 系统   | 无限制                     | 无限制                     | 无限制                     | Windows + Excel            |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+
| 适用\  | - 要创建XLSX文件           | - 要读取XLS或XLSX文件      | - 要处理XLSX文件           | - 需要处理各种文件格式     |
| 场景   | - 不需要读取已有文件       | - 要生成XLS文件            | - 需要修改已有文件，或者\  | - 需要用到特别复杂的功能   |
|        | - 需要实现比较复杂的功能   | - 需要的功能不太复杂       |   在写入过程中需要不断修改 | - 在修改文件时，不希望对\  |
|        | - 数据量可能会很大         | - 需要跨平台               | - 需要的功能比较复杂       |   原有信息造成任何意外破坏 |
|        | - 需要跨平台               |                            | - 数据量可能会很大         | - 数据量很小，或者愿意等待 |
|        |                            |                            | - 需要跨平台               | - 仅在Windows中使用        |
+--------+----------------------------+----------------------------+----------------------------+----------------------------+

XlsxWriter
==========

`XlsxWriter`_\ 是我最终选择的用于写操作的工具。顾名思义，它只能用来写文件。

这应该是个比较新的项目，在GitHub上看它最早的提交是在2013年1月份。其官方文档中宣称它支持：

- 100% compatible Excel XLSX files.
- Full formatting.
- Merged cells.
- Defined names.
- Charts.
- Autofilters.
- Data validation and drop down lists.
- Conditional formatting.
- Worksheet PNG/JPEG images.
- Rich multi-format strings.
- Cell comments.
- Memory optimisation mode for writing large files.

优点
----

一、功能比较强

相对而言，这是除Excel自身之外功能最强的工具了。比如我就用到了它提供的：字体设置、前景色背景色、border设置、视图缩放（zoom）、单元格合并、autofilter、freeze panes、公式、data validation、单元格注释、行高和列宽设置等等。

最让我惊奇的是，用它生成的带有单元格注释的Excel文件，不论是Excel 2007还是Excel 2013都可正常打开（下面会提到，这个任务用Excel自身都无法完成）。

二、支持大文件写入

如果数据量非常大，可以启用\ `constant memory模式`_\ ，这是一种顺序写入模式，得到一行数据就立刻写入一行，而不会把所有的数据都保持在内存中。

缺点
----

一、不支持读取和修改

作者并没有打算做一个XlsxReader来提供读取操作。不能读取，也就无从修改了。它只能用来创建新的文件。我是利用xlrd把需要的信息读入后，用XlsxWriter创建全新的文件。

另外，即使是创建到一半Excel文件，也是无法读取已经创建出来的内容的（信息应该在，但是并没有相应的接口）。因为它的主要方法是\ ``write``\ 而不是\ ``set``\ 。当你在某个单元格写入数据后，除非你自己保存了相关的内容，否则还是没有办法读出已经写入的信息。从这个角度看，你无法做到读出->修改->写回，只能是写入->写入->写入。

二、不支持XLS文件

XLS是Office 2013或更早版本所使用的格式，是一种二进制格式的文件。XLSX则是用一系列XML文件组成的（最后的X代表了XML）一个压缩包。如果非要创建低版本的XLS文件，就请移步xlwt吧。

三、暂时不支持透视表（Pivot Table）

透视表是非常麻烦的东西，除了自身复杂的结构外，还需要一套数据缓存。我向作者提出了这个需求，不过这是个很难完全实现的功能，我们慢慢期待吧。

xlrd&xlwt
=========

我的程序在第一版的时候，使用\ `xlwt`_\ 创建XLS文件，然后通过\ `Microsoft Excel API`_\ 将其转换为XLSX文件，并写入高级的Data Validation（Excel 2007的Data Validation比Excel 2003要强大不少）和单元格注释。

我的程序最终的版本也依然用\ `xlrd`_\ 从已有的文件中读出所需的信息。

`xlrd&xlwt`_\ 主要是针对Office 2013或更早版本的XLS文件格式。

优点
----

一、支持XLS格式

XlsxWriter和OpenPyXL都不支持XLS格式，从这个角度看，\ `xlrd&xlwt`_\ 仍然有一定的不可替代性。

缺点
----

一、对XLSX支持比较差

目前\ `xlrd`_\ 已经可以读取XLSX文件了，有限地支持。至于\ `xlwt`_\ 我没有试验过，估计是够呛。

二、对修改的支持比较差

xlrd和xlwt是两个相对独立的模块，虽然\ `xlutils`_\ 提供方法帮助你把\ ``xlrd.Book``\ 对象复制到\ ``xlwt.Workbook``\ 对象，但跟XlsxWriter类似，后者只是提供write方法，使得你无法很容易地获取当前已经写入的数据并进行有针对性的修改。如果非要这样做，你要不断地保存，然后再用新的\ ``xlrd.Book``\ 对象读取你要的信息，还是比较麻烦的。

三、功能很弱

除了最基本的写入数据和公式，xlwt所提供的功能非常少（Excel 2013本身支持的功能也就很少）。对于读取也是一样的，很多信息在读入时就丢失掉了。

OpenPyXL
========

`OpenPyXL`_\ 是比较综合的一个工具，能读能写能修改，功能还算可以但也有很大的缺陷。我在中间版本的时候是打算完全依赖它的，但后来发现一个严重的问题就放弃了。

优点
----

一、能读能写能修改

OpenPyXL的工作模式跟XlsxWriter和xlwt有很大的区别，它用的是getter/setter模式。你可以随时读取某个单元格的内容，并根据其内容进行相应的修改，OpenPyXL会帮你记住每个单元格的状态。

**特别需要注意的一点：**\ 虽然它支持修改已有文件，但由于其所支持的功能有限，读入文件时会忽略掉它所不支持的内容，再写入时，这些内容就丢失了。因此使用时一定要慎重。比如下面的缺点中提到它无法读入公式，那如果你修改一个带有公式的文件，保存之后，所有的公式就都没有了。

二、功能还算可以

整体来讲，它所支持的功能介于XlsxWriter和xlwt之间。

缺点
----

一、不支持XLS

这件事情只能让xlrd和xlwt去做。

二、不支持读取公式

这其实是个不太简单的事情，虽然我没尝试过，但相信xlrd也做不好这件事。

Excel的单元格如果是一个公式，它内部会同时保存公式本身和运算结果的缓存。用OpenPyXL读取单元格内容，它不会告诉你这个单元格的公式是什么，甚至不会告诉你这个单元格存的是公式，它只会拿到这个缓存的运算结果。我本来想利用它判别单元格是不是用了公式，然后做出不同的处理。结果遇到了这个问题，最后只好采取了其他变通的方式去做。

Microsoft Excel API
===================

大部分Windows环境的开发人员都会选择\ `Microsoft Excel API`_\ 。实际上不仅仅是Python，几乎各种语言都有相应的方法使用它，因为核心的逻辑完全是由Microsft
Excel自身提供的。语言相关的部分只是负责跟Windows的COM组件进行通信。

在Python中首先需要安装\ `Python for Windows extensions`_\ （\ `pywin32`_\ ），具体的文档可以查阅\ `Win32 Modules`_\ 和\ `Python COM`_\ 。

当然你还必须要安装某一个版本的Microsoft Office Excel，它内部的DLL负责实际的操作。

优点
----

一、最大的优点：强大无极限

因为直接与Excel进程通信，你可以做任何在Excel里可以做的事情。

二、文档丰富

MSDN上的文档绝对是世界上最优秀的文档。没有之一。

三、调试方便

你完全可以直接在Excel里面用宏先调试你想要的效果。甚至如果你不清楚怎么用程序实现某个操作，你可以通过宏录制的方法得到该操作的处理代码。

缺点
----

一、致命的缺点：慢到死

因为需要与Excel进程通信，其效率是非常低的。

如果让Excel窗口可见，随着程序的运行，你可以看到每一句程序所带来的变化，单元格的内容一个一个地改变。如果要写入的数据很多，那速度是无法忍受的。

二、平台限制

目前还没有发现可以在非Windows系统使用它的方法。

另外，基于它的程序能做什么事情，很大程度上依赖于当前系统所安装的Excel版本。不同的版本在功能上有很大的差异，API也会有差异。用起来会比较麻烦。

三、Excel自身bug导致的问题

我刚好发现了其中一个，这和Python没有任何关系，可以完全在Excel中手动复现。在Excel 2007中随便创建一个文件，给某个单元格添加注释，保存。换台电脑，用Excel 2013打开，就会报错，然后注释就消失了。

同样如果你的程序在一台装有Excel 2007的机器上创建一个带有注释的Excel文件，把这个文件拿到Excel 2013中打开也会报错，也看不到注释。反过来也一样。

关于初始化
----------

Excel的com接口的具体细节我就不介绍了，需要的话直接查阅相关的MSDN文档即可。这里只提几个特殊的小问题。

要想得到一个可以操作的excel对象，一般可以有两种方式：

.. code-block:: python
    :linenos: none

    import win32com.client

    excel = win32com.client.Dispatch('Excel.Application')

.. code-block:: python
    :linenos: none

    import win32com.client

    excel = win32com.client.DispatchEx('Excel.Application')

二者的区别在于，Dispatch方法会试图寻找并复用一个已有的Excel进程（比如你已经在运行着的Excel程序），而DispatchEx则一定会创建一个新的Excel进程。一般情况使用前者就可以了，还能节省一些资源的开销。但也会带来一些麻烦，有一些状态是在一个Excel进程内共享的，你在同进程的其他窗口内操作有可能会影响到Python程序所要进行的处理，导致各种错误。比如当你手动开启的Excel窗口中，某个单元格正处于编辑状态，那Python程序控制的大部分操作都有可能失败（即使它操作的是另一个文件），因为一个Excel进程中无法让两个单元格同时被编辑。

为了避免麻烦，我一般都使用DispatchEx方法。

关于窗口可见
------------

可以让新启动的Excel进程窗口可见，就像你通过双击桌面上的图标启动一样，程序所控制的每一步操作，在这个窗口中都可以观察得到。你也可以同时进行手动的操作，但一旦这样做，很有可能使你的Python程序崩溃。

窗口不可见也会带来一些麻烦，前面说了，通过Python启动的Excel进程跟你直接从桌面打开的Excel进程没有什么区别，在使用Excel的过程中，我们经常会遇到各种弹出的错误、警告或者提示框，这些在用Python处理时也有可能遇到。尤其当你的程序还没完全调试好时。

我一般都会让程序控制的Excel进程在调试过程中可见，正式使用时不可见，通过类似这样的命令（假设你有一个叫做\ ``is_debug``\ 的变量记录当前是否在调试状态）：

.. code-block:: python
    :linenos: none
    :hl_lines: 2 3

    excel = win32com.client.DispatchEx('Excel.Application')
    if is_debug:
        excel.Visible = True

关于保存并覆盖已有文件
-----------------------

打开和保存文件的细节不在这里多说了，可以查看MSDN中相关的API介绍，非常详细。这里只说一下在另存为时，如果目标文件已经存在怎么办。Excel的API另存为方法似乎并没有提供参数决定是否直接覆盖同名的目标文件，在窗口操作中，这种情况会弹出一个确认框来让用户决定。我们的程序当然不想这么做，实际上如果你按照上面所说的让窗口不可见，你也就看不到弹出的窗口。

可以把DisplayAlert属性关闭，这样Excel就不会弹出确认窗，而是直接覆盖同名文件。

.. code-block:: python
    :linenos: none
    :hl_lines: 2

    orig_display_alerts = excel.DisplayAlerts
    excel.DisplayAlerts = False
    try:
        book.SaveAs(save_as_file_path)
    finally:
        excel.DisplayAlerts = orig_display_alerts

关于结束Excel进程
-----------------

进程是一种资源，我们申请了资源，在用完之后就必须要释放掉。尤其如果你隐藏了Excel窗口，用户只有查看系统进程，否则无法关闭你所开启的进程。

但是一个Excel进程是可以同时开启多个文件的，这些文件可能是你程序的其他部分开启的，也可能是用户自己开启的。这样你就不能随意地结束Excel进程，否则会影响到其他人或程序的操作。

我一般会在我的处理完成后（关闭了我自己打开或者创建的Excel文件），判断一下当前Excel进程是否还开启着其他的文档，如果没有了才会结束该进程。

.. code-block:: python
    :linenos: none
    :hl_lines: 1

    number_of_workbooks = excel.Workbooks.Count
    if number_of_workbooks > 0:
        logging.debug(
            'there are still %d workbooks opened in excel process, not quit excel application',
            number_of_workbooks
        )
    else:
        logging.debug(
            'no workbook opened in excel process, quiting excel application instance ...'
        )
        excel.Quit()

    del excel

关于枚举常量
------------

Excel API中有各种各样的枚举常量，我还没有找到在Python中直接引用这些常亮的方法，目前的办法是找到所需的常数的值，自己定义这些常数。比如我用到了如下这些枚举常量：

.. code-block:: python

    class ExcelConstants(object):
        # XlFileFormat Enumeration
        xlOpenXMLWorkbook = 51  # Open XML Workbook.

        # XlDVType Enumeration
        xlValidateList = 3  # Value must be present in a specified list.

        # XlDVAlertStyle Enumeration
        xlValidAlertStop = 1  # Stop icon.

        # Constants Enumeration
        xlCenter = -4108

        # XlLineStyle enumeration
        xlContinuous = 1

要想知道某一个枚举常量的数值，可以查阅MSDN中\ `Excel Enumerations`_\ 相关的资料。

.. _XlsxWriter: https://github.com/jmcnamara/XlsxWriter
.. _xlrd: https://pypi.python.org/pypi/xlrd
.. _xlwt: https://pypi.python.org/pypi/xlwt
.. _xlutils: https://pypi.python.org/pypi/xlutils
.. _xlrd&xlwt:
.. _python-excel: http://www.python-excel.org/
.. _OpenPyXL: http://openpyxl.readthedocs.org/
.. _Microsoft Excel API: http://msdn.microsoft.com/en-us/library/fp179694.aspx
.. _Python for Windows extensions:
.. _pywin32: http://sourceforge.net/projects/pywin32/
.. _Win32 Modules: http://docs.activestate.com/activepython/2.4/pywin32/win32_modules.html
.. _Python COM: http://docs.activestate.com/activepython/2.4/pywin32/com.html
.. _constant memory模式: http://xlsxwriter.readthedocs.org/en/latest/working_with_memory.html
.. _Excel Enumerations: http://msdn.microsoft.com/en-us/library/office/ff838815.aspx
