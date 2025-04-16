import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import { wp } from "@/hooks/useResponsiveScreen";
import { primaryColor } from "@/constants/Colors";
import { router } from "expo-router";

const onboardingData = [
  {
    title: "Find your thing",
    description:
      "The app offers a wide selection of digital arts and books, including paintings, photographs, ebooks.",
    image: require("../../assets/images/characters/onboarding.png"),
  },
  {
    title: "Easy-to-use interface",
    description:
      "Awstore has an easy-to-use interface that allows users to search for specific items or browse by category.",
    image: require("../../assets/images/characters/cuate2.png"),
  },
  {
    title: "Profit from your work",
    description:
      "This is the perfect platform for artists and authors. Create a profile, upload your artwork, and sell to your work to buyers all over the world.",
    image: require("../../assets/images/characters/amico.png"),
  },
];
export default function OnBoardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/(auth)/signUp");
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/signUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={onboardingData[currentStep].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <View className="gap-5">
          <Text className="font-bold text-center text-[2.2rem] text-white">
            {onboardingData[currentStep].title}
          </Text>
          <Text className="font-semibold text-white">
            {onboardingData[currentStep].description}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <Button
            onPress={handleSkip}
            size="xl"
            variant="outline"
            style={{
              width: wp(40),
            }}
          >
            <Text className="text-white">Skip</Text>
          </Button>

          <Button
            onPress={handleNext}
            size="xl"
            style={{
              width: wp(40),
              backgroundColor: "white",
            }}
          >
            <Text className="text-black">Next</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6600",
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    width: wp(80),
    height: wp(80),
    marginTop: 6,
  },
  textContainer: {
    flex: 1.5,
    backgroundColor: "#FF6600",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: wp(2),
    gap: wp(10),
    alignItems: "center",
    marginTop: wp(10),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
});
