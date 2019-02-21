
## Manual installation

npm install react-native-cz-calendar --save



## Usage
###  1.引入组件
```
import Calendar from 'react-native-cz-calendar';
```

iOS: 在Podfile中加入
```
pod 'RNCzCalendar', :path => '../node_modules/react-native-cz-calendar/ios/RNCzCalendar.podspec'
```
然后执行
```
pod install
```

使用
```
<Calendar
   evaluateView={ (calendar) => {this.calendar = calendar} }
   confirmAction={this._confirmAction}
/>
```

###  2.属性:
```
type: 1.单选组件 2.双选组件
```
```
bottomSpace: 类型iPhoneX这种底部给间隙，不然会被遮挡部分底部
```

###  3.属性方法:
```
evaluateView: 赋值当前对象
```
```
confirmAction: 点击确定按钮回调: {'date': 2010-05-10,'arr': [2010,5,10]}
```

###  4.供外部调用的方法:
```
/*
* 显示日历
* data = {'date': '2010-05-10'}
* */
this.calendar.show(data = {})
```
```
/*
* 隐藏日历
* */
this.calendar.hide: 隐藏日历
```


