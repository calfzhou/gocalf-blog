iPhone开发：自定义控件RangeSlider（范围滑动条）
###############################################
:date: 2012-02-03 21:19
:modified: 2012-12-04 16:58
:author: Calf
:category: 程序开发
:tags: iOS, iPhone 开发, ObjC, Range Slider, UIControl, UISlider, 控件
:slug: iphone-dev-range-slider
:summary: 前些日子写app的时候遇到一个需求，希望有一个类似于UISlider的东西，但能够选取一个范围，也就是所谓的Range Slider。在网上也能找到很多相关的代码，不过本着学习的态度，还是自己琢磨了一下，就当是为以后写复杂控件做的练习吧。

前些日子写app的时候遇到一个需求，希望有一个类似于\ `UISlider`_\ 的东西，但能够选取一个范围，也就是所谓的Range
Slider。在网上也能找到很多相关的代码，不过本着学习的态度，还是自己琢磨了一下。

就当是为以后写复杂控件做的练习吧。

.. more

以下内容适用于iOS 2.0+。

需求决定一切，在介绍我的这个Range
Slider之前，先把我的需求（或者说我这个Range
Slider的功能）介绍一下。它最多只算是个toy，还有很多需要完善的地方。不过聊胜于无，以后继续努力呗。

这是一个水平方向的（浮点）数值范围选择器：

-  可以为它设置数值的最小值（minimumValue）和最大值（maximumValue），分别对应于滑动条最左端和最右端的数值。
-  可以设置范围的最小值（minimumSpan）和最大值（maximumSpan），因为我可能会要求选择的数值区间长度不太短或不太长。
-  可以获取或设置当前选择的数值范围（smallValue和largeValue），对应于界面上左右两个滑块的位置。
-  左右两个滑块都可以相互独立地左右滑动；一个滑块滑动时，另一个滑块会根据需要自动调整。比如当向左滑动左边的滑块时，如果选取的范围已经达到范围最大值（maximumSpan），右边的滑块就会跟着向左滑动。反之亦然。
-  两个滑块中间的条块也是可以滑动的，移动它的时候，两个滑块会一起左右移动（不改变选取范围的长度）。
-  当滑块或者滑条移动时，此控件的UIControlEventValueChanged事件会被触发。
-  可以用程序修改当前的选择范围，UI会跟着调整，但不会触发上述事件，以免在某些情况下陷入死循环。
-  以左滑块为例，当它滑动到最左边后，如果手指继续做向左滑动的动作，当前选择的范围不会变化，但会通过另一个量（offsetTrend）来表达这种趋势。在某些情况下，应用程序可能会需要得到这样的信息，以便当用户在slider边缘继续往外滑动时，进行一些特殊的处理。右滑块和滑条都有同样的功能。
-  可以为这个控件设置委托（delegate），当滑块或者滑条将要开始滑动、或者滑动结束的时候，委托的对象都会收到相应的消息。当然，会有一个只读的量（isDragging）用来查询是否有滑块或者滑条在滑动中。
-  slider的背景条、滑块、滑条的图案都可以被替换。

我的这个Range Slider暂\ **不支持**\ 的功能包括但不限于：

-  不支持纵向的滑动模式（或许可以直接利用旋转整个控件达到此目的）。
-  没有为自定义UI样式提供足够的接口。虽然背景和滑块的图片都能替换，但并不支持为每一个对象实例单独替换图片。比起SDK中的UISlider，这方面的功能是相当薄弱的。

说了这么多，来看看它的样子吧。外表很简单，我用的背景、滑块和滑条图片都跟UISlider是一样的：

.. figure:: {filename}/images/2012/02/range_slider.png
    :alt: range_slider
    
    我的Range Slider

实现起来蛮简单的，因为SDK已经提供了足够的支持。我的这个类就叫做RangeSlider，继承自\ `UIControl`_\ 类。另外我还定义了它的委托类，叫做RangeSliderDelegate。二者的接口如下：

- RangeSlider

