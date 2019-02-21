
#import "RNCzCalendar.h"

@implementation RNCzCalendar

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(getBottomSpace:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        //目前只有iPhoneX
        BOOL isIPhoneX = [UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO;
        callback(@[@(isIPhoneX ? 20 : 0)]);
    });
    
}
@end
  
