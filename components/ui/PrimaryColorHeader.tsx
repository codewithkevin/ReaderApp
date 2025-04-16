import { primaryColor } from "@/constants/Colors";
import { wp } from "@/hooks/useResponsiveScreen";
import { View } from "react-native";

const PrimaryColorHeader = () => {
  return (
    <View
      style={{
        height: wp(15),
        backgroundColor: primaryColor,
      }}
    />
  );
};

export default PrimaryColorHeader;
