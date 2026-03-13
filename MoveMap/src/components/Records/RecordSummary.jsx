import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import CustomText from "../common/CustomText";
import { RecordColors } from "./RecordColors";
import { S } from "./RecordSummary.style";

import PlusPink from "../../../assets/icons/Records/PlusPink.svg";
import PlusGreen from "../../../assets/icons/Records/PlusGreen.svg";

export default function RecordSummary({ 
  navigation, 
  checkInData, 
  selfReportData, 
  stepInfo,
  showAddButtons = true, 
}) {
  return (
    <View>
      {/* Check-In Section */}
      <View style={[S.checkInBox, { backgroundColor: RecordColors.pink }]}>

        <View style={S.sectionHeader}>
          <CustomText style={S.checkInTitle}>Check-In</CustomText>
          
          {showAddButtons && (
            <TouchableOpacity onPress={() => navigation.navigate("CheckIn")}>
              <PlusPink width={26} height={26} />
          </TouchableOpacity>
          )}
        </View>

        {checkInData.length === 0 ? (
          <CustomText style={S.emptyCheckInText}>
            아직 오늘의 체크인 기록이 없습니다!
            </CustomText>
        ) : (
          <ScrollView
            style={{ maxHeight: 140 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {checkInData.map((item,i) => (
              <View key={i} style={S.recordItem}>
                <View style={S.topRow}>
                  <CustomText style={S.recordTitle}>{item.title}</CustomText>
                  <View style={S.line} />
                  <CustomText style={S.recordDuration}>
                    {item.duration}분
                  </CustomText>
                </View>
                <CustomText style={S.recordTime}>
                  {item.startTime && item.endTime
                    ? `${item.startTime}~${item.endTime}`
                    : ""}
                </CustomText>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* 👣 Step Info */}
      <View style={S.stepRow}>
        <View style={[S.stepBox, { backgroundColor: RecordColors.blue }]}>
          <CustomText style={S.stepTitle}>Step Count</CustomText>
          <CustomText style={S.stepValue}>{stepInfo?.count ?? 0}</CustomText>
        </View>
        <View style={[S.stepBox, { backgroundColor: RecordColors.blue }]}>
          <CustomText style={S.stepTitle}>Step Distance</CustomText>
          <CustomText style={S.stepValue}>
            {stepInfo?.distance ?? "0.00"} km
          </CustomText>
        </View>
      </View>

      {/* 🧍 Self Report Section */}
      <View style={[S.selfBox, { backgroundColor: RecordColors.green }]}>
        <View style={S.sectionHeader}>
          <CustomText style={S.selfReportTitle}>Self Report</CustomText>

          {showAddButtons && (
            <TouchableOpacity onPress={() => navigation.navigate("SelfReport")}>
              <PlusGreen width={26} height={26} />
            </TouchableOpacity>
          )}
        </View>

        {selfReportData.length === 0 ? (
          <CustomText style={S.emptySelfText}>
            아직 오늘의 리포트 기록이 없습니다!
          </CustomText>
        ) : (
          <ScrollView
            style={{ maxHeight: 180 }}
            nestedScrollEnabled
          >
            {selfReportData.map((item, i) => (
              <View key={i} style={S.recordRow}>
                <CustomText style={S.selfTitle}>{item.title}</CustomText>
                <View style={S.line} />
                <CustomText style={S.selfDuration}>{item.duration}분</CustomText>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}