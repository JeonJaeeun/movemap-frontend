// RecordScreen.jsx
import React, { useState, useEffect, useCallback, useContext } from "react";
import { ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getSteps, getCheckIn, getSelf } from "../../api/record";
import useStepSyncToServer from "../../hooks/useStepSyncToServer";

import StepContext from "../../../StepContext";
import CustomText from "../../components/common/CustomText";
import RecordSummary from "../../components/Records/RecordSummary";
import { S } from "./RecordScreen.style";

const BASE_CACHE_KEY = "baseStepCache.v1";

const getKSTDate = () => {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().split("T")[0];
};

export default function RecordScreen() {
  const navigation = useNavigation();
  const today = getKSTDate();

  const sensor = useContext(StepContext); // { count, distance }

  const [baseStep, setBaseStep] = useState({ count: 0, distance: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const [checkInData, setCheckInData] = useState([]);
  const [selfReportData, setSelfReportData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setIsLoaded(false);
      loadRecordData();
    }, [today])
  );

  const loadRecordData = async () => {
    try {

      /** 1) 서버 걸음수 가져오기 */
      const steps = await getSteps(today);
      console.log("🧪 RecordScreen getSteps 응답:", steps);
      const serverBase = {
        count: steps?.count ?? 0,
        distance: steps?.distance ?? 0,
      };
  
      /** 2) 로그아웃 후 재진입 여부 확인 */
      const logoutFlag = await AsyncStorage.getItem("logoutFlag");
  
      /** 3) 로컬 캐시 불러오기 */
      const raw = await AsyncStorage.getItem(BASE_CACHE_KEY);
  
      let loadedBase = serverBase;
  
      /** 4) 로그아웃 → 로컬 캐시 무시하고 서버 값으로 복원 */
      if (logoutFlag === "true") {
        console.log("로그아웃 후 재진입 → 서버 값으로 복원됨");
  
        loadedBase = serverBase;
  
        await AsyncStorage.setItem(
          BASE_CACHE_KEY,
          JSON.stringify({
            date: today,
            base: serverBase,
          })
        );
  
        await AsyncStorage.removeItem("logoutFlag");
      }
  
      /** 5) 로그아웃이 아닐 때: 오늘 날짜면 로컬 캐시 유지 */
      else if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.date === today) {
          loadedBase = parsed.base;
        }
      }
  
      setBaseStep(loadedBase);

      const checkin = await getCheckIn(today);
      setCheckInData(
        checkin.records.map((item) => ({
          type: "checkin",
          title: item.facilityName,
          duration: item.durationMinutes,
          startTime: item.checkInAt,
          endTime: item.checkOutAt,
        }))
      );

      const self = await getSelf(today);
      setSelfReportData(
        self.records.map((item) => ({
          title: item.typeName,
          duration: item.durationMinutes,
        }))
      );

      setIsLoaded(true);
      
    } catch (e) {
      console.error("오늘 기록 로딩 실패:", e);
      setIsLoaded(true);
    }
  };

  // 표시값 = base + sensor
  const displayedStep = baseStep.count + (sensor.count ?? 0);
  const displayedDistance = Number(
    (baseStep.distance + (sensor.distance ?? 0)).toFixed(2)
  );

  // sync 훅
  useStepSyncToServer(
    isLoaded ? displayedStep : null,
    isLoaded ? displayedDistance : null,
    isLoaded
  );

  // 화면 떠날 때 baseStep만 저장
  useFocusEffect(
    useCallback(() => {
      // 화면 들어올 때: 아무것도 안 함
      return () => {
        // 화면 떠날 때 base 저장
        AsyncStorage.setItem(
          BASE_CACHE_KEY,
          JSON.stringify({
            date: today,
            base: baseStep,
          })
        );
        //console.log(" 화면 떠남: base 저장됨", baseStep);
      };
    }, [baseStep, today])
  );

  return (
    <ScrollView contentContainerStyle={S.container}>
      <CustomText style={S.pageTitle}>오늘의 운동 기록</CustomText>

      <RecordSummary
        navigation={navigation}
        checkInData={checkInData}
        selfReportData={selfReportData}
        stepInfo={{
          count: displayedStep,
          distance: displayedDistance,
        }}
        showAddButtons={true}
      />
    </ScrollView>
  );
}
