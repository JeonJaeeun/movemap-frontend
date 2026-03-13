import api from "./axiosInstance"; // ← 네가 만든 axios instance 경로
// 경로는 프로젝트 구조 맞춰 변경해야 함

/* 1) GET /league/status */
export const getLeagueStatus = async () => {
    const res = await api.get("/league/status");
    return res.data;
};

/* 2) GET /league */
export const getLeagueRanks = async () => {
    const res = await api.get("/league");
    return res.data;
};
