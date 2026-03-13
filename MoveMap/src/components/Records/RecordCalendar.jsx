import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { RecordColors } from "../Records/RecordColors";
import ArrowLeft from "../../../assets/icons/Records/ArrowLeft.svg";
import ArrowRight from "../../../assets/icons/Records/ArrowRight.svg";
import GuideBubbleBg from "../../../assets/icons/Records/GuideBubble.svg";
import CustomText from "../common/CustomText";
import { S } from "./RecordCalendar.style";

dayjs.locale("ko");

export default function RecordCalendar({
    selected,
    onSelectDate,
    getDayRecords,
    onMonthChange,
}) {
    const today = dayjs().format("YYYY-MM-DD");
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        const check = async () => {
            const hasSeen = await AsyncStorage.getItem("seenCalendarGuide");
            if(!hasSeen){
                setShowGuide(true);
                await AsyncStorage.setItem("seenCalendarGuide", "true");
            }
        };
        check();
    }, []);

    const closeGuide = () => {
        setShowGuide(false);
    };

    const normalizeDate = (str) => dayjs(str).format("YYYY-MM-DD");

    const getDayStatusColor = (dateStrRaw) => {
        const dateStr = normalizeDate(dateStrRaw);
        const records = getDayRecords(dateStr);

        if (dateStr === today) {
        return records.length > 0
            ? RecordColors.calendarGreen
            : RecordColors.calendarPink;
        }

        return records.length > 0
        ? RecordColors.calendarGreen
        : RecordColors.calendarPink;
    };

    const hexToRgba = (hex, alpha) => {
        const sanitized = hex.replace("#", "");
        const r = parseInt(sanitized.substring(0, 2), 16);
        const g = parseInt(sanitized.substring(2, 4), 16);
        const b = parseInt(sanitized.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <View>
            {/* 상단 월 이동 */}
            <View style={S.monthHeader}>
                <TouchableOpacity
                    style={S.arrowArea}
                    onPress={() => {
                        const newMonth = currentMonth.subtract(1,"month");
                        setCurrentMonth(newMonth);
                        onMonthChange?.(newMonth.format("YYYY-MM"));
                    }}
                >
                    <ArrowLeft />
                </TouchableOpacity>

                <CustomText style={S.monthText}>{currentMonth.format("YYYY년 M월")}</CustomText>

                <TouchableOpacity
                    style={S.arrowArea}
                    onPress={() => {
                        const newMonth = currentMonth.add(1, "month");
                        setCurrentMonth(newMonth);
                        onMonthChange?.(newMonth.format("YYYY-MM"));
                    }}
                >
                    <ArrowRight />
                </TouchableOpacity>
            </View>

            {/* 요일 */}
            <View style={S.weekRow}>
                {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
                    <CustomText
                        key={i}
                        style={[
                            S.weekDayText,
                            i === 0 && { color: "#FF7777" },
                            i === 6 && { color: "#5577FF" },
                        ]}
                    >
                        {d}
                    </CustomText>
                ))}
            </View>

            {/* 달력 */}
            <Calendar
                style={{ paddingHorizontal: 0, marginHorizontal: 0 }}
                key={currentMonth.format("YYYY-MM")}
                current={currentMonth.format("YYYY-MM-DD")}
                hideArrows
                hideDayNames
                hideHeader
                disableMonthChange
                onDayPress={(d) => onSelectDate(d.dateString)}
                dayComponent={({ date }) => {
                    const dateStr = date?.dateString ?? "";
                    const bgColor = getDayStatusColor(dateStr);
                    const isToday = dateStr === today;
                    const isSelected = dateStr === selected;
                    const selectedOverlay = hexToRgba(bgColor, 0.35);

                    return (
                        <TouchableOpacity
                            onPress={() => onSelectDate(dateStr)}
                            style={[
                                S.dayBox,
                                isToday && { backgroundColor: bgColor },
                                isSelected && !isToday && { backgroundColor: selectedOverlay },
                            ]}
                        >
                            <CustomText style={S.dayText}>{date.day}</CustomText>

                            {!isToday && (
                                <View
                                    style={[S.bottomBox, { backgroundColor: bgColor }]}
                                />
                            )}
                        </TouchableOpacity>
                    );
                }}
                theme={{
                    "stylesheet.calendar.header": { headerContainer: { height: 0 } },
                }}
            />

            {/* 안내 말풍선 */}
            {showGuide && (
                <Pressable style={S.guideOverlay} onPress={closeGuide}>
                    <View 
                        style={S.guideWrapper}
                        pointerEvents="box-none"
                    >
                        <GuideBubbleBg style={S.guideBg} />

                        <View style={S.guideTextBox}>
                            <CustomText style={S.guideText}>
                                걸음 수가 10,000보 이상이거나{"\n"}
                                체크인/셀프 기록이 있는 날이 표시됩니다!
                            </CustomText>
                        </View>
                    </View>
                </Pressable>
            )}
        </View>
    );
}