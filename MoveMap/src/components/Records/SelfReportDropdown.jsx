import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { S } from "./SelfReportDropdown.style";
import { EXERCISE_DATA } from "../../data/exerciseData";
import CustomText from "../common/CustomText";

export default function SelfReportDropdown({
  selectedType,
  setSelectedType,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
}) {
  const hourData = [...Array(6)].map((_, i) => ({
    label: `${i}시간`,
    value: i.toString(),
  }));

  const minuteData = [0, 10, 20, 30, 40, 50].map((min) => ({
    label: `${min}분`,
    value: min.toString(),
  }));

  return (
    <View style={S.container}>
      {/* 운동 종류 */}
      <CustomText style={S.label}>운동 종류</CustomText>

      <Dropdown
        style={S.dropdown}
        placeholderStyle={S.placeholder}
        selectedTextStyle={S.selectedText}
        data={EXERCISE_DATA}
        labelField="label"
        valueField="value"
        placeholder="운동 종류를 선택해주세요."
        value={selectedType}
        onChange={(item) => setSelectedType(item.value)}
      />

      {/* 운동 시간 */}
      <CustomText style={[S.label, { marginTop: 30 }]}>운동 시간</CustomText>

      <View style={S.timeRow}>
        <Dropdown
          style={[S.dropdown, S.timeBox]}
          placeholderStyle={S.placeholder}
          selectedTextStyle={S.selectedText}
          data={hourData}
          labelField="label"
          valueField="value"
          placeholder="시간"
          value={selectedHour}
          onChange={(item) => setSelectedHour(item.value)}
        />

        <Dropdown
          style={[S.dropdown, S.timeBox]}
          placeholderStyle={S.placeholder}
          selectedTextStyle={S.selectedText}
          data={minuteData}
          labelField="label"
          valueField="value"
          placeholder="분"
          value={selectedMinute}
          onChange={(item) => setSelectedMinute(item.value)}
        />
      </View>
    </View>
  );
}