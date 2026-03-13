import { StyleSheet } from "react-native";
import { RecordColors } from "./RecordColors";

export const S = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontSize: 20,
    color: RecordColors.greenSelfText,
    marginBottom: 20,
    marginLeft: 9,
  },

  dropdown: {
    height: 52,
    borderColor: "#B7BDCC",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 0,
  },

  placeholder: {
    fontSize: 16,
    color: RecordColors.greyPlaceholder,
  },

  selectedText: {
    fontSize: 16,
    color: "#000",
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  timeBox: {
    width: "48%",
  },
});