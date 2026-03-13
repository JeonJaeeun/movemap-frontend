import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./axiosInstance";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getInitialFacility = async () => {
    try {
        const response = await api.get(`/facilities/markers/initial`);

        console.log("초기 마커 조회:", response.data);
        return response.data;
    } catch (error) {
        console.error("초기 마커 조회 실패:", error);
        return { markers: [], totalCount: 0 };
    }
};

export const getFacilityMarkers = async (params) => {
    try {
        const response = await api.get(`/facilities/markers`, {
            params,
        });

        return response.data;
    } catch (error) {
        console.error("마커 조회 실패:", error);
        return { markers: [], totalCount: 0 };
    }
};

export const getFacilitylist = async (params) => {
    try {
        // console.log("시설 리스트 조회 요청 파라미터:", params);
        const response = await api.get(`/facilities/list`, {
            params,
        });

        // console.log("시설 리스트 조회:", response.data);

        return response.data;
    } catch (error) {
        // console.error("시설 리스트 조회 실패:", error);
        return { markers: [], totalCount: 0 };
    }
};

export const searchFacilities = async (keyword) => {
    try {
        const response = await api.get(`/facilities/search`, {

            params: { keyword },
        });

        console.log("시설 검색 결과:", response.data);
        return response.data;
    } catch (error) {
        console.error("시설 검색 실패:", error);
        return { facilities: [] };
    }
};

export const getProgramMarkers = async (params) => {
    try {
        const response = await api.get(`/programs/markers`, {
            params: params,
        });

        return response.data;
    } catch (error) {
        console.error("마커 조회 실패:", error);
        return { markers: [], totalCount: 0 };
    }
};

export const getProgramlist = async (params) => {
    try {
        console.log("프로그램 리스트 조회 요청 파라미터:", params);
        const response = await api.get(`/programs/list`, {
            params,
        });
        console.log("프로그램 리스트 파라미터: ", params);
        console.log("프로그램 리스트 조회: ", response.data);
        return response.data;
    } catch (error) {
        console.error("프로그램 리스트 조회 실패:", error);
        return { markers: [], totalCount: 0 };
    }
};
