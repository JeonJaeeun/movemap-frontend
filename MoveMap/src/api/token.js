import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function requestNewToken() {
    try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) return null;

        const response = await axios.post(`${BASE_URL}/auth/token`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRT } = response.data;

        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", newRT);

        return accessToken;
    } catch (e) {
        console.log("❌ refreshToken 갱신 실패:", e);
        return null;
    }
}