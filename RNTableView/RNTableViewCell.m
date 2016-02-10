//
//  RCTTableViewCell.m
//  RCTTableView
//
//  Created by Pavlo Aksonov on 24.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNTableViewCell.h"

@implementation RNTableViewCell

-(void)setCellView:(RNCellView *)cellView {
    _cellView = cellView;
    [self.contentView addSubview:cellView];
}

-(void)setFrame:(CGRect)frame {
    [super setFrame:frame];
    [_cellView setFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
    
    if (!self.showsDragIconWhenEditing && self.editing) {
        static NSString *reorderControlClass = @"UITableViewCellReorderControl";
        for (UIView* view in self.subviews) {
            if ([[[view class] description] isEqualToString:reorderControlClass]) {
                view.transform = CGAffineTransformScale(CGAffineTransformIdentity, 2.0, 2.0); // expands hit area somewhat
                for (UIImageView* cellGrip in view.subviews)
                {
                    if ([cellGrip isKindOfClass:[UIImageView class]]) {
                        [cellGrip setImage:nil];
                    }
                }
                break;
            }
        }
    }
}

@end
