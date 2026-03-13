import React from "react";
import { Text } from "react-native";

export default function CustomText({
  children,
  size = 16,
  weight = "400",
  color = "#000",
  style,
  ...props
}) {
  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          fontSize: size,
          fontWeight: weight,
          color: color,
          fontFamily: "PretendardRegular",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
