
#import <UIKit/UIKit.h>

//Use react-native root views as reusable cells returned from cellForRowAtIndexPath.

/*
 Two react-native changes in RCTRootView.m are needed to allow re-rendering into the same view:
 
 1. In initWithBridge:(RCTBridge *)bridge moduleName:(NSString *)moduleName initialProperties:(NSDictionary *)initialProperties:
 if (!_bridge.loading) {
 [self bundleFinishedLoading:_bridge]; //instead of _bridge.batchedBridge
 }
 
 2. In setAppProperties:(NSDictionary *)appProperties:
 if (_contentView && _bridge.valid && !_bridge.loading) {
 [self runApplication:_bridge]; //instead of _bridge.batchedBridge
 }
 */

@interface RNReactModuleCell : UITableViewCell {
}

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier bridge:(RCTBridge*) bridge data:(NSDictionary*)data indexPath:(NSIndexPath*)indexPath reactModule:(NSString*)reactModule;

-(void)setUpAndConfigure:(NSDictionary*)data bridge:(RCTBridge*)bridge indexPath:(NSIndexPath*)indexPath reactModule:(NSString*)reactModule;

@end