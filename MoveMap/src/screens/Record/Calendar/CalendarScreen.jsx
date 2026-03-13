import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { S } from "./CalendarScreen.style";
import RecordSummary from "../../../components/Records/RecordSummary";
import RecordCalendar from "../../../components/Records/RecordCalendar";
import { getCheckIn, getSelf, getSteps, getMonthlyRecords } from "../../../api/record";
import CustomText from "../../../components/common/CustomText";

dayjs.locale("ko");

// 한국 시간 YYYY-MM-DD
const getTodayKST = () => {
    const now = new Date();
    const kst = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return kst.toISOString().split("T")[0];
};

const toKSTDateString = (year, month, day) => {
    const kst = new Date(year, month - 1, day);
    return new Date(kst.getTime() - kst.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
};

export default function CalendarScreen({ navigation }) {
    const today = getTodayKST();
    const [selected, setSelected] = useState(today);

    const [markedDates, setMarkedDates] = useState({});

    const [dayData, setDayData] = useState({
        checkInData: [],
        selfReportData: [],
        stepInfo: { count: 0, distance: 0 },
    });

    // 월별 기록 로딩
    const loadMonthly = async (year, month) => {
        try {
            const res = await getMonthlyRecords(year, month);
            const flags = res.flags || {};
            const byDate = {};

            Object.keys(flags).forEach((dayStr) => {
                const dateStr = toKSTDateString(year, month, Number(dayStr));
                byDate[dateStr] = flags[dayStr];
            });

            setMarkedDates((prev) => ({
                ...prev,
                ...byDate,
                // 오늘 날짜는 강제 유지
                [today]: prev[today] || byDate[today] || false,
            }));
        } catch (e) {
            console.error("월별 기록 로딩 실패:", e);
        }
    };

    useEffect(() => {
        const y = Number(today.split("-")[0]);
        const m = Number(today.split("-")[1]);
        loadMonthly(y, m);
    }, []);


    // 하루 기록 로딩
    const loadDayRecord = async (dateStr) => {
        try {
            const checkinRes = await getCheckIn(dateStr);
            const selfRes = await getSelf(dateStr);
            const stepsRes = await getSteps(dateStr);

            //console.log("[CALENDAR] Step 첫 응답:", stepsRes);

            let stepCount = stepsRes.count;
            let stepDistance = stepsRes.distance;

            /* TODAY: steps=0 이면 서버 동기화가 느린 경우 → 1.2초 후 재요청 */
            if (dateStr === today && stepsRes.count === 0) {
                setTimeout(async () => {
                    const retry = await getSteps(today);
                    //console.log("재시도 Step:", retry);

                    setDayData((prev) => ({
                        ...prev,
                        stepInfo: {
                            count: retry.count,
                            distance: retry.distance,
                        },
                    }));

                    // 오늘 기록이 생겼으면 캘린더 표시 true
                    if (retry.count > 0) {
                        setMarkedDates((prev) => ({
                            ...prev,
                            [today]: true,
                        }));
                    }
                }, 1200);
            }

            /* 날짜 데이터 세팅 */
            setDayData({
                checkInData: checkinRes.records.map((item) => ({
                    type: "checkin",
                    title: item.facilityName,
                    duration: item.durationMinutes,
                    startTime: item.checkInAt,
                    endTime: item.checkOutAt,
                })),
                selfReportData: selfRes.records.map((item) => ({
                    type: "self",
                    title: item.typeName,
                    duration: item.durationMinutes,
                })),
                stepInfo: {
                    count: stepCount,
                    distance: stepDistance,
                },
            });

            /* 오늘 기록 여부 반영 */
            const hasAnyRecord =
                checkinRes.records.length > 0 ||
                selfRes.records.length > 0 ||
                stepCount > 0;

            if (hasAnyRecord) {
                setMarkedDates((prev) => ({
                    ...prev,
                    [dateStr]: true,
                }));
            }
        } catch (e) {
            console.error("하루 기록 로딩 실패:", e);
        }
    };

    useEffect(() => {
        loadDayRecord(selected);
    }, [selected]);

    return (
        <View style={S.container}>
            <RecordCalendar
                selected={selected}
                onSelectDate={setSelected}
                getDayRecords={(date) => (markedDates[date] ? ["hasRecord"] : [])}
                onMonthChange={(monthStr) => {
                    const y = dayjs(monthStr).year();
                    const m = dayjs(monthStr).month() + 1;
                    loadMonthly(y, m);
                }}
            />

            <View style={S.divider} />

            <View style={S.selectedDateBox}>
                <CustomText style={S.dateRow}>
                    <CustomText style={S.dateMain}>
                        {dayjs(selected).format("YYYY년 M월 D일")}{" "}
                    </CustomText>
                    <CustomText style={S.dateSub}>
                        {dayjs(selected).format("dddd")}
                    </CustomText>
                </CustomText>
            </View>

            <ScrollView style={{ marginBottom: 40 }} showsVerticalScrollIndicator={false}>
                <RecordSummary
                    navigation={navigation}
                    checkInData={dayData.checkInData}
                    selfReportData={dayData.selfReportData}
                    stepInfo={dayData.stepInfo}
                    showAddButtons={true}
                />
            </ScrollView>
        </View>
    );
}
