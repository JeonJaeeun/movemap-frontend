import React from "react";
import { View } from "react-native";
import CustomText from "../common/CustomText";
import { S } from "./RecordCard.style";

export default function RecordCard({ title, time, duration, bgColor }) {
  return (
    <View style={[S.cardContainer, { backgroundColor: bgColor }]}>
      <View style={S.textSection}>
        <View style={S.titleRow}>
          <CustomText weight="600">{title}</CustomText>
          <View style={S.line} />
          <CustomText weight="700">{duration}분</CustomText>
        </View>
        {time && <CustomText size={12} color="#555">{time}</CustomText>}
      </View>
    </View>
  );
}
