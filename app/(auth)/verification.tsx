import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { wp } from "@/hooks/useResponsiveScreen";
import { primaryColor } from "@/constants/Colors";
import PrimaryColorHeader from "@/components/ui/PrimaryColorHeader";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VerificationScreen(): React.JSX.Element {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Function to handle input change
  const handleChange = (value: string, index: number): void => {
    // Allow only numbers
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if current input is filled and not the last one
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Function to handle backspace key press
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ): void => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste functionality
  const handlePaste = (text: string): void => {
    if (text && text.length > 0) {
      // Extract only numbers
      const pastedData = text
        .replace(/[^0-9]/g, "")
        .split("")
        .slice(0, 4);
      const newOtp = [...otp];

      pastedData.forEach((digit, index) => {
        if (index < 4) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);

      // Focus the appropriate input
      if (pastedData.length < 4) {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  // Verify OTP when all inputs are filled
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      // You can add verification logic here
      console.log("OTP entered:", otp.join(""));
    }
  }, [otp]);

  // Resend OTP function
  const resendOTP = (): void => {
    // Add your resend OTP logic here
    console.log("Resending OTP...");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <PrimaryColorHeader />

        <View className="items-start">
          <Button onPress={() => router.back()} variant="ghost">
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </Button>
        </View>
        <View className="p-5 gap-10 items-center">
          <View className="items-center gap-5">
            <Image
              source={require("../../assets/images/characters/email.png")}
            />

            <View className="gap-3">
              <ThemedText type="subtitle">Verify your email</ThemedText>
              <ThemedText type="default">
                Enter OTP Sent to your Email
              </ThemedText>
            </View>
          </View>

          {/* OTP Input boxes */}
          <View className="flex-row justify-center gap-4 w-full">
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={{
                  width: wp(15),
                  height: wp(15),
                  borderWidth: 1,
                  borderRadius: 8,
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  borderColor: otp[index] ? primaryColor : "#E5E5E5",
                  backgroundColor: otp[index] ? "#F5F5F5" : "white",
                  color: primaryColor,
                }}
                maxLength={1}
                keyboardType="number-pad"
                value={otp[index]}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                // onPaste={(e: any) => handlePaste(e.nativeEvent.text)}
                selectionColor={primaryColor}
              />
            ))}
          </View>

          <View className="flex-row justify-center mt-4 items-center">
            <ThemedText type="default">Didn't receive code? </ThemedText>
            <TouchableOpacity onPress={resendOTP}>
              <Text style={{ color: primaryColor, fontWeight: "bold" }}>
                Resend
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            disabled={!otp.every((digit) => digit !== "")}
            onPress={() => console.log("Verifying OTP:", otp.join(""))}
            size="lg"
            style={{
              width: wp(90),
              backgroundColor: primaryColor,
            }}
          >
            Verify
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
