import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// 시설 리뷰 작성
export const postFacilityReview = async ({ facilityId, rating, title, content }) => {
  try {
    console.log("📤 보내는 Body:", {
      facilityId, rating, title, content
    });

    const token = await AsyncStorage.getItem("accessToken");

    const response = await axios.post(
      `${BASE_URL}/facilities/${facilityId}/reviews`,
      { rating, title, content },   // 필드명 백엔드와 동일하게!
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("🏆 시설 후기 작성 성공:", response.data);
    return response.data;

  } catch (error) {
    console.log("❌ 서버 응답:", error.response?.data);
    console.log("❌ HTTP Status:", error.response?.status);
    throw error;
  }
};

// 시설 리뷰 조회
export const getFacilityReviews = async (params) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    const response = await axios.get(`${BASE_URL}/facilities/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error("시설 리뷰 조회 실패:", error);
    return { reviews: [], nextCursor: null, hasNext: false };
  }
};

// 프로그램 리뷰 작성
export const postProgramReview = async ({ programId, rating, title, content }) => {
  try {
      console.log("📤 보내는 Body:", { programId, rating, title, content });

      const token = await AsyncStorage.getItem("accessToken");

      const res = await axios.post(
          `${BASE_URL}/programs/${programId}/reviews`,  
          { rating, title, content },
          { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("🏆 프로그램 후기 작성 성공:", res.data);
      return res.data;
  } catch (error) {
      console.error("❌ 프로그램 리뷰 작성 실패:", error.response?.data || error);
      console.error("❌ HTTP STATUS:", error.response?.status);
      throw error;
  }
};

// 프로그램 리뷰 조회
export const getProgramReviews = async (params) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    const response = await axios.get(`${BASE_URL}/programs/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error("프로그램 리뷰 조회 실패:", error);
    return { reviews: [], nextCursor: null, hasNext: false };
  }
};
