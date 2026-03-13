import { StyleSheet } from "react-native";

export const S = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  
  divider: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
  },

  selectedDateBox: {
    marginBottom: 20,
  },
  
  dateRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  
  dateMain: {
    fontSize: 20,
    fontWeight: "500",
  },
  
  dateSub: {
    fontSize: 16,
    fontWeight: "500",
  },  

});