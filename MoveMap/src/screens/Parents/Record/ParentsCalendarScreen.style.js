import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
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
