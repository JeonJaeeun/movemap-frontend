import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    closeButton: {
        position: "absolute",
        top: 35,
        right: 20,
        zIndex: 10,
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 65,
    },

    searchInput: {
        height: 48,
        color:"#000",
        marginLeft: 5,
    },

    listScrollView: {
        marginTop: 10,
        marginBottom: 20,
    },

    listItem: {
        paddingVertical: 14,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    selectedItem: {
        backgroundColor: "#F2F8FF",
    },

    itemName: {
        fontSize: 16,
        color: "#000",
    },
    itemAddress: {
        color: "#666",
        marginTop: 4,
        fontSize: 13,
    },
    itemType: {
        fontSize: 12,
        color: "#999",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    
    regionBox: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#F8F8F8",
    },
    
    regionText: {
        fontSize: 14,
    },
    
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    
    modalBox: {
        width: "70%",
        maxHeight: "60%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
    },
    
    modalItem: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    
});
