import { primaryColor, zincColors } from "@/constants/Colors";
import { wp } from "@/hooks/useResponsiveScreen";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
  fontSize?: number;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress, fontSize }) => {
    const { width: windowWidth } = useWindowDimensions();
    const internalPadding = 160;
    const segmentedControlWidth = windowWidth - 100;
    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    // Calculate the actual text width for the underline
    const underlineWidth = itemWidth * 0.8; // Adjust this value to match your text width

    const rStyle = useAnimatedStyle(() => {
      const selectedIndex = options.indexOf(selectedOption);
      const basePosition = itemWidth * selectedIndex + internalPadding / 2;
      // Center the underline by offsetting it
      const centerOffset = (itemWidth - underlineWidth) / 1.5;

      return {
        transform: [{ translateX: withTiming(basePosition + centerOffset) }],
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 20,
            paddingLeft: wp(20),
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: underlineWidth, // Use the calculated underline width
            },
            rStyle,
            styles.underline,
          ]}
        />
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          return (
            <View key={option} style={styles.tabWrapper}>
              <TouchableOpacity
                onPress={() => {
                  onOptionPress?.(option);
                }}
                style={[
                  {
                    width: itemWidth,
                  },
                  styles.labelContainer,
                ]}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      color: isSelected ? primaryColor : zincColors[900],
                      fontSize: fontSize ? fontSize : wp(3.5),
                    },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
              {index < options.length - 1 && <View style={styles.separator} />}
            </View>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: wp(10),
  },
  underline: {
    position: "absolute",
    height: 2,
    bottom: 0,
    backgroundColor: primaryColor,
  },
  tabWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SF-Compact-Rounded-Medium",
    fontSize: wp(3.5),
    fontWeight: "600",
    paddingBottom: 8, // Add some space between text and underline
  },
  separator: {
    width: 2,
    height: "60%",
    backgroundColor: zincColors[900],
    marginHorizontal: 10,
  },
});

export default SegmentedControl;
