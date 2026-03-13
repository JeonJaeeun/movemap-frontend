import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 0,
    },

    searchInput: {
        height: 48,
        color:"#000",
        marginLeft: 5,
    },

    ReviewContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },

    TopSpacing: {
        height: 20,
    },

    reviewCard: {
        width: "100%",
        height: 150,
        backgroundColor: "#F8F8FB",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#B7BDCC",
    
        padding: 16,
        marginBottom: 16,
        position: "relative",
    },

    reviewHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    reviewTitle: {
        fontSize: 20,
        color: "#000",
        marginRight: 10,
    },

    placeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 10,
    },

    reviewFacility: {
        fontSize: 16,
        color: "#000",
    },

    reviewCategory: {
        fontSize: 12,
        color: "#373737",
    },

    reviewBottomRow: {
        flexDirection: "row",
        marginTop: 12,
    },

    reviewContent: {
        fontSize: 18,
        color: "#000",
    },

    arrowWrapper: {
        position: "absolute",
        right: 18.5,
        top: 14,
    },

    floatingButton: {
        position: "absolute",
        alignItems:"center",
        bottom: 20,
        left: "50%",
        transform: [{ translateX: -60 }],
        flexDirection: "row",
        backgroundColor: "#CCF2C2",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 17,
        elevation: 6,
    },

    floatingButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#090",
    },
});
