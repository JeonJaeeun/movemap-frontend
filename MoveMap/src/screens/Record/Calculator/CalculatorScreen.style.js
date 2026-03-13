import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const S = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },

    cardWrapper: {
      alignItems: "center",
      marginTop: 20,
    },

    card: {
      width: SCREEN_WIDTH - 40,     
      aspectRatio: 350 / 240,      
      borderRadius: 16,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFECC4",
    },

    cardBg: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },

    scoreText: {
      fontSize: 40,
      color: "#000",
    },

    divider: {
      height: 1,
      backgroundColor: "#000",
      marginVertical: 30,
      marginHorizontal: 20,
    },

    section: {
      paddingHorizontal: 20,
      paddingBottom: 60,
    },

    sectionTitle: {
      fontSize: 20,
      marginBottom: 12,
    },

    sectionText: {
      fontSize: 16,
      lineHeight: 22,
      color: "#333",
    },
});