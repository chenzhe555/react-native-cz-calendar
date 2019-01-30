
Pod::Spec.new do |s|
  s.name         = "RNCzCalendar"
  s.version      = "1.0.0"
  s.summary      = "RNCzCalendar"
  s.description  = "RN 日历组件"
  s.homepage     = "https://github.com/chenzhe555/react-native-cz-calendar"
  s.license      = { :type => "MIT", :file => "LICENSE" }
  s.author       = { "author" => "376811578@qq.com" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/chenzhe555/react-native-cz-calendar.git", :tag => s.version }
  s.source_files = "*.{h,m}"
  s.requires_arc = true
  s.dependency "React"
  #s.dependency "others"

end

  