import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },

    // 🔥 상단 고정용
    headerContainer: {
        padding: 20,
        backgroundColor: "#fff",
        zIndex: 10,
    },

    // 🔥 리스트 전용 컨테이너 (배경 회색 문제 FIX)
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: "#fff", 
    },

    title: {
        fontSize: 24,
        marginBottom: 8,
    },

    daysLeftRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },

    daysLeft: {
        fontSize: 20,
        color: "#666",
    },

    tabItem: {
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
    },

    iconWrapper: {
        height: 100,
        width: 70,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 5,
        position: "relative",
        overflow: "visible",
    },
      
    questionOverlay: {
        position: "absolute",
        top: 10,
        zIndex: 10,
    },
      
    labelWrapper: {
        marginTop: 5,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 12.5,
        alignItems: "center",
    },
      
    labelText: {
        fontSize: 16,
    },

    rankingBox: {
        marginTop: -10
    },

    rankRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },

    rankBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 24,
    },

    rankBadgeText: {
        fontSize: 20,
        fontWeight: "600",
    },

    rankPlainNumber: {
        width: 38,
        fontSize: 20,
        textAlign: "center",
        marginRight: 18,
        fontWeight: "600",
    },

    rankDistrict: {
        flex: 1,
        fontSize: 20,
        fontWeight: "600",
    },

    rankTime: {
        fontSize: 20,
        fontWeight: "600",
    },

    promotionZone: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },

    promotionText: {
        color: "#009000",
        fontSize: 20,
        fontWeight: "600",
        marginHorizontal: 20,
    },
});
