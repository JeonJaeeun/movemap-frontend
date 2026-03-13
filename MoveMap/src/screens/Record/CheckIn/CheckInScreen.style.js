import { StyleSheet } from "react-native";
import { RecordColors } from "../../../components/Records/RecordColors";

export const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
  },

  checkInBox: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: RecordColors.pinkText,
    backgroundColor: RecordColors.pink,
    width: "90%",
    height: 312.5,
    marginBottom: 20,
    alignSelf: "center",
  },

  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  checkInTitle: {
    color: RecordColors.pinkText,
    fontSize: 20,
    paddingLeft: 18,
  },

  tabButtonGroup: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 8,
    paddingRight: 11,
  },

  tabButton: {
    backgroundColor: RecordColors.pinkTextBg,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },

  tabButtonText: {
    color: RecordColors.pinkText,
    fontSize: 20,
  },

  timerCircle: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 6,
  },

  timerText: {
    fontSize: 24,
  },

  recordItem: {
    paddingVertical: 10,
    paddingHorizontal: 36,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  recordTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#000",
    marginHorizontal: 8,
  },

  recordDuration: {
    fontSize: 24,
    fontWeight: "500",
  },

  recordTime: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },

  divider: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 8,
    marginHorizontal: 21,
  },

  placeButton: {
    marginTop: 25,
    paddingVertical: 13,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: RecordColors.pinkTextBg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  
  placeButtonText: {
    fontWeight: "600",
    fontSize: 20,
    color: RecordColors.pinkText,
  },

  runningBadge: {
    backgroundColor: "#FFE8EE",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    position: "absolute",
    marginLeft: 20,
    marginTop: 46,
  },
  
  runningBadgeText: {
    color: "#FF2E63",
    fontSize: 12,
  },

  timerActive: {
    borderColor: "#10c838",
    backgroundColor: RecordColors.pinkTextBg,
  },
});
