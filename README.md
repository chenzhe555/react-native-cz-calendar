
# react-native-cz-calendar

## Getting started

`$ npm install react-native-cz-calendar --save`

### Mostly automatic installation

`$ react-native link react-native-cz-calendar`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-cz-calendar` and add `RNCzCalendar.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCzCalendar.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.chenzhe.calendar.RNCzCalendarPackage;` to the imports at the top of the file
  - Add `new RNCzCalendarPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-cz-calendar'
  	project(':react-native-cz-calendar').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-cz-calendar/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-cz-calendar')
  	```


## Usage
```javascript
import RNCzCalendar from 'react-native-cz-calendar';

// TODO: What to do with the module?
RNCzCalendar;
```
  