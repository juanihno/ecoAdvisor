import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "80%",
    // borderColor: "red",
    // borderRadius: 15,
  },
  btn: {
    backgroundColor: "#95b53b",
    // backgroundColor: "rgba(255, 255, 255, 0.45)",

    borderRadius: 15,
    // borderColor: "red",
  },
  btnTitle: {
    // color: "rgba(255, 255, 255, 1)",
    // color: "red",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});
