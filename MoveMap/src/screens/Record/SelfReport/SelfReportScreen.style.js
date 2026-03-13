import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },

  IconGrid: {
    width: "100%",
    height: 250,
    position: "relative",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  IconWrapper: {
    position: "absolute",
  },

  saveButton: {
    backgroundColor: "#1A8F00",
    paddingVertical: 14,
    borderRadius: 12.5,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 60,
  },

  saveText: {
    fontSize: 18,
    color: "#FFF",
  },
});