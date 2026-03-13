import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const S = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },

    /* 상단 요일 */
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },

    weekItem: {
        alignItems: "center",
    },

    weekDayText: {
        fontSize: 16,
        color: "#D9D9D9",
    },

    dayCircle: {
        width: 24,
        height: 24,
        borderRadius: 14,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 6,
    },

    dayCircleToday: {
        backgroundColor: "#FD6B5E",
    },

    todayDayText: {
        color: "#fff",
    },

    scoreCircle: {
        width: 40,
        height: 40,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: "#9C9C9C",
        backgroundColor: "#FBFBFB",
        justifyContent: "center",
        alignItems: "center",
    },

    scoreText: {
        fontSize: 16,
        color: "#9C9C9C",
        fontWeight: "600",
    },

    /* 중간 배너 */
    bannerWrapper: {
        alignSelf: "center",
        marginTop: 10,
    },

    banner: {
        width: SCREEN_WIDTH - 40,     
        aspectRatio: 350 / 240,      
        borderRadius: 16,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFECC4",
    },

    bannerBg: {
        position: "absolute",
        width: "100%",
        height: "100%",
      },

    bannerTextBox: {
        position: "absolute",
        top: 72,
        left: 34,
        right: 34,
        backgroundColor: "rgba(252,252,252,0.9)",
        padding: 16,
        borderRadius: 12,
        borderColor: "#000",
        borderWidth: 1,
    },

    bannerMainText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 6,
        letterSpacing: -0.5,
    },

    bannerSubText: {
        fontSize: 12,
        textAlign: "center",
        letterSpacing: -0.3,
    },

    /* 날짜 */
    dateRow: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 18,
        position: "relative",
    },

    dateText: {
        fontSize: 20,
        letterSpacing: -0.5,
        textAlign: "center",
    },

    refreshBtn: {
        position: "absolute",
        right: 20,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});
