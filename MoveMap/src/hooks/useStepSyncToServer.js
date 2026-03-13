import { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncSteps } from "../api/record";

const STEP_SYNC_KEY = "stepSyncInfo.v1";

export default function useStepSyncToServer(stepCount, distance, isLoaded) {
  const lastSyncedStepsRef = useRef(0);
  const lastSyncTimeRef = useRef(0);
  const readyRef = useRef(false);

  /** 1) 앱 처음 켰을 때 – 마지막 동기화 정보 복구 */
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STEP_SYNC_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          lastSyncedStepsRef.current = parsed.lastSyncedSteps ?? 0;
          lastSyncTimeRef.current = parsed.lastSyncTime ?? 0;
        }
      } catch (e) {
        console.log("step sync 정보 복구 실패:", e);
      } finally {
        readyRef.current = true;
      }
    };
    load();
  }, []);

  /** 2) stepCount / distance 변화 감지 */
  useEffect(() => {
    // RecordScreen이 로딩되기 전에는 절대 sync 금지
    if (!isLoaded) return;
    if (!readyRef.current) return;

    // sensor 초기값(0,0) → 절대 서버로 보내지 않기
    if (stepCount === 0 && distance === 0) {
      // console.log("❌ 0,0 값으로 sync 차단됨");
      return;
    }

    // 올바른 숫자가 아니면 sync 금지
    if (
      stepCount == null ||
      typeof stepCount !== "number" ||
      Number.isNaN(stepCount)
    ) {
      return;
    }

    const now = Date.now();
    const lastSteps = lastSyncedStepsRef.current;
    const lastTime = lastSyncTimeRef.current || 0;

    // 날짜 변경 / 센서 초기화 체크 → 동기화 리셋
    if (stepCount < lastSteps) {
      lastSyncedStepsRef.current = 0;
      lastSyncTimeRef.current = 0;
      return;
    }

    const diffSteps = stepCount - lastSteps;
    const diffTime = now - lastTime;

    // 동기화 조건: 100걸음 증가 or 30분 경과
    if (diffSteps >= 100 || diffTime >= 30 * 60 * 1000) {
      (async () => {
        try {
          await syncSteps({
            count: stepCount,
            distance,
            syncedAt: new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000
            ).toISOString(),
          });

          lastSyncedStepsRef.current = stepCount;
          lastSyncTimeRef.current = now;

          await AsyncStorage.setItem(
            STEP_SYNC_KEY,
            JSON.stringify({
              lastSyncedSteps: stepCount,
              lastSyncTime: now,
            })
          );

          console.log("걸음 기록 동기화 완료:", stepCount, distance);
        } catch (e) {
          console.log("걸음 기록 동기화 실패:", e);
        }
      })();
    }
  }, [stepCount, distance, isLoaded]);
}
