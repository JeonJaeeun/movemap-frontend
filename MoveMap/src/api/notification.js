import api from "./axiosInstance";

// 1) 기기 등록
export async function registerDevice({ fcmToken, deviceId, deviceType }) {
  //console.log("[POST] /notifications …", { fcmToken, deviceType, deviceId });

  return api.post("/notifications", {
    fcmToken,
    deviceType,
    deviceId,
  });
}

// 2) 알림 설정 변경 (enabled: boolean)
export async function updatePushSetting(deviceId, enabled) {
  //console.log("[PATCH] /notifications/" + deviceId + "/push", enabled);

  return api.patch(`/notifications/${deviceId}/push`, null, {
    params: { enabled }
  });
}

// 3) 로그아웃 → 기기 등록 해제
export async function unregisterDevice(deviceId){
  //console.log("[DELETE] /notifications/" + deviceId);

  return api.delete(`/notifications/${deviceId}`);
}