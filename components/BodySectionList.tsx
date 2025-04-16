import { forwardRef, memo } from "react";
import { SectionList, SectionListProps, ViewStyle } from "react-native";

interface BodySectionListProps extends SectionListProps<any> {
  containerStyle?: ViewStyle;
}

export const BodySectionList = memo(
  forwardRef<SectionList, BodySectionListProps>((props, ref) => {
    const { containerStyle, ...restProps } = props;

    return (
      <SectionList
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        removeClippedSubviews={false}
        windowSize={3}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        style={[{ flex: 1 }, containerStyle]}
        {...restProps}
        ref={ref}
      />
    );
  })
);

BodySectionList.displayName = "BodySectionList";
