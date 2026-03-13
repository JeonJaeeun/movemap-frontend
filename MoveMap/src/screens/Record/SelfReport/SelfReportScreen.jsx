import React, { useState } from "react";
import { View, ScrollView, Alert, ImageBackground, Dimensions } from "react-native";
import SelfReportDropdown from "../../../components/Records/SelfReportDropdown";
import { BaseButton } from "../../../components/Buttons/BaseButton";
import { S } from "./SelfReportScreen.style";
import { useNavigation } from "@react-navigation/native";

import PingPong from "../../../../assets/icons/Self/PingPong.svg"
import BasketBall from "../../../../assets/icons/Self/BasketBall.svg"
import Sweat from "../../../../assets/icons/Self/Sweat.svg"
import MainEmoji from "../../../../assets/icons/Self/MainEmoji.svg"
import BaseballBig from "../../../../assets/icons/Self/BaseballBig.svg"
import BaseballSmall from "../../../../assets/icons/Self/BaseballSmall.svg"
import FootBall from "../../../../assets/icons/Self/Football.svg"
import Golf from "../../../../assets/icons/Self/Golf.svg"

import { postSelf } from "../../../api/record";

const { width, height } = Dimensions.get("window");

export default function SelfReportScreen() {
  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const isFormValid =
    selectedType &&
    selectedHour !== null &&
    selectedMinute !== null;

  const handleSave = async () => {
    const body = {
      exerciseType: selectedType,
      hours: Number(selectedHour),
      minutes: Number(selectedMinute),
    };

    console.log("📤 postSelf body:", body);

    try{
      await postSelf(body);
      
      console.log("셀프 기록 저장 성공");

      navigation.navigate("Screens", {
        screen: "RecordTab",
        params: { reload: true },
      });

    } catch (error) {
      console.error("셀프 저장 실패:", error);
      Alert.alert("오류", "저장에 실패했습니다.");
    }
  };

  return (
    <ScrollView contentContainerStyle={S.container}>
      <SelfReportDropdown
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        selectedMinute={selectedMinute}
        setSelectedMinute={setSelectedMinute}
      />

      <View style={S.IconGrid}>

        {/* 탁구공 */}
        <View style={[S.IconWrapper, { top: "15%", left: "30%" }]}>
          <PingPong />
        </View>

        {/* 농구공 */}
        <View style={[S.IconWrapper, { top: "25%", right: "7%" }]}>
          <BasketBall />
        </View>

        {/* 큰 야구공 */}
        <View style={[S.IconWrapper, { top: "120%", left: "0%" }]}>
          <BaseballBig />
        </View>

        {/* 작은 야구공 */}
        <View style={[S.IconWrapper, { top: "170%", left: "25%" }]}>
          <BaseballSmall />
        </View>

        {/* 미식축구 */}
        <View style={[S.IconWrapper, { top: "90%", right: "0%" }]}>
          <FootBall />
        </View>

        {/* 골프 */}
        <View style={[S.IconWrapper, { top: "150%", right: "10%" }]}>
          <Golf />
        </View>

        {/* 땀 */}
        <View style={[S.IconWrapper, { top: "52%", left: "10%" }]}>
          <Sweat />
        </View>

        {/* 메인 이모지 */}
        <View style={[S.IconWrapper, { top: "60%", left: "27%" }]}>
          <MainEmoji />
        </View>

      </View>

      <BaseButton title="저장" onPress={handleSave} disabled={!isFormValid} />
    </ScrollView>
  );
}