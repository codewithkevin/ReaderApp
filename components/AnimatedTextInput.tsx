import { wp } from "@/hooks/useResponsiveScreen";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Pressable,
} from "react-native";

interface IconProps {
  icon: React.ReactNode;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

interface AnimatedInputProps extends TextInputProps {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  accentColor?: string;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  accentColor = "#F97316",
  leftIcon,
  rightIcon,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  // Animation values
  const [animation] = useState(new Animated.Value(0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  // Interpolate values for animations
  const labelPosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [14, -8], // Move label up when focused
  });

  const labelSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12], // Shrink label when focused
  });

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", accentColor], // Change border color when focused
  });

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        {
          borderColor: borderColor,
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.label,
          labelStyle,
          {
            top: labelPosition,
            fontSize: labelSize,
            color: isFocused ? accentColor : "#6B7280",
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 4,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <View style={styles.inputContainer}>
        {leftIcon && (
          <Pressable
            onPress={leftIcon.onPress}
            style={[
              styles.iconContainer,
              styles.leftIcon,
              leftIcon.containerStyle,
            ]}
          >
            {leftIcon.icon}
          </Pressable>
        )}
        <TextInput
          style={[
            styles.input,
            inputStyle,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => {
            setValue(text);
            textInputProps.onChangeText?.(text);
          }}
          value={value}
          {...textInputProps}
        />
        {rightIcon && (
          <Pressable
            onPress={rightIcon.onPress}
            style={[
              styles.iconContainer,
              styles.rightIcon,
              rightIcon.containerStyle,
            ]}
          >
            {rightIcon.icon}
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: wp(4),
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  label: {
    position: "absolute",
    left: wp(3),
    fontSize: 16,
    fontWeight: "500",
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    height: 24,
  },
  inputWithLeftIcon: {
    paddingLeft: wp(7),
  },
  inputWithRightIcon: {
    paddingRight: wp(7),
  },
  iconContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  leftIcon: {
    left: 0,
    paddingRight: wp(2),
  },
  rightIcon: {
    right: 0,
    paddingLeft: wp(2),
  },
});

export default AnimatedInput;
