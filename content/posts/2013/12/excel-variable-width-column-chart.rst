在Excel中制作不等宽柱状图
#########################
:date: 2013-12-13 14:35
:modified: 2013-12-13 22:40
:author: Calf
:category: 有用知识
:tags: Excel
:keywords: Microsoft Excel, Variable Width Column Chart, Marimekko Chart, 不等宽柱状图, Excel Table, Area Chart
:slug: excel-variable-width-column-chart
:featured_image: http://www.gocalf.com/blog/images/2013/12/variable_width_icon.png
:summary: 介绍一下我是怎么在Microsoft Office Excel中制作不等宽柱状图（Variable Width Column Chart）的。
:depends: highcharts

.. contents::

柱状图大家应该都很熟悉，在Excel中可以很容易创建一个柱状图，每个柱子的高度表达了某个对象的数值大小。但有的时候，需要在柱状图中同时表达两个维度的数据，除了高度之外，希望柱子的宽度也能表达该对象的另外一个数值大小，以便直观地比较这两个维度。我曾经就需要做一个这样的图，不过在Excel中并没有直接提供相关的功能，需要一些小技巧。

今天就来介绍一下我是怎么制作不等宽柱状图（Variable Width Column Chart）的。也有人称其为Marimekko
Chart，我没有仔细去考证，二者好像也并不完全一样。

.. more

注：以下操作是基于Microsoft Office Excel 2013进行的，其他版本可能会有一些差异，但思路是相通的。

数据和目标效果
==============

假设我们有这样一组数据，一共五个对象，每个对象都有两个数值属性（x和y）。我们希望用柱子的宽度表示x的大小（这里只考虑x是非负数的情况），高度表示y的大小。

====== ==== ====
 Item   X    Y
====== ==== ====
A       5.2  5.6
B       3.9 10.1
C      11.5  1.2
D       2.4 17.8
E       8.1  8.4
====== ==== ====

最后做成的图是这样的：

.. figure:: {filename}/images/2013/12/variable_width_column_chart.png
    :alt: variable_width_column_chart

    在Excel中根据上述数据制作的不等宽柱状图

那么应该怎么产生这样的效果呢？内置的柱状图并没有办法调节每个柱子的宽度，所以看起来不应该是从这个角度去做。

一个柱子是有宽度和高度的，二者共同构成了这个柱子的面积。在Excel内置的图表类型中，面积图最接近这个需求。因此可以想到用面积图来模拟不同宽度的柱子。为了区分不同的对象，我们可以为每一个对象画一个面积图，把多个这样的面积图叠加起来，并让每一个柱子在横轴方向的位置不重叠，就能得到想要的样子了。下面就跟着我具体操作一遍。

基础数据和第一次扩展
====================

首先在Excel中把原始数据录入进去。我个人比较喜欢把数据组织成Excel表（Excel
2007才开始有此功能）。这是将一块普通的单元格区域转换成一种有内在联系的表结构，可以更加方便地管理和操作表中的数据。如果你还没有接触过，可以参考\ `官方的文档`_\ （\ `中文文档`_\ ），你一定会爱上它。对于今天要做的不等宽柱状图，Excel表并不是必需的，但它会使得公式更加直观。我今天给出的每一个公式，都会用两种形式（使用Excel表和不使用Excel表）给出，以方便那些确实不习惯Excel表的童鞋。一定要注意，如果你用Excel表，那么对于任何一列，其每一行的公式都是一样的。而如果不用Excel表，我所给出的公式只是该列第一行的公式，你要特别小心公式中什么地方应该加“$”，什么时候不加“$”，后续行的公式会自动根据有没有“$”进行变换。

假设我们把上面表格中的基础数据放在从A1开始的单元格中（这些数据会占据A1到C6范围的单元格），选中这些单元格，点击Ribbon中HOME ->
Format as Table，然后随便选择一个样式，将这片区域转换成Excel表。给这个表起个名字，比如叫作TableData，在Ribbon中点击（TABLE
TOOLS）DESIGN，在Table Name的文本框中输入TableData。

.. figure:: {filename}/images/2013/12/create_data_table.png
    :alt: create_data_table

    选择原始数据单元格范围，转换成Excel表

接下来对这个数据表格做一些简单的扩充——增加几个有用的列。

首先增加一列，叫作Width。在这一列中我们对将要作为柱状图宽度的X数据进行一些变换，主要是为了（在不直接修改原数据的情况下）更方便地控制展示效果。具体应该怎么变换，取决于原数据本身的分布情况，我一般会把原数据缩放到平均在几十到几百这个范围（后面会讲到为什么这样做）。在这里我用把X放大10倍作为Width，因此这一列的公式为：

.. code-block:: text

    =[@X]*10
    =$B2*10

然后再添加两列，分别叫作Right和Left，这两列用于计算每个柱子的右边界和坐边界在横轴上的位置。在写这两列的公式之前，先要考虑一下柱子的间距。假设我们需要让每两个相邻的柱子之间有相等的间隔，我们可以自己指定这个间隔的绝对数值，或者设定一个相对于柱子宽度的比例然后用公式进行自动调节。我在这里设置间隔为柱子平均宽度的20%，因此其公式为：

.. code-block:: text

    =CEILING(AVERAGE(TableData[Width])*0.2,1)
    =CEILING(AVERAGE($D$2:$D$6)*0.2,1)

其中CEILING函数做了个上取整，这不是必须的，大家可以自行把握。另外注意我是对上面新加的Width列求的平均值，而不是原数据中的X。

为了方便以后引用，我们给存放这个数值的单元格起个名字。比如我现在把它放在B8这个单元格里，选中这个单元格，点击Ribbon的FORMULAS ->
Define Name来为其指定一个名字，比如叫作“Gap”。

.. figure:: {filename}/images/2013/12/define_gap_name.png
    :alt: define_gap_name

    给间隔数据所在的单元格定义名字

有了这个柱子之间的间隔，就很容易写出Right和Left的计算公式了。假设第一个柱子的左边界的（横轴）坐标为0，那任何一个柱子的左边界的坐标就等于它左边所有柱子的宽度之和加上若干（=左边的柱子个数）个间隔。而这个柱子的右边界的坐标等于其左边界坐标加上它自身的宽度。实际写公式的时候，为了方便，我先计算右边界的坐标，然后减去宽度得到左边界坐标。

Right列的计算公式是：

