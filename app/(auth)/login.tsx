import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import PrimaryColorHeader from "@/components/ui/PrimaryColorHeader";
import { wp } from "@/hooks/useResponsiveScreen";
import { ThemedText } from "@/components/ThemedText";
import AnimatedInput from "@/components/AnimatedTextInput";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/Button";
import { primaryColor } from "@/constants/Colors";

export default function LoginScreen() {
  const number = 4;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <PrimaryColorHeader />

        <View className="items-center py-16 gap-y-10 w-full">
          <Image
            style={{ width: wp(20), height: wp(10) }}
            source={require("../../assets/images/mockImages/logog.png")}
          />

          <View className="items-center gap-2">
            <ThemedText type="subtitle2">Welcome back, Manny!</ThemedText>
            <ThemedText
              style={{
                color: "gray",
              }}
              className="font-bold"
            >
              Enter your credentials to sign in
            </ThemedText>
          </View>

          <View className="w-full px-5 space-y-2">
            <AnimatedInput
              label="Email"
              placeholder=""
              autoCapitalize="none"
              autoCorrect={false}
              rightIcon={{
                icon: <Feather name="mail" size={20} color="black" />,
              }}
            />
            <AnimatedInput
              label="Enter Password"
              placeholder=""
              autoCapitalize="none"
              autoCorrect={false}
              rightIcon={{
                icon: <Feather name="eye-off" size={20} color="black" />,
                onPress: () => console.log("Right icon pressed"),
              }}
            />
          </View>

          <Button
            size="lg"
            style={{
              width: wp(90),
              backgroundColor: primaryColor,
            }}
          >
            Login
          </Button>
        </View>

        <View className="absolute bottom-10 w-full px-5">
          <ThemedText>
            By logging in, i have read and agreed to the{" "}
            <ThemedText style={{ color: primaryColor, fontWeight: "bold" }}>
              Terms and Conditions
            </ThemedText>
            , Use Policy and Privacy Policy
          </ThemedText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