.. code-block:: objc

    #import <UIKit/UIKit.h>

    @protocol RangeSliderDelegate;

    @interface RangeSlider : UIControl {
    @private
        id<RangeSliderDelegate> delegate_;

        float minimumValue_;
        float maximumValue_;
        float minimumSpan_;
        float maximumSpan_;
        float smallValue_;
        float largeValue_;
        float offsetTrend_;
        int insetWidthLeft_;
        int rangeWidth_;

        UIImageView* selectionView_;
        UIImageView* smallHandle_;
        UIImageView* largeHandle_;

        BOOL isTrackingSmallHandle_;
        BOOL isTrackingLargeHandle_;
        BOOL isTrackingSelection_;
        BOOL isDragging_;
    }

    // The delegate object.
    @property(nonatomic, assign) id<RangeSliderDelegate> delegate;

    // The minimum value of the slider.
    // The default value is 0.0.
    @property(nonatomic, assign) float minimumValue;

    // The maximum value of the slider.
    // The default value is 1.0.
    @property(nonatomic, assign) float maximumValue;

    // The minimum span of the selected range.
    // The default value is 0.1.
    @property(nonatomic, assign) float minimumSpan;

    // The maximum span of the selected range.
    // The default value is 1.0.
    @property(nonatomic, assign) float maximumSpan;

    // The lower bound of the selected range.
    @property(nonatomic, assign, setter=setSmallValue:) float smallValue;

    // The higher bound of the selected range.
    @property(nonatomic, assign, setter=setLargeValue:) float largeValue;

    // A Boolean value that indicates whether the user has begun dragging.
    @property(nonatomic, assign, readonly) BOOL isDragging;

    // Initialization with frame, also specify the inset of left and right edge.
    - (id)initWithFrame:(CGRect)frame insetLeft:(int)insetLeft insetRight:(int)insetRight;

    // Move the current selection.
    - (void)moveSelection:(float)offset;

    // Gets offset trend, it will be reset to 0 after call finished.
    - (float)getAndResetOffsetTrend;

    // Converts slider value to x coor.
    - (float)xForValue:(float)value;

    // Converts x coor to slider value.
    - (float)valueForX:(float)x;

    @end

- RangeSliderDelegate

.. code-block:: objc

    @protocol RangeSliderDelegate<NSObject>
    @optional

    // Tells the delegate when the slider is about to start dragging.
    // The delegate might not receive this message until dragging has occurred over a small distance.
    - (void)rangeSliderWillBeginDragging:(RangeSlider*)rangeSlider;

    // Tells the delegate when dragging ended in the range slider.
    // This message is sent when the user's finger touches up after dragging.
    - (void)rangeSliderDidEndDragging:(RangeSlider*)rangeSlider;

    @end

接口中的大部分内容都在需求和功能介绍部分见过了。另外有两个方法，xForValue和valueForX，它们用来在Range
Slider内部的坐标值和用户数值之间做转换，内容如下（这里的insetWidth是在UI上做的小伎俩，主要是为了保证滑块滑到最两端时也能有充足的空间来接受用户的点击）：

.. code-block:: objc

    - (float)xForValue:(float)value {
        return insetWidthLeft_ + rangeWidth_ * (value - minimumValue_) / (maximumValue_ - minimumValue_);
    }

    - (float)valueForX:(float)x {
        return minimumValue_ + (x - insetWidthLeft_) * (maximumValue_ - minimumValue_) / rangeWidth_;
    }

我就不贴完整的.m源文件了，只是逐个介绍一下重要的方法。

首先看初始化方法initWithFrame，和更新显示的方法updateSelectionView。这个没啥好说的，就是初始化成员变量，创建好相关的图片：

- initWithFrame

.. code-block:: objc

    - (id)initWithFrame:(CGRect)frame insetLeft:(int)insetLeft insetRight:(int)insetRight {
        self = [super initWithFrame:frame];
        if (self != nil) {
            // Set the initial state.
            minimumValue_ = 0.0f;
            maximumValue_ = 1.0f;
            minimumSpan_ = 0.1f;
            maximumSpan_ = 0.7f;
            smallValue_ = minimumValue_;
            largeValue_ = minimumValue_ + maximumSpan_;
            offsetTrend_ = 0.0f;
            insetWidthLeft_ = insetLeft;
            rangeWidth_ = frame.size.width - insetLeft - insetRight;

            isTrackingSmallHandle_ = NO;
            isTrackingLargeHandle_ = NO;
            isTrackingSelection_ = NO;
            isDragging_ = NO;

            float centerY = frame.size.height / 2.0f;

            // Background image.
            UIImageView* background = [[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"rangeslider-bg.png"]]
                                      autorelease];
            background.frame = CGRectMake(insetWidthLeft_, 0, rangeWidth_, background.frame.size.height);
            background.center = CGPointMake(background.center.x, centerY);
            [self addSubview:background];

            // Selection image.
            selectionView_ = [[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"rangeslider-select.png"]
                                                highlightedImage:[UIImage imageNamed:@"rangeslider-select-hover.png"]]
                              autorelease];
            selectionView_.center = CGPointMake(0, centerY);
            [self addSubview:selectionView_];

            // Left handle for small value selection.
            smallHandle_ = [[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"rangeslider-handle.png"]
                                              highlightedImage:[UIImage imageNamed:@"rangeslider-handle-hover.png"]]
                            autorelease];
            smallHandle_.center = CGPointMake(0, centerY);
            [self addSubview:smallHandle_];

            // Right handle for small value selection.
            largeHandle_ = [[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"rangeslider-handle.png"]
                                              highlightedImage:[UIImage imageNamed:@"rangeslider-handle-hover.png"]]
                            autorelease];
            largeHandle_.center = CGPointMake(0, centerY);
            [self addSubview:largeHandle_];

            [self updateSelectionView];
        }

        return self;
    }

