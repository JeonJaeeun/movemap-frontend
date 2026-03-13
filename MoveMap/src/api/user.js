import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import api from "./axiosInstance";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getMember = async () => {
    try {
        const response = await api.get(`/members`, {});

        return response.data;
    } catch (error) {
        console.error("유저데이터 조회 실패:", error);
        throw error;
    }
};

export const getMemberScore = async () => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const today = new Date().toISOString().split("T")[0];

        const response = await axios.get(`${BASE_URL}/members/score`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                date: today,
            },
        });

        return response.data;
    } catch (error) {
        console.error("getMemberScore 실패:", error.response?.data ?? error);
        throw error;
    }
};

export const patchMember = async (data) => {
    try {
        const response = await api.patch(`/members`, null, {
            params: data,
        });

        console.log("수정 완료:", response.data);
        return response.data;
    } catch (error) {
        console.error("수정 실패:", error);
        throw error;
    }
};

export const postInvitation = async (code) => {
    try {
        console.log({
            code,
        });

        const response = await api.post(`/members/invitations`, {
            childUuid: code,
        });
        console.log("초대 요청 성공", response);
    } catch (error) {
        console.error("초대 요청 실패:", error);
        throw error;
    }
};

export const getReceivedInvitation = async () => {
    try {
        const response = await api.get(`/members/invitations/received`, {});
        console.log("초대 정보 요청 성공", response);
        return response.data;
    } catch (error) {
        console.error("초대 정보 요청 실패:", error.response?.data ?? error);
        throw error;
    }
};

export const getChildren = async () => {
    try {
        const response = await api.get(`/members/children`, {});
        //console.log("아이 정보 요청 성공", response);
        return response.data;
    } catch (error) {
        //console.error("아이 정보 요청 실패:", error.response?.data ?? error);
        throw error;
    }
};

export const acceptInvitation = async (parentId) => {
    try {
        const response = await api.patch(`/members/invitations/accept`, {
            parentId: parentId,
        });
        console.log("초대 수락 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("초대 수락 실패:", error);
        throw error;
    }
};

export const rejectInvitation = async (parentId) => {
    try {
        const response = await api.patch(`/members/invitations/reject`, {
            parentId: parentId,
        });
        console.log("초대 거절 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("초대 거절 실패:", error);
        throw error;
    }
};

export const deleteMember = async () => {
    try {
        const response = await api.delete(`/members`, {});
        console.log("회원 탈퇴 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        throw error;
    }
};
