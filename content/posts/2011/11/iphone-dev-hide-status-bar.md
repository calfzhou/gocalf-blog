Title: iPhone开发：隐藏系统状态栏
Date: 2011-11-30 14:45
Author: Calf
Category: 程序开发
Tags: iOS, iPhone开发, ObjC, setStatusBarHidden, Status Bar, UIApplication, 隐藏状态栏
Slug: iphone-dev-hide-status-bar
Summary: 最近在写iPhone上的程序，第一次在Mac下进行开发，也是第一次写手机上的程序，虽然之前看了少许相关的书籍，但在开发的过程中还是遇到了很多的问题。在这个系列中记录一些遇到的实际的问题，方便淡忘了之后再次查阅。今天的问题是怎么在App中隐藏系统状态栏（Status Bar）。

最近在写iPhone上的程序，第一次在Mac下进行开发，也是第一次写手机上的程序，虽然之前看了少许相关的书籍，但在开发的过程中还是遇到了很多的问题。在这个系列中记录一些遇到的实际的问题，方便淡忘了之后再次查阅。

今天的问题是怎么在App中隐藏系统状态栏（Status Bar）。

<!--more-->

以下内容适用于iOS 3.2+。

## 一、始终隐藏状态栏

如果在App中需要状态栏一直是隐藏着的，可以在&lt;YOUR_APP&gt;AppDelegate的`application:didFinishLaunchingWithOptions:`函数中进行设置，比如下面这段示意代码可以让状态栏以淡出的方式隐藏起来：

<!--highlight="3"-->
```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    [application setStatusBarHidden:NO withAnimation:UIStatusBarAnimationFade];

    // Add the view controller's view to the window and display.
    [self.window addSubview:viewController.view];
    [self.window makeKeyAndVisible];

    return YES;
}
```

相关的方法或属性是[UIApplication][]的：

-   [setStatusBarHidden:withAnimation:][]（iOS 3.2+）
-   [statusBarHidden][]（iOS 2.0+）

另外还有一个方法[setStatusBarHidden:animated:][]，已经不推荐使用了（deprecated in iOS 3.2）。

## 二、App启动时就隐藏状态栏

用了上面的方法之后，App在运行过程中，状态栏确实被隐藏起来了，但是我发现在App启动的那个瞬间，还是可以看到状态栏的，然后一闪即过。虽然时间很短暂，看着还是很不舒服。为了让状态栏从启动的时候就隐藏起来，可以修改&lt;YOUR_APP&gt;-Info.plist。如果在Xcode中修改，在根结点Infomation Property List下面新加一项“Status bar is initially hidden”（不用手动输入，可以直接在下拉菜单中选取）。这是个BOOL类型的键值，将Value栏中的复选框勾选上即可。

[caption id="attachment\_1495" align="alignnone" width="322"
caption="在Info.plist中设置状态栏为隐藏"]![status\_bar\_initially\_hidden][][/caption]

也可以以文本方式修改，在根节点中添加UIStatusBarHidden键值，值设为true即可：

```xml
<key>UIStatusBarHidden</key>
<true/>
```

## 三、在运行过程中隐藏或显示状态栏

与第一段中的方法一样，只是可以在任何地方调用。只要利用UIApplication类的静态方法[sharedApplication][]拿到application实例即可。

  [UIApplication]: http://developer.apple.com/library/ios/#documentation/UIKit/Reference/UIApplication_Class/Reference/Reference.html
  [setStatusBarHidden:withAnimation:]: http://developer.apple.com/library/ios/#documentation/UIKit/Reference/UIApplication_Class/Reference/Reference.html#//apple_ref/occ/instm/UIApplication/setStatusBarHidden:withAnimation:
  [statusBarHidden]: http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/Reference/Reference.html#//apple_ref/occ/instp/UIApplication/statusBarHidden
  [setStatusBarHidden:animated:]: http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/DeprecationAppendix/AppendixADeprecatedAPI.html#//apple_ref/occ/instm/UIApplication/setStatusBarHidden:animated:
  [status\_bar\_initially\_hidden]: http://www.gocalf.com/blog/wp-content/uploads/2011/11/status_bar_initially_hidden.png
    "status_bar_initially_hidden"
  [sharedApplication]: http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/Reference/Reference.html#//apple_ref/occ/clm/UIApplication/sharedApplication
