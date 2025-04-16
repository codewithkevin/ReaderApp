import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { wp } from "@/hooks/useResponsiveScreen";
import SegmentedControl from "@/components/SegmentedControl";
import AnimatedInput from "@/components/AnimatedTextInput";
import { primaryColor } from "@/constants/Colors";
import { BodyScrollView } from "@/components/BodyScrollView";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function SignUpScreen() {
  const [selectedSegment, setSelectedSegment] = useState("Seller");
  const [localChecked, setLocalChecked] = React.useState(false);

  const segments = ["Seller", "Customer"];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="bg-white "
    >
      <BodyScrollView
        bounces={true}
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: wp(24) }}
      >
        <View className="flex-1">
          <View style={{ marginVertical: wp(7) }} className="items-center">
            <Image
              style={{ width: wp(20), height: wp(10) }}
              source={require("../../assets/images/mockImages/logog.png")}
            />
            <Image
              style={{ width: wp(48), height: wp(48) }}
              source={require("../../assets/images/mockImages/cuate.png")}
            />
          </View>

          <View className="items-center gap-5">
            <SegmentedControl
              options={segments}
              selectedOption={selectedSegment}
              onOptionPress={setSelectedSegment}
              fontSize={wp(3.5)}
            />
          </View>

          <View>
            <View className="items-center w-full space-y-5 mt-10">
              <View className="items-center gap-2">
                <Text className="font-semibold text-2xl">
                  Create an account
                </Text>
                <Text className="text-md font-medium">
                  Enter your password and setup account
                </Text>
              </View>
              <View className="w-full px-5 space-y-2">
                <View className="space-y-4">
                  <AnimatedInput
                    label="Username"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <AnimatedInput
                    label="Full name"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <AnimatedInput
                    label="Email"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {/**Phone Number input */}
                  <AnimatedInput
                    label="Password"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <AnimatedInput
                    label="Confirm password"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View className="flex flex-row items-center space-x-3">
                  {/* Checkbox */}
                  {/* <BouncyCheckbox
                  size={wp(6)}
                  fillColor="green"
                  unFillColor="#FFFFFF"
                  disableText
                  // text="I agree to the Terms and Conditions of services and Privacy Policy"
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ fontFamily: "JosefinSans-Regular" }}
                  onPress={(checked: boolean) => {
                    // These two should be same value
                    console.log("::Checked::", checked);
                    console.log("::LocalChecked::", localChecked);
                    setLocalChecked(!localChecked);
                  }}
                /> */}
                  <Text>
                    I agree to the{" "}
                    <TouchableOpacity>
                      <Text className="underline  text-[#ed7117]">
                        Terms and Conditions
                      </Text>
                    </TouchableOpacity>{" "}
                    of services and{" "}
                    <Text className="underline  text-[#ed7117]">
                      Privacy Policy
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <View className="mx-4 space-y-6">
              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-2 text-gray-500 font-bold">Or</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <View>
                {/* <SocialButton platform="Google" />
              <SocialButton platform="Facebook" /> */}
              </View>

              <View className="flex-row items-center justify-center">
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Text
                    className="font-semibold"
                    style={{
                      color: primaryColor,
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </BodyScrollView>

      <View className="absolute bottom-10 w-full px-5">
        <Button
          style={{
            backgroundColor: primaryColor,
          }}
          size="xl"
          onPress={() => router.push("/(auth)/verification")}
        >
          Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