.. code-block:: text

    =SUM(TableData[[#Headers],[Width]]:[@Width])+(COUNT(TableData[[#Headers],[Width]]:[@Width])-1)*Gap
    =SUM($D$1:$D2)+(COUNT($D$1:$D2)-1)*Gap

Left列的计算公式是：

.. code-block:: text

    =[@Right]-[@Width]
    =$E2-$D2

面积图数据扩展
==============

前面提到了，我们要用一系列面积图来模拟不等宽柱状图，每一个柱子对应一条面积图曲线。而为了描述一个柱子，需要有四个坐标数据，即柱子矩形的四个顶点。因此原始数据中每一行就要扩展成为4行新的数据（分别对应一个柱子的左下、左上、右上、右下顶点）。那我们就来创建一个新的Excel表来计算这些数据。

假设我们把这个数据表叫作TableArea，放在从A10开始的单元格范围内。

第一列叫作Index，是一列递增的索引值，用于识别所在行的柱子序号和顶点编号。因为每一行原始数据在这里要对应4行新数据，所以这里需要4 * 5 = 20行，对应的编号分别为0，1，2，……，19。

.. figure:: {filename}/images/2013/12/create_area_table.png
    :alt: create_area_table

    新加的Excel表——TableArea

接下来添加一些辅助列，主要是为了简化后续的计算公式。一个一个地介绍。

TableArea的第二列叫作ItemId，用于计算这一行数据对应于原始数据表中的第几行（设第一行为1），计算公式为：

.. code-block:: text

    =INT([@Index]/4)+1
    =INT($A11/4)+1

第三列叫作IsLeft，其值为TRUE或者FALSE，表示该行数据是否对应一个柱子的左边界，计算公式为：

.. code-block:: text

    =MOD([@Index],4)<2
    =MOD($A11,4)<2

第四列叫作IsBottom，其值也是TRUE或者FALSE，表示该行数据是否对应一个柱子的下边界（对于高度为非负数的柱子），计算公式为：

.. code-block:: text

    =MOD([@Index]+1,4)<2
    =MOD($A11+1,4)<2

第五列叫作ItemName，是把该行所对应的对象的名字映射过来得到的，计算公式为：

.. code-block:: text

    =OFFSET(TableData[[#Headers],[Item]],[@ItemId],0,1,1)
    =OFFSET($A$1,$B11,0,1,1)

第六列叫作ItemHeight，是把该行所对应的对象的Y数据（即柱子高度）映射过来得到的，计算公式为：

.. code-block:: text

    =OFFSET(TableData[[#Headers],[Y]],[@ItemId],0,1,1)
    =OFFSET($C$1,$B11,0,1,1)

接下来就是画面积图实际使用的数据了。

第七列叫作X，这个X跟原始数据中的X可不是一回事儿。这里的X表示该行所对应的柱子顶点的横轴坐标。如果该行对应一个柱子的左边界，那其值为TableData的Left列数值；反之，如果该行对应一个柱子的右边界，其值为TableData的Right列数值。此列的计算公式为：

.. code-block:: text

    =OFFSET(IF([@IsLeft],TableData[[#Headers],[Left]],TableData[[#Headers],[Right]]),[@ItemId],0,1,1)
    =OFFSET(IF($C11,$F$1,$E$1),$B11,0,1,1)

所有的柱子都共享上面那一列横坐标数据，但我们需要为每一个柱子准备一列数据来提供相应的纵坐标，因此在X列后面添加5列，名字分别是原始数据中五个对象的名字，即A、B、C、D和E。它们的公式差不多，以A列为例，它的数据包含对象A的柱子面积图每个顶点的纵坐标。如果当前行对应的对象是A，而且当前行对应柱子的上边界时，相应的数据就应该是A对象的Y数据，否则就应该为0。计算公式为：

.. code-block:: text

    =IF(OR([@ItemName]<>TableArea[[#Headers],[A]],[@IsBottom]),0,[@ItemHeight])
    =IF(OR($E11<>H$10,$D11),0,$F11)

对于其他几列，只要把公式中的“[A]”改为对应的列名即可。

.. figure:: {filename}/images/2013/12/data_ready.png
    :alt: data_ready

    准备完毕的两个Excel表

作图
====

现在来创建不等宽柱状体的主体结构。

在TableArea中选择所有的纵坐标列（A列到E列，包括列头和每一行数据），然后点击Ribbon的Insert ->
Insert Area Chart -> Area，插入一张新的面积图。

.. figure:: {filename}/images/2013/12/create_area_chart.png
    :alt: create_area_chart

    创建面积图

在面积图上点击鼠标右键，选择Select Data，在Horizontal (Category) Axis
Labels中可以看到默认的横坐标数据是从1开始的递增整数，需要修改为真实的坐标值。点击Edit，选择TableArea的X列所有数据，保存即可。

.. figure:: {filename}/images/2013/12/change_horizontal_axis_label.png
    :alt: change_horizontal_axis_label

    修改横坐标值

这时候图中的每个柱子都是梯形的，而且宽度跟X列的数据值也没有对应关系，接下来要把等宽的梯形改成不等宽的矩形。这也是制作不等宽柱状图中最重要的一步。用鼠标右键点击横坐标轴，选择Format
Axis，将AXIS OPTIONS -> Axis Type由默认的Automatically select based on data改成Date Axis。

对于Date Axis，我们需要让横坐标数据最小粒度在一天以上，如果都是小于1的数，显示上会有些问题。所以在数据准备的时候，我把X数据进行适当的缩放得到Width，用Width来生成横坐标数据。

.. figure:: {filename}/images/2013/12/use_date_axis.png
    :alt: use_date_axis

    改成Date Axis

.. figure:: {filename}/images/2013/12/trapezoid_vs_rectangle.png
    :alt: trapezoid_vs_rectangle

    应用Date Axis之前（等宽梯形）和之后（不等宽矩形）的图形对比

然后把横轴的刻度和标签隐藏起来，即把TICK MARKS -> Major type从默认的Outside改为None，把LABELS -> Label
Position从默认的Next to Axis改为None。

.. figure:: {filename}/images/2013/12/hide_axis_mark_and_label.png
    :alt: hide_axis_mark_and_label

    隐藏横轴的刻度和标签

修改一下图的标题之后，不等宽柱状图的主体结构就完成了。

.. figure:: {filename}/images/2013/12/chart_demo.png
    :alt: chart_demo

    不等宽柱状图的主体结构

添加数据标签
============

有了主体结构后，大家可以根据需要自行美化图表了，这里我介绍一下如何添加目标效果中的位于柱子上方的数据标签，算作抛砖引玉吧。

先在TableData中添加一列叫作Mid，用于计算每个柱子中心点的横坐标，公式为

.. code-block:: text

    =([@Left]+[@Right])/2
    =($F2+$E2)/2

用鼠标右键点击图表，选择Select Data，然后点击Legend Entries (Series) -> Add增加新的一组数据。在弹出的Edit
Series框中，把Series name设置为Label，把Series values设置为TableData中Y列整列数据。

.. figure:: {filename}/images/2013/12/add_label_series.png
    :alt: add_label_series

    添加一个Series用于展示标签

这时候图表会变的比较难看，没有关系。右键点击新加入的Series，选择Change Series Chart
Type，在Combo -> Custom Combination -> Choose the chart type and axis for your data
series中找到新加的Label这个Series，把它的Chart Type从Area改成散点图（X Y (Scatter) -> Scatter）。

.. figure:: {filename}/images/2013/12/change_series_chart_type.png
    :alt: change_series_chart_type

    将新增加的Serise改为散点图

再次进入Select Data，编辑Label这个Series的数据，这时候就可以编辑它的横轴数据了，把Series
X values设置为TableData中Mid列整列数据。

.. figure:: {filename}/images/2013/12/set_label_series_x_data.png
    :alt: set_label_series_x_data

    设置新增加的Series的横轴坐标

修改之后，这些数据点就刚好落在每一个柱子的上边界中点位置了。右键点击这个Series，选择Add
Data Labels -> Add Data Labels；再右键点击出现的标签，选择Format Data Labels，点击LABEL
OPTIONS -> Label Contains -> Value From Cells复选框，弹出Data Label
Range对话框，将数据范围设置为TableData的X列整列数据。然后将Label Position改为Above。

.. figure:: {filename}/images/2013/12/set_label_options.png
    :alt: set_label_options

    修改数据标签的显示属性

最后隐藏一些不必要的东西即可。比如可以将Label Series的Marker设置为None，把Legend区域内Label字样直接删除。

搞定。

另外，可以在此下载上述操作所生成的Excel文件：

-   使用Excel表的示例文件：\ `variable_width_column.xlsx`_
-   不用Excel表的示例文件：\ `variable_width_column_no_table.xlsx`_

Highcharts版本
==============

`GoCalf博客`_\ 使用\ `Highcharts`_\ 渲染动态图表。Highchart也并不直接支持不等宽柱状图，但是可以用完全相同的方法来进行模拟。具体的过程不再赘述，效果参见下图，源代码可以通过本页面的HTML源码获得，或者查看\ `我共享的jsfiddle`_\ ：

http://jsfiddle.net/calfzhou/TUt2U/

.. raw:: html

    <div id="variable-width-column-chart" class="highcharts" style="height: 400px; width: 640px"></div>
    <script type="text/javascript">
    $(function () {
        var rawData = [
            { name: 'A', x: 5.2, y: 5.6 },
            { name: 'B', x: 3.9, y: 10.1 },
            { name: 'C', x: 11.5, y: 1.2 },
            { name: 'D', x: 2.4, y: 17.8 },
            { name: 'E', x: 8.1, y: 8.4 }
        ];
        function makeSeries(listOfData) {
            var sumX = 0.0;
            for (var i = 0; i < listOfData.length; i++) {
                sumX += listOfData[i].x;
            }
            var gap = sumX / rawData.length * 0.2;
            var allSeries = []
            var x = 0.0;
            for (var i = 0; i < listOfData.length; i++) {
                var data = listOfData[i];
                allSeries[i] = {
                    name: data.name,
                    data: [
                        [x, 0], [x, data.y],
                        {
                            x: x + data.x / 2.0,
                            y: data.y,
                            dataLabels: { enabled: true, format: data.x + ' x {y}' }
                        },
                        [x + data.x, data.y], [x + data.x, 0]
                    ],
                    w: data.x,
                    h: data.y
                };
                x += data.x + gap;
            }
            return allSeries;
        }
        $('#variable-width-column-chart').highcharts({
            chart: { type: 'area', backgroundColor: null },
            colors: ['#3399ff', '#ff3300', '#9fd42e', '#ff9900', '#ff6633'],
            title: { text: 'Variable Width Column Chart' },
            xAxis: {
                tickLength: 0,
                labels: { enabled: false}
            },
            yAxis: {
                title: { enabled: false}
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: { enabled: false }
                        }
                    }
                }
            },
            tooltip: {
                followPointer: true,
                useHTML: true,
                headerFormat: '<span style="color: {series.color}">{series.name}</span>: ',
                pointFormat: '<span>{series.options.w} x {series.options.h}</span>'
            },
            series: makeSeries(rawData)
        });
    });
    </script>

.. _官方的文档: http://office.microsoft.com/en-us/excel-help/overview-of-excel-tables-HA010048546.aspx
.. _中文文档: http://office.microsoft.com/zh-cn/excel-help/overview-of-excel-tables-HA010048546.aspx
.. _variable_width_column.xlsx: {filename}/assets/2013/12/variable_width_column.xlsx
.. _variable_width_column_no_table.xlsx: {filename}/assets/2013/12/variable_width_column_no_table.xlsx
.. _GoCalf博客: http://www.gocalf.com/
.. _Highcharts: http://www.highcharts.com/
.. _我共享的jsfiddle: http://jsfiddle.net/calfzhou/TUt2U/
