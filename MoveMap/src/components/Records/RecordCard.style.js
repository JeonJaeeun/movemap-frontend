import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 4,
  },
  textSection: {
    flexDirection: "column",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    flex: 1,
    height: 1.3,
    backgroundColor: "#000",
    marginHorizontal: 8,
  },
});