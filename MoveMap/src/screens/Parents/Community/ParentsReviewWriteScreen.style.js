import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },

    closeButton: {
        position: "absolute",
        top: 35,
        right: 20,
        zIndex: 10,
    },

    headerText: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20,
        letterSpacing: -0.55,
    },

    label: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 10,
        color: "#121212",
        letterSpacing: -0.4,
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D0D4DD",
    },

    starRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginBottom: 20,
    },

    inputBox: {
        borderWidth: 1,
        borderColor: "#D0D4DD",
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        color: "#000",
    },

    textArea: {
        height: 140,
        textAlignVertical: "top",
    },
});
