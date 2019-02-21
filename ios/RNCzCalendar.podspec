require 'json'
pjson = JSON.parse(File.read('../package.json'))

Pod::Spec.new do |s|
  s.name            = "RNCzCalendar"
  s.version         = pjson["version"]
  s.homepage        = "https://github.com/chenzhe555/react-native-cz-calendar"
  s.summary         = pjson["description"]
  s.license         = pjson["license"]
  s.author          = { "author" => "376811578@qq.com" }
  s.ios.deployment_target = '9.0'
  s.frameworks      = 'UIKit'
  s.source          = { :git => "https://github.com/chenzhe555/react-native-cz-calendar.git", :tag => "#{s.version}" }
  s.source_files    = '*.{h,m}'
  s.requires_arc = true
  s.dependency 'React'
end
  