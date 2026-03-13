import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomText from "../../../components/common/CustomText";
import { S } from "./CheckInScreen.style";

import RefreshPinkIcon from "../../../../assets/icons/Records/RefreshPink.svg";

import { CheckInModal } from "../../../components/Records/Modal/CheckInModal";

import {
  getCheckIn,
  getCheckInStatus,
  postCheckIn,
  patchCheckOut,
} from "../../../api/record";
import { getFacilitylist } from "../../../api/map";

export default function CheckInScreen() {
  const modalRef = useRef(null);

  // 시설 관련
  const [facilityList, setFacilityList] = useState([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);

  // 체크인 관련
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [activeRecordId, setActiveRecordId] = useState(null);

  const route = useRoute();

  // 오늘 기록
  const [todayRecords, setTodayRecords] = useState([]);

  const timerRef = useRef(null);

  // 알림에서 넘어온 시설 자동 세팅
  useEffect(() => {
    if (route.params?.facilityId && route.params?.facilityName) {
      setSelectedPlace({
        id: route.params.facilityId,
        name: route.params.facilityName
      });

      console.log("✨ 알림으로 받은 시설 자동 선택됨:", route.params.facilityName);
    }
  }, [route.params]);

  // minutes → HH:MM (타이머 표시용)
  const formatHM = (minutes) => {
    if (minutes == null || isNaN(minutes)) return "00:00";

    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    return `${h}:${m}`;
  };

  // ISO → KST HH:mm  +  HH:mm 문자열 둘 다 처리
  const formatKST = (value) => {
    if (!value) return "-";

    // HH:mm 형식이면 그대로 사용
    if (/^\d{2}:\d{2}$/.test(value)) {
      return value;
    }

    // ISO라면 Date 변환
    const date = new Date(value);
    if (isNaN(date.getTime())) return "-";

    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mm}`;
  };

  // 오늘 날짜(YYYY-MM-DD)
  const getTodayDateStr = () => new Date().toISOString().split("T")[0];

  // 0. 재진입 시 체크인 상태 복원하기
  useEffect(() => {
    (async () => {
      try {
        const status = await getCheckInStatus();

        if (status.isCheckedIn) {
          const savedStart = await AsyncStorage.getItem("activeCheckInAt");
          const savedFacilityName = await AsyncStorage.getItem("activeFacilityName");
          const savedRecordId = await AsyncStorage.getItem("activeRecordId");

          if (savedStart && savedRecordId) {
            const diffMin = Math.floor(
              (Date.now() - new Date(savedStart)) / 60000
            );

            setTime(diffMin);
            setStartTimestamp(new Date(savedStart));
            setActiveRecordId(Number(savedRecordId));
            setIsRunning(true);

            if(savedFacilityName) {
              setSelectedPlace({ name: savedFacilityName });
            }
          }
        }
      } catch (e) {
        console.log("체크인 상태 확인 실패:", e);
      }

      loadTodayRecords();
    })();
  }, []);

  // 1) 체크인 기록 불러오기
  const loadTodayRecords = async () => {
    try {
      const now = new Date();
      const kst = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
      const today = kst.toISOString().split("T")[0];
      
      const res = await getCheckIn(today);

      const formatted = res.records.map((r) => ({
        id: r.id,
        title: r.facilityName,
        duration: r.durationMinutes,
        time: `${formatKST(r.checkInAt)}~${formatKST(r.checkOutAt)}`,
      }));      

      setTodayRecords(formatted.reverse());
    } catch (e) {
      console.log("체크인 리스트 조회 실패:", e);
    }
  };

  // 2) 타이머 기능
  useEffect(() => {
    if(isRunning){
        timerRef.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 60 * 1000);
    } else {
        clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]); 

  // 3) 체크인 요청
  const handleStart = async () => {
    if (!selectedPlace) {
      Alert.alert("알림", "체크인할 장소를 먼저 선택하세요.");
      return;
    }

    const now = new Date();
    const kst = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const nowIso = kst.toISOString().slice(0, 19); // YYYY-MM-DDTHH:mm:ss

    try {
      const res = await postCheckIn({
        facilityId: selectedPlace.id,
        checkInAt: nowIso,
      });

      setIsRunning(true);
      setTime(0);
      setStartTimestamp(new Date(nowIso));
      setActiveRecordId(res.id);

      await AsyncStorage.setItem("activeCheckInAt", nowIso);
      await AsyncStorage.setItem(
        "activeFacilityName",
        selectedPlace.name ?? ""
      );
      await AsyncStorage.setItem("activeRecordId", String(res.id));

    } catch (e) {
      console.log("체크인 실패:", e);
    }
  };

  // 4) 체크아웃 요청
  const handleEnd = async () => {
    if (!startTimestamp || !activeRecordId) return;

    // 체크아웃 시간도 KST 변환
    const now = new Date();
    const kst = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const endIso = kst.toISOString().slice(0,19);

    try {
      await patchCheckOut({
        id: activeRecordId,
        checkOutAt: endIso,
      });

      setIsRunning(false);
      setTime(0);
      setStartTimestamp(null);
      setActiveRecordId(null);
      setSelectedPlace(null);

      await AsyncStorage.removeItem("activeCheckInAt");
      await AsyncStorage.removeItem("activeFacilityName");
      await AsyncStorage.removeItem("activeRecordId");

      await loadTodayRecords();

    } catch (e) {
      console.log("체크아웃 실패:", e);
    }
  };

  // 5) 내 근처 장소 조회하기
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "350deg"],
  });

  // 현재 위치 → 시설 조회 API
  const fetchNearbyFacilities = async () => {
    try {
      setIsLoadingFacilities(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한 필요", "현재 위치 조회 권한이 필요합니다.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;
      const delta = 0.02; // 2km 범위

      const params = {
        northEastLat: lat + delta,
        northEastLng: lng + delta,
        southWestLat: lat - delta,
        southWestLng: lng - delta,
        cursor: 0,
        size: 20,
      };

      const res = await getFacilitylist(params);
      setFacilityList(res?.facilities || []);
    } finally {
      setIsLoadingFacilities(false);
    }
  };

  const handlePlacePress = async () => {
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

    modalRef.current?.snapToIndex(0);
    fetchNearbyFacilities();
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    modalRef.current?.close();
  };

  return (
    <View style={S.container}>

      {/* 상단 Check-In / Start / End 버튼 영역 */}
      <View style={S.checkInBox}>
        <View style={S.tabRow}>
          <CustomText style={S.checkInTitle}>Check-In</CustomText>

          <View style={S.tabButtonGroup}>
            <TouchableOpacity 
              style={S.tabButton} 
              onPress={handleStart}
            >
              <CustomText style={S.tabButtonText}>Start</CustomText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={S.tabButton} 
              onPress={handleEnd}
            >
              <CustomText style={S.tabButtonText}>End</CustomText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 체크인 중 배지 */}
        {isRunning && (
          <View style={S.runningBadge}>
            <CustomText style={S.runningBadgeText}>
              ● 체크인 중
            </CustomText>
          </View>
        )}

        {/* 스톱워치 원형 */}
        <View style={[S.timerCircle, isRunning && S.timerActive]}>
          <CustomText style={S.timerText}>{formatHM(time)}</CustomText>
        </View>

        {/* 조회하기 버튼 */}
        <TouchableOpacity style={S.placeButton} onPress={handlePlacePress}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <RefreshPinkIcon />
          </Animated.View>
          <CustomText style={S.placeButtonText}>
            {selectedPlace ? selectedPlace.name : "내 근처 장소 조회하기"}
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* 아래 운동 기록 리스트 */}
      <ScrollView
        style={{ marginBottom: 45 }}
        showsVerticalScrollIndicator={false}
      >
        {todayRecords.map((item, i) => (
          <View key={`${item.title}-${i}`}>
            <View style={S.recordItem}>
              <View style={S.topRow}>
                <CustomText style={S.recordTitle}>{item.title}</CustomText>
                <View style={S.line} />
                <CustomText style={S.recordDuration}>
                  {item.duration}분
                </CustomText>
              </View>
              <CustomText style={S.recordTime}>{item.time}</CustomText>
            </View>

            {i !== todayRecords.length - 1 && <View style={S.divider} />}
          </View>
        ))}
      </ScrollView>

      <CheckInModal 
        ref={modalRef} 
        facilityList={facilityList}
        loading={isLoadingFacilities}
        onDetailPress={handleSelectPlace} 
      />
    </View>
  );
}
