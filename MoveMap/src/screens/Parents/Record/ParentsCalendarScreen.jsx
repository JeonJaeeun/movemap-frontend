import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Animated } from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import CustomText from "../../../components/common/CustomText";
import { S } from "./ParentsCalendarScreen.style";
import ParentRecordSummary from "../../../components/Records/RecordSummary";
import ParentRecordCalendar from "../../../components/Records/RecordCalendar";
import RefreshIcon from "../../../../assets/icons/Records/RefreshBlack.svg";

import { getChildren } from "../../../api/user";
import { getSteps, getCheckIn, getSelf, getMonthlyRecords } from "../../../api/record";

dayjs.locale("ko");

export default function ParentsCalendarScreen({ navigation }) {
    const today = dayjs();
    const [selected, setSelected] = useState(today.format("YYYY-MM-DD"));  
    const [dayData, setDayData] = useState(null);
    const [monthlyRecords, setMonthlyRecords] = useState({});
    const [noChild, setNoChild] = useState(false);

    const [markedDates, setMarkedDates] = useState({});

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchDayRecords(selected);
    }, [selected]);

    useEffect(() => {
        const y = dayjs(selected).year();
        const m = dayjs(selected).month() + 1;
        fetchMonthlyRecords(y, m);
    }, [selected]);    

    // 월별 기록 가져오기
    const fetchMonthlyRecords = async (year, month) => {
    try {
        const childRes = await getChildren();
        const children = childRes.children || [];
        if (children.length === 0) return;

        const childId = children[0].id;

        const res = await getMonthlyRecords(year, month, childId);

        // res.flags = { "1": true, "2": false ... }
        const flags = res.flags || {};
        const byDate = {};

        Object.keys(flags).forEach((dayStr) => {
            const hasRecord = flags[dayStr];
            const dayNum = Number(dayStr);

            const dateStr = dayjs(`${year}-${month}-${dayNum}`).format("YYYY-MM-DD");
            byDate[dateStr] = hasRecord;
        });

        setMarkedDates(byDate);
    } catch (e) {
        console.error("월별 기록 로딩 실패:", e);
    }
};   

    // 하루 기록 가져오기
    const fetchDayRecords = async (dateStr) => {
        try {
          const childRes = await getChildren();
          const children = childRes.children || [];
    
          if (children.length === 0) {
            setNoChild(true);
            return;
          }
          
          setNoChild(false);
    
          const childId = children[0].id;
    
          const [step, checkIn, self] = await Promise.all([
            getSteps(dateStr, childId),
            getCheckIn(dateStr, childId),
            getSelf(dateStr, childId),
          ]);
    
          const formattedCheckIn = (checkIn.records || []).map((rec) => ({
            title: rec.facilityName,
            duration: rec.durationMinutes,
            startTime: rec.checkInAt,
            endTime: rec.checkOutAt,
            type: "checkin",
          }));
    
          const formattedSelf = (self.records || []).map((rec) => ({
            title: rec.typeName,
            duration: rec.durationMinutes,
            type: "self",
          }));
    
          setDayData({
            checkInData: formattedCheckIn,
            selfReportData: formattedSelf,
            stepInfo: {
              count: step.count || 0,
              distance: step.distance || 0,
            },
          });
        } catch (err) {
          console.log("날짜 기록 조회 실패:", err);
          setDayData({
            checkInData: [],
            selfReportData: [],
            stepInfo: { count: 0, distance: 0 },
          });
        }
    };

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "350deg"],
    });

    const handleSyncPress = () => {
        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }),
        ]).start();
        
        fetchDayRecords(selected);
        const y = dayjs(selected).year();
        const m = dayjs(selected).month() + 1;
        fetchMonthlyRecords(y, m);
    };

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

    return(
        <View style={S.container}>
            <ParentRecordCalendar
                selected={selected}
                onSelectDate={setSelected}
                getDayRecords={(date) =>
                    markedDates[date] ? ["hasRecord"] : []
                }
                onMonthChange={(monthStr) => {
                    const y = dayjs(monthStr).year();
                    const m = dayjs(monthStr).month() + 1;
                    fetchMonthlyRecords(y, m);
                }}
            />

            {/* 날짜 & 새로고침 */}
            <View style={S.dateRow}>
                <CustomText style={S.dateText}>
                    {dayjs(selected).format("YYYY년 M월 D일")}
                </CustomText>

                <TouchableOpacity style={S.refreshBtn} onPress={handleSyncPress}>
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <RefreshIcon />
                    </Animated.View>
                </TouchableOpacity>
            </View>

            {/* 요약 정보 박스 */}
            <ScrollView style={{ marginBottom: 40 }} showsVerticalScrollIndicator={false}>
                {dayData && (
                    <ParentRecordSummary
                        navigation={navigation}
                        checkInData={dayData.checkInData}
                        selfReportData={dayData.selfReportData}
                        stepInfo={dayData.stepInfo}
                        showAddButtons={false}
                    />
                )}
            </ScrollView>
        </View>
    );
}