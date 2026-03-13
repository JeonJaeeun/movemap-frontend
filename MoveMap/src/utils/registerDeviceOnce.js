import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerDevice } from "../api/notification";

export async function registerDeviceOnce() {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
            console.log("🚫 로그인 안됨 → 기기 등록 안함");
            return;
        }

        // 권한 체크
        const permission = await Notifications.getPermissionsAsync();
        let status = permission.status;

        if (status !== "granted") {
            const req = await Notifications.requestPermissionsAsync();
            status = req.status;
        }

        if (status !== "granted") {
            console.log("🚫 알림 권한 거부됨 → 기기 등록 중단");
            return;
        }

        // expo push token 가져오기
        const pushTokenResponse = await Notifications.getExpoPushTokenAsync();

        const expoPushToken = pushTokenResponse?.data;

        if (!expoPushToken) {
            console.log("🚫 Expo Push Token 생성 실패 → 서버 등록 취소");
            return; // ★ 서버로 undefined 전달되는 것 방지
        }

        // deviceId 생성
        const deviceId =
            Device.osBuildId ||
            Device.osInternalBuildId ||
            Device.deviceName ||
            Math.random().toString(36).slice(2);

        // 서버로 등록 요청
        await registerDevice({
            fcmToken: expoPushToken,
            deviceId,
            deviceType: Device.osName?.toUpperCase() || "ANDROID",
        });

        // 저장
        await AsyncStorage.setItem("deviceId", deviceId);

        console.log("📌 기기 등록 성공:", deviceId);
    } catch (err) {
        console.error("❌ 기기 등록 실패:", err);
    }
}
