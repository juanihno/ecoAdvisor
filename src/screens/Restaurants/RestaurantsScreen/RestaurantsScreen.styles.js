import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  icon: {
    color: "#00a680",
    marginTop: 120,
    alignSelf: "center",
  },

  text: {
    fontWeight: "bold",
    fontSize: 26,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#00a680",
    marginTop: 20,
  },
  subText: {
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#00a680",
    marginTop: 20,
  },
  btnContainer: {
    position: "absolute",
    top: 70,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
