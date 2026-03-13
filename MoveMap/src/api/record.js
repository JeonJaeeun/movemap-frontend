import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./axiosInstance";

{/* 공통 header 처리 함수 */}


{/* 1) GET 일별 걷기 기록 조회 */}
export const getSteps = async (date, memberId) => {
    try {
      const response = await api.get(`/records/steps`, {
        params: { date, memberId },
      });
      return response.data;
    } catch (err) {
      console.error("걸음 수 조회 실패:", err);
      throw err;
    }
};

{/* 2) POST 걷기 기록 동기화 */}
export const syncSteps = async ({ count, distance, syncedAt }) => {
    try {
      const response = await api.post(`/records/steps`, {
        count,
        distance,
        syncedAt,
      });
      return response.data;
    } catch (err) {
      console.error("걸음 수 동기화 실패:", err);
      throw err;
    }
};

{/* 3) GET 일별 체크인 기록 조회 */}
export const getCheckIn = async (date, memberId) => {
    try {
      const response = await api.get(`/records/checkin`, {
        params: { date, memberId },
      });
      return response.data;
    } catch (err) {
      console.error("체크인 조회 실패:", err);
      throw err;
    }
};

{/* 4) POST 체크인 */}
export const postCheckIn = async ({ facilityId, checkInAt }) => {
    try {
      const response = await api.post(`/records/checkin`, {
        facilityId,
        checkInAt,
      });
      return response.data;
    } catch (err) {
      console.error("체크인 실패:", err);
      throw err;
    }
};
  

{/* 5) PATCH 체크아웃 */}
export const patchCheckOut = async ({ id, checkOutAt }) => {
    try {
      const response = await api.patch(`/records/checkout`, {
        id,
        checkOutAt,
      });
      return response.data;
    } catch (err) {
      console.error("체크아웃 실패:", err);
      throw err;
    }
};

{/* 6) GET 일별 셀프 기록 조회 */}
export const getSelf = async (date, memberId) => {
    try {
      const response = await api.get(`/records/self`, {
        params: { date, memberId },
      });
      return response.data;
    } catch (err) {
      console.error("셀프 조회 실패:", err);
      throw err;
    }
};


{/* 7) POST 셀프 기록 추가 */}
export const postSelf = async ({ exerciseType, hours, minutes }) => {
    try {
      const response = await api.post(`/records/self`, {
        exerciseType,
        hours,
        minutes,
      });
      return response.data;
    } catch (err) {
      console.error("셀프 기록 추가 실패:", err);
      throw err;
    }
};

{/* 8) GET 월별 운동 기록 조회 */}
export const getMonthlyRecords = async (year, month, memberId) => {
    try {
      const response = await api.get(`/records/monthly`, {
        params: { year, month, memberId },
      });
      return response.data;
    } catch (err) {
      console.error("월별 기록 조회 실패:", err);
      throw err;
    }
};

{/* 9) 학부모 위클리 리포트 조회 */}
export const getChildWeekly = async (date, memberId) => {
    try {
      const response = await api.get(`/records/children/weekly`, {
        params: { date, memberId },
      });
      return response.data;
    } catch (err) {
      console.error("child weekly 조회 실패:", err);
      throw err;
    }
};
  

{/* 10) GET 체크인 상태 */}
export const getCheckInStatus = async () => {
    try {
      const response = await api.get(`/records/checkin/status`);
      return response.data;
    } catch (err) {
      console.error("체크인 상태 조회 실패:", err);
      throw err;
    }
};