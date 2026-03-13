import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "./axiosInstance";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const postLogin = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email: email,
            password: password,
        });

        console.log("로그인 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("로그인 실패:", error);
        throw error;
    }
};

export const postEmailSend = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/email/send`, {
            email: email,
        });
    } catch (error) {
        console.error("이메일 인증코드 전송 실패:", error);
        throw error;
    }
};

export const postEmailVerify = async (code, email) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/email/verify`, {
            code: code,
            email: email,
        });
        console.log("이메일 인증 성공");
        return response.data;
    } catch (error) {
        console.error("이메일 인증 실패:", error);
        console.log("code:", code);
        console.log("email", email);
        throw error;
    }
};

export const postSignup = async (
    type,
    role,
    email,
    password,
    nickname,
    sido,
    sigungu,
    sexType,
    age,
    height,
    weight
) => {
    try {
        console.log({
            type: type,
            role,
            email,
            password,
            nickname,
            sido,
            sigungu,
            sexType,
            age,
            height,
            weight,
        });
        const response = await axios.post(`${BASE_URL}/auth/signup`, {
            type: type,
            role: role,
            email: email,
            password: password,
            nickname: nickname,
            sido: sido,
            sigungu: sigungu,
            sexType: sexType,
            age: age,
            height: height,
            weight: weight,
        });
        console.log("회원가입 성공", response);
    } catch (error) {
        console.error("회원가입 실패:", error);
        throw error;
    }
};

export const postKakaoSignup = async (
    type,
    role,
    kakaoId,
    nickname,
    sido,
    sigungu,
    sexType,
    age,
    height,
    weight
) => {
    try {
        console.log({
            type,
            role,
            kakaoId,
            nickname,
            sido,
            sigungu,
            sexType,
            age,
            height,
            weight,
        });
        const response = await axios.post(`${BASE_URL}/auth/signup`, {
            type: type,
            role: role,
            kakaoId: kakaoId,
            nickname: nickname,
            sido: sido,
            sigungu: sigungu,
            sexType: sexType,
            age: age,
            height: height,
            weight: weight,
        });
        console.log("회원가입 성공", response);
    } catch (error) {
        console.error("회원가입 실패:", error);
        throw error;
    }
};

export const postKakaoLogin = async (kakaoAccessToken) => {
    try {
        console.log("카카오 토큰 전송 시도:", kakaoAccessToken);

        const response = await axios.post(`${BASE_URL}/auth/kakao`, {
            accessToken: kakaoAccessToken,
        });

        console.log("카카오 로그인 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("카카오 로그인 실패:", error);

        if (error.response) {
            console.log("❌ 서버 에러 내용:", error.response.data);
        }
        throw error;
    }
};
export const patchPW = async (data) => {
    try {
        const response = await api.patch(`/auth/password`, data, {});
        return response.data;
    } catch (error) {
        console.error("비밀번호 수정 실패:", error);
        throw error;
    }
};

export const postLogout = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/logout`, {});

        return response.data;
    } catch (error) {
        console.error("로그아웃 실패:", error);
        throw error;
    }
};

export const postTemporaryPW = async (email) => {
    try {
        const response = await api.post(`/auth/email/password`, {
            email: email,
        });
        return response.data;
    } catch (error) {
        console.error("임시 비밀번호 전송 실패:", error);
        throw error;
    }
};
