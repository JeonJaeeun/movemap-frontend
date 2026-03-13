import { StyleSheet } from "react-native";
import { RecordColors } from "./RecordColors";

export const S = StyleSheet.create({
    
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  
  arrowArea: {
    width: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  
  monthText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: -50,
  },  

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 8,
  },
  
  weekDayText: {
    fontSize: 14.797,
    width: 45,
    textAlign: "center",
  },  

  dayBox: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: RecordColors.calendarGrey,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: -2.5,
  },

  dayText: {
    fontSize: 14,
    fontWeight: "500",
  },

  bottomBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "20%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  guideOverlay:{
    position: "absolute",
    top: 180,
    left: 0,
    right: 0,
    zIndex: 50,
    alignItems: "center",
  },
  
  guideWrapper: {
    maxWidth: 330, 
    height: 140,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  guideBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  
  guideTextBox: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 20,
  },
  
  guideText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    lineHeight: 24.8,
  },  

});