import React, { useCallback, useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CustomText from "../../../components/common/CustomText";
import { S } from "./ParentsRecordScreen.style";

import { getSteps, getCheckIn, getSelf, getChildWeekly } from "../../../api/record";
import { getMemberScore, getChildren } from "../../../api/user";

import RankBg from "../../../../assets/icons/Records/CalculatorBg";
import RefreshIcon from "../../../../assets/icons/Records/RefreshBlack.svg";
import ParentRecordSummary from "../../../components/Records/RecordSummary";

export default function ParentsRecordScreen({ navigation }) {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const todayIndex = today.getDay();

  const [weeklyScoreData, setWeeklyScoreData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [percent, setPercent] = useState(0);

  const [noChild, setNoChild] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 주요 데이터 불러오기
  const fetchParentRecord = async () => {
    try {
      // 1) 자녀 정보 조회
      const childrenResult = await getChildren();
      const children = childrenResult.children || [];

      if (children.length === 0) {
        setNoChild(true);
        return;
      }

      setNoChild(false);

      const childId = children[0].id;

      // 2) 일일 기록 조회 (자녀 memberId 사용)
      const step = await getSteps(todayString, childId);
      const checkIn = await getCheckIn(todayString, childId);
      const self = await getSelf(todayString, childId);

      // 3) 학부모 전용 percent 조회
      const scoreRes = await getMemberScore(todayString);

      if (scoreRes.percent !== undefined) {
        setPercent(scoreRes.percent);
      } else {
        setPercent(0);
      }

      // 4) weekly
      const weekly = await getChildWeekly(todayString, childId);

      // 백엔드 요일 순서
      const backendOrder = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

      // 프론트 표시용 요일 (Sun~Sat)
      const frontLabels = ["S", "M", "T", "W", "T", "F", "S"];

      // weekly 데이터 변환
      const formattedWeekly = backendOrder.map((key, i) => ({
        day: frontLabels[i],
        score: weekly.dailyAchievements[key]?.score ?? 0,
      }));

      setWeeklyScoreData(formattedWeekly);

      // 5) summary 변환
      const formattedCheckIn = checkIn.records.map((rec) => ({
        title: rec.facilityName,
        duration: rec.durationMinutes,
        startTime: rec.checkInAt,
        endTime: rec.checkOutAt,
      }));

      const formattedSelf = self.records.map((rec) => ({
        title: rec.typeName,
        duration: rec.durationMinutes,
      }));

      setSummary({
        checkInData: formattedCheckIn,
        selfReportData: formattedSelf,
        stepInfo: {
          count: step.count,
          distance: step.distance,
        },
      });

    } catch (err) {
      console.log("학부모 기록 로드 실패:", err);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchParentRecord();
    }, [])
  );

  // 새로고침 아이콘 회전
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "350deg"],
  });

  const handleSyncPress = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(rotateAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]).start();

    fetchParentRecord();
  };

  // 자녀 없음 화면 별도 처리
  if (noChild) {
    return (
      <View style={[S.container, { justifyContent: "center", alignItems: "center" }]}>
        <CustomText style={{ fontSize: 22, marginBottom: 10 }}>
          연결된 자녀가 없습니다
        </CustomText>
        <CustomText style={{ fontSize: 16, color: "#777" }}>
          초대코드를 통해 자녀를 연결해주세요.
        </CustomText>
      </View>
    );
  }

  return (
    <View style={S.container}>
      {/* 상단 요일 */}
      <View style={S.weekRow}>
        {weeklyScoreData.map((item, index) => {
          const isToday = index === todayIndex;

          return (
            <View key={index} style={S.weekItem}>
              <View style={[S.dayCircle, isToday && S.dayCircleToday]}>
                <CustomText style={[S.weekDayText, isToday && S.todayDayText]}>
                  {item.day}
                </CustomText>
              </View>

              <View style={S.scoreCircle}>
                <CustomText style={S.scoreText}>{item.score}</CustomText>
              </View>
            </View>
          );
        })}
      </View>

      {/* 퍼센트 배너 */}
      <View style={S.bannerWrapper}>
        <View style={S.banner}>
          <RankBg width="100%" height="100%" style={S.bannerBg} />
          <View style={S.bannerTextBox}>
            <CustomText style={S.bannerMainText}>
              또래 아이들과 비교했을 때,{`\n`}
              이번 주 내 아이는 상위 {percent}%예요!
            </CustomText>

            <CustomText style={S.bannerSubText}>
              (기준: WHO 만13세 일주일 평균 운동 시간)
            </CustomText>
          </View>
        </View>
      </View>

      {/* 날짜 + 새로고침 */}
      <View style={S.dateRow}>
        <CustomText style={S.dateText}>
          {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
        </CustomText>

        <TouchableOpacity style={S.refreshBtn} onPress={handleSyncPress}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <RefreshIcon />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* 요약 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {summary && (
          <ParentRecordSummary
            navigation={navigation}
            checkInData={summary.checkInData}
            selfReportData={summary.selfReportData}
            stepInfo={summary.stepInfo}
            showAddButtons={false}
          />
        )}
      </ScrollView>
    </View>
  );
}