- updateSelectionView

.. code-block:: objc

    - (void)updateSelectionView {
        smallHandle_.center = CGPointMake([self xForValue:smallValue_], smallHandle_.center.y);
        largeHandle_.center = CGPointMake([self xForValue:largeValue_], largeHandle_.center.y);
        selectionView_.frame = CGRectMake(smallHandle_.center.x,
                                          selectionView_.frame.origin.y,
                                          largeHandle_.center.x - smallHandle_.center.x,
                                          selectionView_.frame.size.height);
    }

接下来看最重要的部分，就是处理触摸事件的方法。这些方法继承自基类UIControl，分别是\ `beginTrackingWithTouch:withEvent:`_\ ，\ `continueTrackingWithTouch:withEvent:`_\ ，和\ `endTrackingWithTouch:withEvent:`_\ 。

beginTracking和endTracking都很简单，在beginTracking的时候判断是哪个东西被拖动，让其进入高亮状态，修改成员变量记录当前的状态；在endTracking的时候取消高亮，恢复状态。

在continueTracking方法中，先获取手指移动的坐标偏移量，将其换算成数值的偏移量，然后就直接调用相应的设置函数修改已选择的数值区域。

注意rangeSliderWillBeginDragging和rangeSliderDidEndDragging这两个消息的回调时机。手指刚刚按在滑块上的时候，beginTracking被调用，但这时并不表示用户开始已经开始拖动了，他可能只是按了一下，马上就抬起来。所以当手指按住滑块并有了第一次微小的位移时，continueTracking被调用，这时就可以确定用户是在进行拖动操作。这时候才发送rangeSliderWillBeginDragging消息。最后当手指离开滑块时，拖动操作结束，发送rangeSliderDidEndDragging消息。

- beginTrackingWithTouch

.. code-block:: objc

    - (BOOL)beginTrackingWithTouch:(UITouch*)touch withEvent:(UIEvent*)event {
        CGPoint touchPoint = [touch locationInView:self];
        if (CGRectContainsPoint(largeHandle_.frame, touchPoint)) {
            largeHandle_.highlighted = YES;
            isTrackingLargeHandle_ = YES;
        }
        else if (CGRectContainsPoint(smallHandle_.frame, touchPoint)) {
            smallHandle_.highlighted = YES;
            isTrackingSmallHandle_ = YES;
        }
        else if (CGRectContainsPoint(selectionView_.frame, touchPoint)) {
            selectionView_.highlighted = YES;
            isTrackingSelection_ = YES;
        }
        else {
            return NO;
        }

        isDragging_ = NO;
        return YES;
    }

- continueTrackingWithTouch

.. code-block:: objc

    - (BOOL)continueTrackingWithTouch:(UITouch*)touch withEvent:(UIEvent*)event {
        if (!isTrackingSmallHandle_ && !isTrackingLargeHandle_ && !isTrackingSelection_) {
            return NO;
        }

        if (!isDragging_) {
            isDragging_ = YES;
            if ([self.delegate respondsToSelector:@selector(rangeSliderWillBeginDragging:)]) {
                [self.delegate rangeSliderWillBeginDragging:self];
            }
        }

        float prev = [self valueForX:[touch previousLocationInView:self].x];
        float curr = [self valueForX:[touch locationInView:self].x];
        float offset = curr - prev;

        if (isTrackingSmallHandle_) {
            self.smallValue = smallValue_ + offset;
        }
        else if (isTrackingLargeHandle_) {
            self.largeValue = largeValue_ + offset;
        }
        else if (isTrackingSelection_) {
            [self moveSelection:offset];
        }

        [self sendActionsForControlEvents:UIControlEventValueChanged];
        return YES;
    }

