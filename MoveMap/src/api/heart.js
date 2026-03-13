import api from "./axiosInstance";

export const postFacilityBookmark = async (id) => {
    try {
        const response = await api.post(`/facilities/${id}/bookmarks`);
        console.log("북마크 추가 성공");
        return response.data;
    } catch (error) {
        console.error("북마크 추가 실패:", error);
        throw error;
    }
};

export const deleteFacilityBookmark = async (id) => {
    try {
        const response = await api.delete(`/facilities/${id}/bookmarks`);
        return response.data;
    } catch (error) {
        console.error("북마크 삭제 실패:", error);
        throw error;
    }
};

export const postProgramBookmark = (id) =>
    api.post(`/programs/${id}/bookmarks`);

export const deleteProgramBookmark = (id) =>
    api.delete(`/programs/${id}/bookmarks`);

export const getFacilityWishList = async (data) => {
    console.log("리스트 호출 시도");
    try {
        const response = await api.get("/members/bookmarks/facilities", {
            params: data,
        });

        console.log("리스트 호출 완료:", response.data);
        return response.data;
    } catch (error) {
        console.error("수정 실패:", error);
        throw error;
    }
};

export const getProgramWishList = async (
    latitude,
    longitude,
    cursor = null,
    size = 20
) => {
    const params = { latitude, longitude, cursor, size };
    const res = await api.get("/members/bookmarks/programs", { params });
    return res.data;
};
