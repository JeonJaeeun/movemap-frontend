import { StyleSheet } from "react-native";
import { RecordColors } from "./RecordColors";

export const S = StyleSheet.create({
  emptyCheckInText: {
    textAlign: "center",
    color: RecordColors.pinkText,
    marginVertical: 12,
    fontSize: 20,
  },
  emptySelfText: {
    textAlign: "center",
    color: RecordColors.greenText,
    marginVertical: 12,
    fontSize: 20,
  },
  
  checkInBox: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: RecordColors.pinkText,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  checkInTitle: {
    color: RecordColors.pinkText,
    fontSize: 20,
  },

  recordItem: {
    paddingVertical: 6,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  recordTitle: {
    fontSize: 24,
    color: "#000",
  },

  recordDuration: {
    fontSize: 24,
    color: "#000",
  },

  recordTime: {
    fontSize: 16,
    color: "#000",
  },

  recordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  line: {
    flexGrow: 1,
    height: 3,
    backgroundColor: "#000",
    marginHorizontal: 8,
    alignSelf: "center",
  },

  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },

  stepBox: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: RecordColors.blueText,
    marginHorizontal: 0,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },

  stepTitle: {
    color: RecordColors.blueText,
    fontSize: 20,
    marginBottom: 6,
  },

  stepValue: {
    fontSize: 24,
    color: "#000",
  },

  selfBox: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: RecordColors.greenText,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
  },

  selfReportTitle: {
    color: RecordColors.greenText,
    fontSize: 20,
  },
  
  selfTitle: {
    fontSize: 24,
    color: "#000",
  },

  selfDuration: {
    fontSize: 24,
    color: "#000",
  },

});