- endTrackingWithTouch

.. code-block:: objc

    [wptabcontent][ccen_objc]- (void)endTrackingWithTouch:(UITouch*)touch withEvent:(UIEvent*)event {
        isTrackingSmallHandle_ = NO;
        isTrackingLargeHandle_ = NO;
        isTrackingSelection_ = NO;

        selectionView_.highlighted = NO;
        smallHandle_.highlighted = NO;
        largeHandle_.highlighted = NO;

        if (isDragging_) {
            isDragging_ = NO;
            if ([self.delegate respondsToSelector:@selector(rangeSliderDidEndDragging:)]) {
                [self.delegate rangeSliderDidEndDragging:self];
            }
        }
    }

最后就是修改smallValue、largeValue和整个选取范围的方法，这些方法会在滑动过程中由上面的continueTrackingWithTouch:withEvent:调用，也可以由其他程序直接调用。

不但要保证smallValue和largeValue都在最小值和最大值范围之内，还要根据最小范围和最大范围的限制来进行适当的调整。

- setSmallValue

.. code-block:: objc

    - (void)setSmallValue:(float)value {
        smallValue_ = value;

        smallValue_ = MIN(MAX(smallValue_, minimumValue_), maximumValue_ - minimumSpan_);
        if (smallValue_ < largeValue_ - maximumSpan_) {
            largeValue_ = smallValue_ + maximumSpan_;
        }
        else if (smallValue_ > largeValue_ - minimumSpan_) {
            largeValue_ = smallValue_ + minimumSpan_;
        }

        offsetTrend_ = value - smallValue_;

        [self updateSelectionView];
    }

- setLargeValue

.. code-block:: objc

    - (void)setLargeValue:(float)value {
        largeValue_ = value;

        largeValue_ = MAX(MIN(largeValue_, maximumValue_), minimumValue_ + minimumSpan_);
        if (largeValue_ < smallValue_ + minimumSpan_) {
            smallValue_ = largeValue_ - minimumSpan_;
        }
        if (largeValue_ > smallValue_ + maximumSpan_) {
            smallValue_ = largeValue_ - maximumSpan_;
        }

        offsetTrend_ = value - largeValue_;

        [self updateSelectionView];
    }

- moveSelection

.. code-block:: objc

    - (void)moveSelection:(float)offset {
        float span = largeValue_ - smallValue_;
        float prevSmallValue = smallValue_;
        smallValue_ += offset;
        largeValue_ += offset;
        if (smallValue_ < minimumValue_) {
            smallValue_ = minimumValue_;
            largeValue_ = smallValue_ + span;
        }
        else if (largeValue_ > maximumValue_) {
            largeValue_ = maximumValue_;
            smallValue_ = largeValue_ - span;
        }

        offsetTrend_ = prevSmallValue + offset - smallValue_;

        [self updateSelectionView];
    }

好了，基本上就这么些代码，还是很简单的。不放完整的程序文件了，只要了解了基本的处理方法，就可根据自己的需求去实现了。

.. _UISlider: http://developer.apple.com/library/ios/#documentation/uikit/reference/UISlider_Class/Reference/Reference.html
.. _UIControl: http://developer.apple.com/library/ios/#documentation/uikit/reference/UIControl_Class/Reference/Reference.html#//apple_ref/occ/cl/UIControl
.. _`beginTrackingWithTouch:withEvent:`: http://developer.apple.com/library/ios/documentation/uikit/reference/UIControl_Class/Reference/Reference.html#//apple_ref/occ/instm/UIControl/beginTrackingWithTouch:withEvent:
.. _`continueTrackingWithTouch:withEvent:`: http://developer.apple.com/library/ios/documentation/uikit/reference/UIControl_Class/Reference/Reference.html#//apple_ref/occ/instm/UIControl/continueTrackingWithTouch:withEvent:
.. _`endTrackingWithTouch:withEvent:`: http://developer.apple.com/library/ios/documentation/uikit/reference/UIControl_Class/Reference/Reference.html#//apple_ref/occ/instm/UIControl/endTrackingWithTouch:withEvent:
