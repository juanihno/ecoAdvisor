import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    margin: 10,
    marginTop: 15,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  text: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  closeIconContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  icon: {
    marginRight: 10,
  },
});
