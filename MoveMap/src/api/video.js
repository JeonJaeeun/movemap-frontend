import api from "./axiosInstance";

export const getVideos = async () => {
    try {
        const response = await api.get(`/videos`);

        console.log("유튜브 링크:", response.data);
        return response.data;
    } catch (error) {
        console.error("유튜브 링크 조회 실패:", error);
        throw error;
    }
};
