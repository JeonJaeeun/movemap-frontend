// src/components/Records/Modal/CheckInModal.style.js
import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
  headerBox: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
  },

  headerTitle: {
    fontSize: 15,
    color: "#222222",
  },

  searchWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    height: 42,
    backgroundColor: "#F4F5F7",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000000",
  },

  clearBtn: {
    position: "absolute",
    right: 32,
    top: 21,
    padding: 4,
  },

  clearText: {
    fontSize: 22,
    color: "#555555",
  },

  listContentContainer: {
    backgroundColor: "#FFFFFF",
  },

  loadingBox: {
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  listItemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
  },

  textInfoWrapper: {},

  titleText: {
    fontSize: 16,
    color: "#121212",
  },

  subtitleText: {
    fontSize: 13,
    color: "#666666",
    marginTop: 3,
  },

  distanceAddressText: {
    marginTop: 6,
    fontSize: 13,
    color: "#777777",
  },

  emptyBox: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#888888",
  },
});
